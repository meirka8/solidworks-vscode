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
  let variables: string[] = [];

  connection.onInitialize((_params: InitializeParams) => {
    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
      },
    };
    return result;
  });

  connection.onRequest('updateDocument', (params: { fileName: string, text: string }) => {
    const { fileName, text } = params;
    const matches = text.match(/(?<=variable\.solidworks-equations\n).*?(?=^\s*$)/gms);
    if (matches) {
      const newVariables = matches.map(match => match.trim());
      variables = [...variables, ...newVariables];
    }
  });
  
  documents.listen(connection);
  connection.listen();
  