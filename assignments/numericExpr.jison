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
	var ParseTree = require('./ParseTree.js');
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
			console.log("Expression is:", result," values of variables:",variableStroage," And the answer is:",result.evaluate(resultClone));
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
	 	{ $$ = $2;}
	| expression '+' expression
		{ 
			var operatorNode = new lib.OperatorNode('+',$1,$3)
			$$ = new ParseTree(operatorNode,$1,$3, variableStroage);
			result = $$;
		}
	| expression '-' expression
		{ 
			var operatorNode = new lib.OperatorNode('-',$1,$3)
			$$ = new ParseTree(operatorNode,$1,$3, variableStroage);
			result = $$;
		}
	| expression '*' expression
		{ 
			var operatorNode = new lib.OperatorNode('*',$1,$3)
			$$ = new ParseTree(operatorNode,$1,$3, variableStroage);
			result = $$;
		}
	| expression '/' expression
		{ 			
			var operatorNode = new lib.OperatorNode('/',$1,$3)
			$$ = new ParseTree(operatorNode,$1,$3, variableStroage);
			result = $$;
		}
	| expression '^' expression
		{$$ = new ParseTree($2,$1,$3, variableStroage); result = $$;}
	| expression '!'
 	| 'NUMBER'
 		{$$ = new lib.NumberNode(yytext);}
 	| 'VARIABLE'
 		{$$ = new lib.VariableNode(yytext);}
	;

assignment
  	: 'VARIABLE' '=' expression
  		{$$ = new lib.AssignmentNode($2,$1,$3);}
  	;
