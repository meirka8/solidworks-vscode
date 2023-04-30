import {
    createConnection,
    ProposedFeatures,
    TextDocuments,
    InitializeParams,
    TextDocumentSyncKind,
    InitializeResult,
  } from 'vscode-languageserver/node';
  import { TextDocument } from 'vscode-languageserver-textdocument';
  
  const connection = createConnection(ProposedFeatures.all);
  const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
  
  connection.onInitialize((_params: InitializeParams) => {
    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
      },
    };
    return result;
  });
  
  documents.listen(connection);
  connection.listen();
  