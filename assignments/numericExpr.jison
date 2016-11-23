%lex
%%

\s+				{ /* skip */ }
[0-9]+			{ return 'NUMBER'; }
"+"				{ return '+'; }
"-"				{ return '-'; }
"*"				{ return '*'; }
"/"				{ return '/'; }
"^"				{ return '^'; }
"="				{ return '='; }
"("     		{ return '('; }
")"     		{ return ')'; }
"!"             { return '!'; }
';'				{ return ';'; }
[a-zA-Z0-9]+	{ return 'VARIABLE'; }
<<EOF>>         { return 'EOF' }


/lex

%{
	var converter = require('number-to-words');
	var lib = require('./treeNodes.js');
	var variableStroage = {};
	var result;
%}

%start startingExpr

%left '+' '-'
%left '*' '/'
%left '^'
%left '!'
%left UMINUS
%%

startingExpr
	: file EOF
		{ 
			var cloner = require('js-cloner');
			var resultClone = cloner.clone(result);
			console.log("Expression is:\n", result," \n\nAnd the answer is:",result.evaluate(resultClone));
		}
	;

file
	: expression ';'
	| assignment ';'
	| expression ';' file
  	| assignment ';' file
  	;
 	
expression
	: '(' expression ')'
	 	{ $$ = $2; }
	| expression '+' expression
		{ $$ = new lib.OperatorNode('+',$1,$3);result = $$; }
	| expression '-' expression
		{ $$ = new lib.OperatorNode('-',$1,$3);result = $$; }
	| expression '*' expression
		{ $$ = new lib.OperatorNode('*',$1,$3);result = $$; }
	| expression '/' expression
		{ $$ = new lib.OperatorNode('/',$1,$3);result = $$; }
	| expression '^' expression
		{ $$ = new lib.OperatorNode('/',$1,$3);result = $$; }
	| expression '!'
 	| 'NUMBER'
 		{$$ = new lib.NumberNode(yytext);}
 	| 'VARIABLE'
 		{$$ = new lib.VariableNode(yytext);}
	;

assignment
  	: 'VARIABLE' '=' expression
  		{ $$ = new lib.AssignmentNode($2,$1,$3);result = $$; }
  	;
