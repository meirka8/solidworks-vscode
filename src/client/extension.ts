import * as cp from "child_process";
import * as vscode from "vscode";
import * as net from "net";
import { SolidworksEquationsDefinitionProvider } from "./definition_provider";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  StreamInfo,
  TransportKind,
} from "vscode-languageclient/node";
import { Equations } from "./variable";
import { VariableTreeDataProvider } from "./variable_definition_provider";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext): void {
  let equations = new Equations();
  const variableTreeDataProvider = new VariableTreeDataProvider(equations);
  vscode.window.registerTreeDataProvider(
    "variableDefinitions",
    variableTreeDataProvider
  );
  vscode.window.createTreeView("variableTree", {
    treeDataProvider: variableTreeDataProvider,
  });
  const disposableVariableDefinition = vscode.commands.registerCommand(
    "extension.jumpToVariableDefinition",
    (variable) => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        if (editor) {
          let range = new vscode.Range(
            new vscode.Position(
              variable.location.start.line,
              variable.location.start.column
            ),
            new vscode.Position(
              variable.location.end.line,
              variable.location.end.column
            )
          );
          editor.selection = new vscode.Selection(range.start, range.end);
          editor.revealRange(range);
        }
      }
    }
  );
  context.subscriptions.push(disposableVariableDefinition);

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
    cp.execSync("pip install -r src/server/requirements.txt", {
      cwd: context.extensionPath,
    });
    // The server is implemented in Python
    let serverCommand = "cd src && python";
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

  client.onNotification("$/variableEvaluations", (params) => {
    const variableEvaluations = params.variableEvaluations;
    // Use the URI and variable evaluations as needed
    equations = Equations.fromJson(variableEvaluations);
    variableTreeDataProvider.updateEquations(equations);
  });

  client.start();

  const provider = new SolidworksEquationsDefinitionProvider();
  const selector = { scheme: "file", language: "solidworks-equations" };
  const disposableEquationsDefinition =
    vscode.languages.registerDefinitionProvider(selector, provider);
  context.subscriptions.push(disposableEquationsDefinition);
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
