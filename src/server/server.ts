import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as antlr4 from 'antlr4';
import * as ts from 'typescript';
import SolidWorksEquationsLexer from './grammar/SolidWorksEquationsLexer';
import SolidWorksEquationsParser from './grammar/SolidWorksEquationsParser';

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let variableDeclarations: { [key: string]: string[] } = {};

connection.onInitialize((_params: InitializeParams) => {
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
    },
  };
  return result;
});

documents.onDidChangeContent((change) => {
  const charStream = antlr4.CharStreams.fromString(change.document.getText());
  const lexer = new SolidWorksEquationsLexer(charStream);
  const parser = new SolidWorksEquationsParser(new antlr4.CommonTokenStream(lexer));
  const tree = parser.equation();

  const sourceFile = ts.createSourceFile(
    'temp.ts',
    tree.toStringTree(parser.ruleNames, parser),
    ts.ScriptTarget.Latest,
    /*setParentNodes */ true
  );

  const fileName = change.document.uri.slice(7); // remove "file://" prefix
  variableDeclarations[fileName] = [];
  ts.forEachChild(sourceFile, (node) => {
    console.log(node);
    if (ts.isVariableDeclaration(node)) {
      variableDeclarations[fileName].push(node.name.getText());
    }
  });
});

connection.onRequest('updateDocument', (params) => {
  const fileName = params.fileName;
  const text = params.text;
  const sourceFile = ts.createSourceFile(
    fileName,
    text,
    ts.ScriptTarget.Latest,
    /*setParentNodes */ true
  );

  variableDeclarations[fileName] = [];
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isVariableDeclaration(node)) {
      variableDeclarations[fileName].push(node.name.getText());
    }
  });
  console.log(variableDeclarations);
});

connection.onRequest('getVariableDeclarations', (params) => {
  const fileName = params.fileName;
  return variableDeclarations[fileName] || [];
});

documents.listen(connection);
connection.listen();