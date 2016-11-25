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
";"				{ return ';'; }
"{"				{ return '{'; }
"}"				{ return '}'; }
"if"			{ return 'IF'; }
"else"			{ return 'ELSE'; }
"true"			{ return 'BOOLEAN'; }
"false"			{ return 'BOOLEAN'; }
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
	: programme EOF
		{ return $$; }
	;

programme
	: expression ';'
	| assignment ';'
	| expression ';' programme
		{ $$ = new lib.Structure($1,$2,$3); }
  	| assignment ';' programme
		{ $$ = new lib.Structure($1,$2,$3); }
	| decisionMaking ';'
	| decisionMaking ';' programme
		{ $$ =  new lib.Structure($1,$2,$3); }
  	;
 	
decisionMaking
  	: 'IF' 'BOOLEAN' '{' programme '}'
		{ $$ = new lib.IfBlock($2, $4); }
  	| 'IF' 'BOOLEAN' '{' programme '}' 'ELSE' '{' programme '}'
  		{ $$ = new lib.IfElseBlock($2,$4, $8); }
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
