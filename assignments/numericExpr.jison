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
	var IfBlock = require(process.cwd()+'/lib/IfBlock.js');
	var IfElseBlock = require(process.cwd()+'/lib/IfElseBlock.js');
	var NumberNode = require(process.cwd()+'/lib/NumberNode.js');
	var OperatorNode = require(process.cwd()+'/lib/OperatorNode.js');
	var StructureTree = require(process.cwd()+'/lib/StructureTree.js');
	var VariableNode = require(process.cwd()+'/lib/VariableNode.js');
	var AssignmentNode = require(process.cwd()+'/lib/AssignmentNode.js');
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
		{ $$ = new StructureTree($1,$2,$3); }
  	| assignment ';' programme
		{ $$ = new StructureTree($1,$2,$3); }
	| decisionMaking ';'
	| decisionMaking ';' programme
		{ $$ =  new StructureTree($1,$2,$3); }
  	;
 	
decisionMaking
  	: 'IF' 'BOOLEAN' '{' programme '}'
		{ $$ = new IfBlock($2, $4); }
  	| 'IF' 'BOOLEAN' '{' programme '}' 'ELSE' '{' programme '}'
  		{ $$ = new IfElseBlock($2,$4, $8); }
  	;

expression
	: '(' expression ')'
	 	{ $$ = $2; }
	| expression '+' expression
		{ $$ = new OperatorNode('+',$1,$3); }
	| expression '-' expression
		{ $$ = new OperatorNode('-',$1,$3); }
	| expression '*' expression
		{ $$ = new OperatorNode('*',$1,$3); }
	| expression '/' expression
		{ $$ = new OperatorNode('/',$1,$3); }
	| expression '^' expression
		{ $$ = new OperatorNode('/',$1,$3); }
	| expression '!'
 	| 'NUMBER'
 		{$$ = new NumberNode(yytext);}
 	| 'VARIABLE'
 		{$$ = new VariableNode(yytext,variableStroage);}
	;

assignment
  	: 'VARIABLE' '=' expression
  		{	variableStroage[$1] = $3; 
			var variable = new VariableNode($1,variableStroage)
  			$$ = new AssignmentNode($2,variable,$3);
  		}
  	;
