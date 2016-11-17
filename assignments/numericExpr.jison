%lex
%%

\s+ 	{ /* skip */ }
[0-9]+	{ return 'NUM'; }
"+"		{ return "+"; }
"*"		{ return "*"; }

/lex

%{
	primaryValues = {1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",9:"nine"};
	var ParseTree = require('./numericExprLib.js')
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
		{$$ = primaryValues[$$]};
