import * as vscode from 'vscode';
import { SolidworksEquationsDefinitionProvider, getVariables, varRegex, varUsageRegex } from './definition_provider';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;


export function activate(context: vscode.ExtensionContext): void {
  const serverModule = context.asAbsolutePath('out/server/server.js');
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'solidworks-equations' }],
    synchronize: {
      configurationSection: 'solidworksEquationsHighlighter',
      fileEvents: vscode.workspace.createFileSystemWatcher('**/.eqn'),
    },
  };

  client = new LanguageClient('solidworksEquationsHighlighter', 'SolidWorks Equations Highlighter', serverOptions, clientOptions);

  client.start();

  // Initialize diagnostics
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('solidworks-equations');

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(event => {
      const diagnostics: vscode.Diagnostic[] = [];
      const document = event.document;

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

  const provider = new SolidworksEquationsDefinitionProvider();
  const selector = { scheme: 'file', language: 'solidworks-equations' };
  const disposable = vscode.languages.registerDefinitionProvider(selector, provider);
  context.subscriptions.push(disposable);

}



export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
