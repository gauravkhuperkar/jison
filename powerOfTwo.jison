/* this grammer accepts numbers in power of two. consideration is 0 and 1 numbers are to be used and treat them as binary numbers*/

%lex
%%

\s+ /**/	
"1""0"+	{ return 'number'; }
"0"+	{ return 'number'; }

/lex
%start twoPowerExpr
%%

twoPowerExpr          
	: 'number'
	;
