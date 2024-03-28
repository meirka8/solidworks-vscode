const cp = require("child_process");
import { ExecException } from "child_process";
import * as vscode from "vscode";
import {
  SolidworksEquationsDefinitionProvider,
  getVariables,
  varRegex,
  varUsageRegex,
} from "./definition_provider";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

interface VariableLocation {
  name: string;
  line: number;
  start: number;
  end: number;
}

async function checkPyglsInstalled(): Promise<void> {
  return new Promise((resolve, reject) => {
    cp.exec(
      'python -c "import pygls"',
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          reject(new Error("pygls is not installed"));
        } else {
          resolve();
        }
      }
    );
  });
}

export function activate(context: vscode.ExtensionContext): void {
  // Check if pygls is installed
  cp.exec(
    'python -c "import pygls"',
    (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        // pygls is not installed, show a message to the user
        vscode.window.showErrorMessage(
          "The extension requires pygls to be installed. Please install it by running `pip install pygls`."
        );
        return;
      }
    }
  );

  // Server options for the Python language server
  const serverScript = context.asAbsolutePath("./src/server/server.py");

  const serverOptions: ServerOptions = {
    run: {
      command: "python",
      args: ["-m", "debugpy.adapter", "--port", "5678", serverScript],
      transport: TransportKind.stdio,
    },
    debug: {
      command: "python",
      args: ["-m", "debugpy.adapter", "--port", "5678", serverScript],
      transport: TransportKind.stdio,
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

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const diagnostics: vscode.Diagnostic[] = [];
      const document = event.document;

      // Assume you have some way to get all defined and used variables
      const definedVariableLocations = getVariables(document, varRegex);
      const usedVariableLocations = getVariables(document, varUsageRegex);

      const definedVariableNames = definedVariableLocations.map((v) => v.name);

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

      // Set the diagnostics
      diagnosticCollection.set(document.uri, diagnostics);
    })
  );

  const provider = new SolidworksEquationsDefinitionProvider();
  const selector = { scheme: "file", language: "solidworks-equations" };
  const disposable = vscode.languages.registerDefinitionProvider(
    selector,
    provider
  );
  context.subscriptions.push(disposable);
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
