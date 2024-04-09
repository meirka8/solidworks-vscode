import * as vscode from "vscode";
import * as net from "net";
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
  StreamInfo,
  TransportKind,
} from "vscode-languageclient/node";
import {
  VariableDefinitionProvider,
  VariableDefinition,
} from "./variable_definition_provider";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext): void {
  let serverOptions: ServerOptions;

  if (process.env.ENV === "development") {
    // The server is already running and listening on port 5000
    let connectionInfo = { port: 5000, host: "127.0.0.1" };

    serverOptions = () => {
      // Connect to the server via a socket
      let socket = net.connect(connectionInfo);
      let result: StreamInfo = {
        writer: socket,
        reader: socket,
      };
      return Promise.resolve(result);
    };
  } else {
    cp.exec("pip install -r src/server/requirements.txt", {
      cwd: context.extensionPath,
    });
    // The server is implemented in Python
    let serverCommand = "python";
    let serverArgs = [
      context.asAbsolutePath("src/server/server.py"),
      "--stdio",
    ];

    serverOptions = {
      command: serverCommand,
      args: serverArgs,
      transport: TransportKind.stdio,
    };
  }

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme: "file", language: "solidworks-equations" }],
  };

  // Create and start the language client
  client = new LanguageClient(
    "languageServerExample",
    "Language Server Example",
    serverOptions,
    clientOptions
  );

  client.start();

  // Initialize diagnostics
  const diagnosticCollection = vscode.languages.createDiagnosticCollection(
    "solidworks-equations"
  );
  const diagnostics: vscode.Diagnostic[] = [];

  // get variables on startup
  const editor = vscode.window.activeTextEditor;
  const document = editor?.document;

  let definedVariableDefinitions: VariableDefinition[] = [];
  if (document) {
    definedVariableDefinitions = diagnoseVariables(document, diagnostics);
    diagnosticCollection.set(document.uri, diagnostics);
  }
  const variableDefinitionProvider = new VariableDefinitionProvider(
    definedVariableDefinitions
  );
  vscode.window.registerTreeDataProvider(
    "variableDefinitions",
    variableDefinitionProvider
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(function (event): void {
      try {
        const diagnostics: vscode.Diagnostic[] = [];
        const document = event.document;

        const definedVariableDefinitions = diagnoseVariables(
          document,
          diagnostics
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

function diagnoseVariables(
  document: vscode.TextDocument,
  diagnostics: vscode.Diagnostic[]
) {
  const definedVariableLocations = getVariables(document, varRegex);
  const usedVariableLocations = getVariables(document, varUsageRegex);
  const definedVariableNames = definedVariableLocations.map((v) => v.name);

  diagnoseUndefinedVariables(
    usedVariableLocations,
    definedVariableNames,
    diagnostics
  );

  const definedVariableDefinitions = definedVariableLocations.map(
    VariableDefinition.fromVariableLocation
  );
  return definedVariableDefinitions.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
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
