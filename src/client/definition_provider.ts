import * as vscode from 'vscode';

// Regular expression for variable definition
export const varRegex = /^("[a-zA-Z]\w*")\s*=/gm;

// Regular expression for variable usage (this is just an example)
export const varUsageRegex = /(?<=\S.*)("[a-zA-Z]\w*")/g;


interface VariableLocation {
    name: string;
    line: number;
    start: number;
    end: number;
  }
  

export function getVariables(document: vscode.TextDocument, regex: RegExp): VariableLocation[] {
    const text = document.getText();
    let match;
    const variables: VariableLocation[] = [];
  
    while ((match = regex.exec(text)) !== null) {
        const line = document.positionAt(match.index).line;
        const start = document.positionAt(match.index).character;
        
        // Use match[1] instead of match[0] to get only the captured variable name
        const end = start + match[1].length; 
  
        variables.push({
            name: match[1], // Use match[1] to get only the variable name
            line,
            start,
            end
        });
    }
  
    return variables;
  }
  

export class SolidworksEquationsDefinitionProvider implements vscode.DefinitionProvider {
    public async provideDefinition(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken
    ): Promise<vscode.Definition | undefined> {
      const range = document.getWordRangeAtPosition(position);
      if (!range) {
        return undefined;
      }
  
      const name = document.getText(range);
  
      // Here you can use your `getVariables` function or similar logic to find the definition
      const definedVariableLocations = getVariables(document, varRegex); // Replace with actual regex
  
      for (const variable of definedVariableLocations) {
        if (variable.name === name) {
          return new vscode.Location(
            document.uri,
            new vscode.Range(
              new vscode.Position(variable.line, variable.start),
              new vscode.Position(variable.line, variable.end)
            )
          );
        }
      }
  
      return undefined;
    }
  }
  