import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

interface VariableLocation {
  name: string;
  line: number;
  start: number;
  end: number;
}


export function activate(context: vscode.ExtensionContext): void {
  const serverModule = context.asAbsolutePath('out/server/server.js');
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
  const serverOptions: ServerOptions = {
    run: { command: 'python', args: ['-m', 'your_python_language_server'], transport: TransportKind.stdio },
    debug: { command: 'python', args: ['-m', 'your_python_language_server'], transport: TransportKind.stdio }
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'solidworks-equations' }],
    synchronize: {
      configurationSection: 'solidworksEquationsHighlighter',
      fileEvents: vscode.workspace.createFileSystemWatcher('**/.eqn'),
    },
  };

  client = new LanguageClient('solidworksEquationsHighlighter', 'SolidWorks Equations Highlighter', serverOptions, clientOptions);

   // Initialize diagnostics
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('solidworks-equations');

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(event => {
      const diagnostics: vscode.Diagnostic[] = [];
      const document = event.document;

      // Regular expression for variable definition
      const varRegex = /^("[a-zA-Z]\w*")\s*=/gm;

      // Regular expression for variable usage (this is just an example)
      const varUsageRegex = /(?<=\S.*)("[a-zA-Z]\w*")/g;


      // Assume you have some way to get all defined and used variables
      const definedVariableLocations = getVariables(document, varRegex);
      const usedVariableLocations = getVariables(document, varUsageRegex);
      
      const definedVariableNames = definedVariableLocations.map(v => v.name);
      
      for (const usedVar of usedVariableLocations) {
          if (!definedVariableNames.includes(usedVar.name)) {
              const diagnostic: vscode.Diagnostic = {
                  severity: vscode.DiagnosticSeverity.Error,
                  range: new vscode.Range(new vscode.Position(usedVar.line, usedVar.start), new vscode.Position(usedVar.line, usedVar.end)),
                  message: `Undefined variable ${usedVar.name}`,
                  source: 'solidworks-equations'
              };
              diagnostics.push(diagnostic);
          }
      }

      // Set the diagnostics
      diagnosticCollection.set(document.uri, diagnostics);
    })
  );

  client.start().then(() => {
    vscode.workspace.onDidChangeTextDocument((event) => {
      const document = event.document;
      const filePath = document.uri.fsPath;
      const fileName = filePath.slice(filePath.lastIndexOf('/') + 1);

      client.sendRequest('updateDocument', { fileName, text: document.getText() });
    });
  });
}

function getVariables(document: vscode.TextDocument, regex: RegExp): VariableLocation[] {
  const text = document.getText();
  let match;
  const variables: VariableLocation[] = [];

  while ((match = regex.exec(text)) !== null) {
      const line = document.positionAt(match.index).line;
      const start = document.positionAt(match.index).character;
      
      // Use match[1] instead of match[0] to get only the captured variable name
      const end = start + match[1].length; 

      variables.push({
          name: match[1], // Use match[1] to get only the variable name
          line,
          start,
          end
      });
  }

  return variables;
}


export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}