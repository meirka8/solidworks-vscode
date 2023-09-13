grammar SolidWorksEquations;

equations: equation+;

equation: variableDeclaration | propertyAssignment;

variableDeclaration: STRING '=' expression ';';

propertyAssignment: STRING '@' STRING '=' expression ';';

expression: ID
          | NUMBER
          | STRING
          | '(' expression ')'
          | expression op=('*' | '/' | '+' | '-') expression
          ;

ID: [a-zA-Z_][a-zA-Z0-9_]*;
NUMBER: [0-9]+ ('.' [0-9]+)? (UNIT)?;
UNIT: ('mm' | 'cm' | 'm' | 'in' | 'ft');
STRING: '"' (~["\\] | '\\' .)* '"';
WS: [ \t\r\n]+ -> skip;