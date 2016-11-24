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
		{ return $$; }
	;

file
	: expression ';'
	| assignment ';'
	| expression ';' file
		{ $$ = new lib.Structure($1,$2,$3); }
  	| assignment ';' file
		{ $$ = new lib.Structure($1,$2,$3); }
  	;
 	
expression
	: '(' expression ')'
	 	{ $$ = $2; }
	| expression '+' expression
		{ $$ = new lib.OperatorNode('+',$1,$3); }
	| expression '-' expression
		{ $$ = new lib.OperatorNode('-',$1,$3); }
	| expression '*' expression
		{ $$ = new lib.OperatorNode('*',$1,$3); }
	| expression '/' expression
		{ $$ = new lib.OperatorNode('/',$1,$3); }
	| expression '^' expression
		{ $$ = new lib.OperatorNode('/',$1,$3); }
	| expression '!'
 	| 'NUMBER'
 		{$$ = new lib.NumberNode(yytext);}
 	| 'VARIABLE'
 		{$$ = new lib.VariableNode(yytext,variableStroage);}
	;

assignment
  	: 'VARIABLE' '=' expression
  		{	variableStroage[$1] = $3; 
			var variable = new lib.VariableNode($1,variableStroage)
  			$$ = new lib.AssignmentNode($2,variable,$3);
  		}
  	;
