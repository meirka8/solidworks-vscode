import * as cp from "child_process";
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
    const uri = params.uri;
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
