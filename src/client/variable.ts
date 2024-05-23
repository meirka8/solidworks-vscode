import { log } from "console";

// Define the structure of your variable object
interface Variable {
  name: string;
  evaluation: string;
  expression: string;
  location: {
    end: { column: number; line: number };
    start: { column: number; line: number };
  };
}

export class Equations {
  variables: Variable[];

  constructor() {
    this.variables = [];
  }

  findVariable(name: string): Variable | undefined {
    return this.variables.find((v) => v.name === name);
  }

  static fromJson(obj: { [key: string]: any }): Equations {
    const equations = new Equations();
    for (const name in obj) {
      if (obj.hasOwnProperty(name)) {
        const variable: Variable = {
          name,
          evaluation: obj[name].evaluation,
          expression: obj[name].expression,
          location: obj[name].location,
        };
        equations.variables.push(variable);
      }
    }
    return equations;
  }
}
