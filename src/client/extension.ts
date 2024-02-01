import * as vscode from "vscode";
import {
  SolidworksEquationsDefinitionProvider,
  getVariables,
  varRegex,
  varUsageRegex,
  VariableLocation,
} from "./definition_provider";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
import {
  VariableDefinitionProvider,
  VariableDefinition,
} from "./variable_definition_provider";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext): void {
  const serverModule = context.asAbsolutePath("out/server/server.js");
  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "solidworks-equations" }],
    synchronize: {
      configurationSection: "solidworksEquationsHighlighter",
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.eqn"),
    },
  };

  client = new LanguageClient(
    "solidworksEquationsHighlighter",
    "SolidWorks Equations Highlighter",
    serverOptions,
    clientOptions
  );

  client.start();

  // Initialize diagnostics
  const diagnosticCollection = vscode.languages.createDiagnosticCollection(
    "solidworks-equations"
  );
  const variableDefinitionProvider = new VariableDefinitionProvider([]);
  vscode.window.registerTreeDataProvider(
    "variableDefinitions",
    variableDefinitionProvider
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(function (event): void {
      try {
        const diagnostics: vscode.Diagnostic[] = [];
        const document = event.document;

        const definedVariableLocations = getVariables(document, varRegex);
        const usedVariableLocations = getVariables(document, varUsageRegex);
        const definedVariableNames = definedVariableLocations.map(
          (v) => v.name
        );

        diagnoseUndefinedVariables(
          usedVariableLocations,
          definedVariableNames,
          diagnostics
        );

        const definedVariableDefinitions = definedVariableLocations.map(
          VariableDefinition.fromVariableLocation
        );
        variableDefinitionProvider.update(definedVariableDefinitions);

        // Set the diagnostics
        diagnosticCollection.set(document.uri, diagnostics);
      } catch (e) {
        console.error("Error handling onDidChangeTextDocument event:", e);
      }
    })
  );

  const disposableVariableDefinition = vscode.commands.registerCommand(
    "extension.jumpToVariableDefinition",
    (variableDefinition: VariableDefinition) => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        let range = editor.document.lineAt(variableDefinition.line).range;
        editor.selection = new vscode.Selection(range.start, range.end);
        editor.revealRange(range);
      }
    }
  );

  context.subscriptions.push(disposableVariableDefinition);

  const provider = new SolidworksEquationsDefinitionProvider();
  const selector = { scheme: "file", language: "solidworks-equations" };
  const disposableEquationsDefinition =
    vscode.languages.registerDefinitionProvider(selector, provider);
  context.subscriptions.push(disposableEquationsDefinition);
}

function diagnoseUndefinedVariables(
  usedVariableLocations: VariableLocation[],
  definedVariableNames: string[],
  diagnostics: vscode.Diagnostic[]
) {
  for (const usedVar of usedVariableLocations) {
    if (!definedVariableNames.includes(usedVar.name)) {
      const diagnostic: vscode.Diagnostic = {
        severity: vscode.DiagnosticSeverity.Error,
        range: new vscode.Range(
          new vscode.Position(usedVar.line, usedVar.start),
          new vscode.Position(usedVar.line, usedVar.end)
        ),
        message: `Undefined variable ${usedVar.name}`,
        source: "solidworks-equations",
      };
      diagnostics.push(diagnostic);
    }
  }
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
