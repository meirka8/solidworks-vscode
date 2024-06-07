grammar SolidWorksEquations;

equations: variableDefinition* EOF;

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
		| 'nm'
		| 'um'
		| 'pm'
		| 'fm'
		| 'am'
	);

VARIABLE: '"' ~["]* '"';

WS: [ \t\n\r]+ -> skip;