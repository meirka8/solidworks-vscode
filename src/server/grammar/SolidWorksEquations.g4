grammar SolidWorksEquations;

variableDefinition: VARIABLE EQUALS expression;

EQUALS: '=';

expression:
	expression op = (MULTIPLY | DIVIDE) expression
	| expression op = (ADD | SUBTRACT) expression
	| '(' expression ')'
	| measurement
	| VARIABLE
	| NUMBER;

MULTIPLY: '*';
DIVIDE: '/';
ADD: '+';
SUBTRACT: '-';

measurement: NUMBER UNIT;

NUMBER: [0-9]+ ('.' [0-9]+)?;

UNIT: (
		'mm'
		| 'cm'
		| 'm'
		| 'in'
		| 'ft'
		| 'yd'
		| 'km'
		| 'mi'
		| 'yd'
		| 'nm'
		| 'um'
		| 'nm'
		| 'pm'
		| 'fm'
		| 'am'
	);
VARIABLE: '"' [a-zA-Z_][a-zA-Z_0-9]* '"';
WS: [ \t\r\n]+ -> skip;