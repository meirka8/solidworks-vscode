import {
    createConnection,
    ProposedFeatures,
    TextDocuments,
    InitializeParams,
    TextDocumentSyncKind,
    InitializeResult,
    DidChangeTextDocumentParams,
  } from 'vscode-languageserver/node';
  import { TextDocument } from 'vscode-languageserver-textdocument';
  
  const connection = createConnection(ProposedFeatures.all);
  console.log('Server started!');
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
  
  // Listen for changes to the text document and update the list of variables
  connection.onDidChangeTextDocument((params: DidChangeTextDocumentParams) => {
    const document = documents.get(params.textDocument.uri);

    if (document) {
      const content = document.getText();
      const variableRegex = /"[a-zA-Z]\w*"/g;
      variables = [];

      let match;
      while ((match = variableRegex.exec(content)) !== null) {
        variables.push(match[0]);
      }

      // Do something with the updated variables list
      console.log("Updated variables:", variables);
    }
  });

  documents.listen(connection);
  connection.listen();
    