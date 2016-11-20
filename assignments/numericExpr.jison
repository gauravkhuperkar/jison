%lex
%%

\n 				{ return 'NEW_LINE'; }
\s+				{ /* skip */ }
[0-9]+			{ return 'NUM'; }
"+"				{ return '+'; }
"-"				{ return '-'; }
"*"				{ return '*'; }
"="				{ return '='; }
"("     		{ return '('; }
")"     		{ return ')'; }
[a-zA-Z0-9]+	{ return 'VARIABLE'; }
';'				{ return 'SEMI_COL'}

/lex

%{
	var ParseTree = require('./numericExprLib.js');
	var converter = require('number-to-words');
	var variableStroage = {};
	var result = 0;
%}

%start startingExpr
%left '=' 'SEMI_COL' 'NEW_LINE'
%left '+' '-'
%left '*' '/'
%left UMINUS
%%

startingExpr
	: Expr
		{console.log("Answer is...... ",result)}
	;

Expr
	: Expr NEW_LINE Expr
	| Statement
	;
		
Statement
 	: Statement SEMI_COL
 	| Term
 	| NEW_LINE
 	;
 	
Term
	: '(' Term ')'
	 	{ $$ = $2 }
	| Term '+' Term
		{ 	var firstNumber = isNaN($1) ? variableStroage[$1] : $1;
			var secondNumber = isNaN($3) ? variableStroage[$3] : $3;
			$$ = Number(firstNumber)+Number(secondNumber);
			result = $$;
		} 
	| Term '-' Term
		{ 	var firstNumber = isNaN($1) ? variableStroage[$1] : $1;
			var secondNumber = isNaN($3) ? variableStroage[$3] : $3;
			$$ = Number(firstNumber)-Number(secondNumber);
			result = $$;
		} 	
	| Term '*' Term
		{	var firstNumber = isNaN($1) ? variableStroage[$1] : $1;
			var secondNumber = isNaN($3) ? variableStroage[$3] : $3;
			$$ = Number(firstNumber)*Number(secondNumber);
			result = $$;
		}
 	| NUM
 	| VARIABLE '=' NUM
 		{ variableStroage[$1] = $3; }
 	| VARIABLE
 	| SEMI_COL Term
	;
