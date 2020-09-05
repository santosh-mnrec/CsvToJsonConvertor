grammar CSV;
options{
    language='JavaScript';
}

csvFile: hdr row+ ;
hdr : row ;
row : field (',' field)* '\r'? '\n' ;
field
    : TEXT
    | STRING
    |   // empty string
    ;

TEXT   : ~[,\n\r"]+ ;
STRING : '"' ('""'|~'"')* '"' ; // quote-quote is an escaped quote