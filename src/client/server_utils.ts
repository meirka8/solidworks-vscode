import * as cp from "child_process";
import * as vscode from "vscode";
import * as net from "net";
import * as fs from "fs";
import {
  LanguageClientOptions,
  ServerOptions,
  StreamInfo,
  TransportKind,
} from "vscode-languageclient/node";

export function getServerOptions(
  context: vscode.ExtensionContext
): ServerOptions | undefined {
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

  return serverOptions;
}

export function getClientOptions(): LanguageClientOptions {
  return {
    documentSelector: [{ scheme: "file", language: "solidworks-equations" }],
  };
}
