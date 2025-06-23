grammar Logic;

expr
    : expr '->' expr    # impliesExpr
    | expr '^' expr     # andExpr
    | expr 'v' expr     # orExpr
    | '~' expr          # notExpr
    | '(' expr ')'      # parensExpr
    | ID                # idExpr
    ;

ID  : [a-z]+ ;
WS  : [ \t\r\n]+ -> skip ;