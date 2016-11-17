%lex
%%

\s+ 	{ /* skip */ }
[0-9]+	{ return 'NUM'; }
"+"		{ return "+"; }

/lex
%start startingExpr
%left '+'
%%

startingExpr
	: Expr
		{console.log($$)};

Expr
	: Expr '+' Expr
		{$$ = "(" + $$ + " + " + $3 + ")";}
	| NUM
	;
