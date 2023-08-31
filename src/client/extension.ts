import * as vscode from 'vscode';
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
  
  client.start().then(() => {
    vscode.workspace.onDidChangeTextDocument((event) => {
      const document = event.document;
      const filePath = document.uri.fsPath;
      const fileName = filePath.slice(filePath.lastIndexOf('/') + 1);

      client.sendRequest('updateDocument', { fileName, text: document.getText() });
    });
  });
  
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
