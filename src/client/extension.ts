import * as cp from "child_process";
import * as vscode from "vscode";
import * as net from "net";
import * as fs from "fs";
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
    // Ensure the virtual environment is set up and dependencies are installed
    const venvPath = context.asAbsolutePath("venv");

    // Check if the virtual environment directory exists, if not, create it
    if (!fs.existsSync(venvPath)) {
      console.log("Creating virtual environment...");
      const pythonCommand = "python"; // Adjust if you need to specify python3 or a specific path
      const venvCreateCmd = `${pythonCommand} -m venv ${venvPath}`;
      try {
        cp.execSync(venvCreateCmd);
        console.log("Virtual environment created successfully.");
      } catch (error) {
        console.error("Failed to create virtual environment:", error);
        vscode.window.showErrorMessage(
          "Failed to create the Python virtual environment. Please check the console for more details."
        );
        return;
      }
    }
    // Install dependencies in the virtual environment
    const pipInstallCmd = `${venvPath}/Scripts/pip install -r src/server/requirements.txt`; // Windows path, adjust for macOS/Linux
    try {
      cp.execSync(pipInstallCmd, { cwd: context.extensionPath });
      console.log("Dependencies installed successfully.");
    } catch (error) {
      console.error("Failed to install Python dependencies:", error);
      vscode.window.showErrorMessage(
        "Failed to set up the Python server. Please check the console for more details."
      );
      return;
    }

    // Adjust the server command to use the Python executable within the virtual environment
    let serverCommand = `${venvPath}/Scripts/python`; // Windows path, adjust for macOS/Linux
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
