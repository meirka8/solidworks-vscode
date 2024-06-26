import * as vscode from "vscode";
import { Equations, Variable } from "./variable";

export class VariableTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly variable?: Variable // Assuming Variable is the type of your variables
  ) {
    super(label, collapsibleState);
    if (variable) {
      this.tooltip = `${variable.name}: ${variable.evaluation}`;
      this.description = variable?.evaluation;
    } else {
      this.tooltip = label;
      this.description = "Sketch";
    }
  }

  getCommand(): vscode.Command | undefined {
    if (this.collapsibleState === vscode.TreeItemCollapsibleState.None) {
      return {
        command: "extension.jumpToVariableDefinition",
        title: "Jump to Definition",
        arguments: [this.variable],
      };
    } else {
      return undefined;
    }
  }

  command = this.getCommand();
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
      const groupName = element.label;
      const variables = this.equations.variables
        .filter((v) => v.name.includes(`@${groupName}`))
        .map(
          (v) =>
            new VariableTreeItem(
              v.name,
              vscode.TreeItemCollapsibleState.None,
              v
            )
        )
        .sort((a, b) => a.label.localeCompare(b.label));
      return Promise.resolve(variables);
    } else {
      const variables = [];
      const independentItems = this.equations.variables
        .filter((v) => !v.name.includes("@"))
        .map(
          (v) =>
            new VariableTreeItem(
              v.name,
              vscode.TreeItemCollapsibleState.None,
              v
            )
        )
        .sort((a, b) => a.label.localeCompare(b.label));
      const variableGroupItems = this.equations.variables
        .filter((v) => v.name.includes("@"))
        .map((v) => v.name.split("@")[1])
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(
          (name) =>
            new VariableTreeItem(
              // name without closing quotation mark
              name.slice(0, -1),
              vscode.TreeItemCollapsibleState.Collapsed
            )
        )
        .sort((a, b) => a.label.localeCompare(b.label));
      return Promise.resolve([...independentItems, ...variableGroupItems]);
    }
  }
}

export function jumpToDefinition(variable: Variable): void {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    if (editor) {
      let range = new vscode.Range(
        new vscode.Position(
          variable.location.start.line - 1,
          variable.location.start.column
        ),
        new vscode.Position(
          variable.location.end.line - 1,
          variable.location.end.column
        )
      );
      editor.selection = new vscode.Selection(range.start, range.end);
      editor.revealRange(range);
    }
  }
}
