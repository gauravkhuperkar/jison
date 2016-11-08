%lex

%%

\s+							{}
[0-9]+("."[0-9]+)?\b		{return 'NUMBER';}
"+"							{return '+';}
"-"							{return '-';}
"/"							{return '/';}
"*"							{return '*';}

/lex
%left UMINUS
%start startingExpr
%%

startingExpr
    : Expression
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

Expression
	: Expression '+' VAR
		{$$ = +$1 + +$3;}
	| Expression '-' VAR
		{$$ = $1-$3;}
	| Expression '/' VAR
		{$$ = $1/$3;}
	| Expression '*' VAR
		{$$ = $1*$3;}
	| VAR
	;

VAR  
	: NUMBER
	;
