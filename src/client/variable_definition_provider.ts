import * as vscode from "vscode";
import { Equations, Variable } from "./variable";

export class VariableTreeItem extends vscode.TreeItem {
  constructor(
    public readonly variable: Variable, // Assuming Variable is the type of your variables
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(variable.name, collapsibleState);
    this.description = variable.evaluation;
  }

  command = {
    command: "extension.jumpToVariableDefinition",
    title: "Jump to Definition",
    arguments: [this.variable],
  };
}

export class VariableTreeDataProvider
  implements vscode.TreeDataProvider<VariableTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    VariableTreeItem | undefined
  > = new vscode.EventEmitter<VariableTreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<VariableTreeItem | undefined> =
    this._onDidChangeTreeData.event;

  constructor(private equations: Equations) {}

  refresh(): void {
    this._onDidChangeTreeData.fire(
      undefined // undefined means refresh everything
    );
  }

  updateEquations(equations: Equations): void {
    this.equations = equations;
    this.refresh();
  }

  getTreeItem(element: VariableTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: VariableTreeItem): Thenable<VariableTreeItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(
        this.equations.variables.map(
          (variable) =>
            new VariableTreeItem(variable, vscode.TreeItemCollapsibleState.None)
        )
      );
    }
  }
}

export function jumpToDefinition(uri: vscode.Uri, variable: Variable) {
  // Use the VS Code API to navigate to the variable's location
  const range = new vscode.Range(
    new vscode.Position(
      variable.location.start.line,
      variable.location.start.column
    ),
    new vscode.Position(
      variable.location.end.line,
      variable.location.end.column
    )
  );
  vscode.window.showTextDocument(uri).then((editor) => {
    editor.selection = new vscode.Selection(range.start, range.end);
  });
}
