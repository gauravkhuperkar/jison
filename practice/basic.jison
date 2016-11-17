%lex

%%

\s+         {/* skip whitespace */}
[0-9]+      {return 'NAT';}
"+"         {return '+';}
"("			{return "(";}
")"			{return ")";}

/lex

%%

E
    : E '+' T
    | T
    ;

T
    : NAT
    ;
