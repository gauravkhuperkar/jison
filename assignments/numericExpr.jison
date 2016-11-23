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
	var lib = require(process.cwd()+'/treeNodes.js');
	var variableStroage = {};
	var result;
%}

%start startingExpr

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS
%%

startingExpr
	: file EOF
		{ return result;}
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
 		{$$ = new lib.VariableNode(yytext,variableStroage);}
	;

assignment
  	: 'VARIABLE' '=' expression
  		{variableStroage[$1] = $3; $$ = new lib.AssignmentNode($2,$1,$3);result = $$; }
  	;
