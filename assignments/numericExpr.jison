%lex
%%

\s+ 	{ /* skip */ }
[0-9]+	{ return 'NUM'; }
"+"		{ return "+"; }
"*"		{ return "*"; }

/lex

%{
	var ParseTree = require('./numericExprLib.js');
	var converter = require('number-to-words');
%}

%start startingExpr
%left '+'
%left '*'
%%

startingExpr
	: Expr
		{console.log($$)};

Expr
	: Expr '+' Expr
		{ $$ = new ParseTree(" + ",$1,$3).toString();}
	| Expr '*' Expr
		{$$ = new ParseTree(" times ",$1,$3).toString();}
	| NUM
		{$$ = converter.toWords($$)};
