export enum TokenType {
    NUMBER, WORD,
    TEXT,

    PLUS, MINUS,
    STAR, SLASH,

    ASSIGN, EQUAL, NOT_EQUAL,
    LT, GT,
    LTEQUAL, GTEQUAL,
    EXCL,
    
    BAR, BARBAR,
    AMP, AMPAMP,

    LPAREN, RPAREN,

    KW_PRINT,
    KW_IF, KW_ELSE,

    EOF
}