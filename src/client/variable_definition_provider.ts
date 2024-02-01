import * as vscode from "vscode";
import { VariableLocation } from "./definition_provider";

export class VariableDefinitionProvider
  implements vscode.TreeDataProvider<VariableDefinition>
{
  update(definedVariableDefinitions: VariableDefinition[]) {
    this.definedVariableLocations = definedVariableDefinitions;
    this.refresh();
  }
  private _onDidChangeTreeData: vscode.EventEmitter<
    VariableDefinition | undefined | null | void
  > = new vscode.EventEmitter<VariableDefinition | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    VariableDefinition | undefined | null | void
  > = this._onDidChangeTreeData.event;

  constructor(private definedVariableLocations: VariableDefinition[]) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: VariableDefinition): vscode.TreeItem {
    return element;
  }

  getChildren(element?: VariableDefinition): Thenable<VariableDefinition[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(this.definedVariableLocations);
    }
  }
}

export class VariableDefinition extends vscode.TreeItem {
  constructor(
    public readonly name: string,
    public readonly line: number,
    public readonly start: number,
    public readonly end: number,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(name, collapsibleState);
    this.command = {
      command: "extension.jumpToVariableDefinition",
      title: "Jump to Definition",
      arguments: [this],
    };
  }

  contextValue = "variableDefinition";

  // factory from VariableLocation
  static fromVariableLocation(
    variableLocation: VariableLocation
  ): VariableDefinition {
    return new VariableDefinition(
      variableLocation.name,
      variableLocation.line,
      variableLocation.start,
      variableLocation.end,
      vscode.TreeItemCollapsibleState.None
    );
  }
}
