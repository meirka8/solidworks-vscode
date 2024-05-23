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
let client: LanguageClient;
let equations: Equations;

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
