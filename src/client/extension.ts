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
import {
  jumpToDefinition,
  VariableTreeDataProvider,
} from "./variable_definition_provider";
import { getClientOptions, getServerOptions } from "./server_utils";

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
    jumpToDefinition
  );
  context.subscriptions.push(disposableVariableDefinition);

  // Options to control the language client
  let clientOptions: LanguageClientOptions = getClientOptions();
  let serverOptions: ServerOptions | undefined = getServerOptions(context);

  if (serverOptions) {
    console.log("Server options set successfully.");
    client = new LanguageClient(
      "languageServer",
      "Language Server",
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
  }

  const provider = new SolidworksEquationsDefinitionProvider();
  const selector = { scheme: "file", language: "solidworks-equations" };
  const disposableEquationsDefinition =
    vscode.languages.registerDefinitionProvider(selector, provider);
  context.subscriptions.push(disposableEquationsDefinition);
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
