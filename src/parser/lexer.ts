import { Character } from '../util/character';
import { Token } from './token';
import { TokenType } from './tokentype';

export class Lexer {
    private OPERATOR_CHARS: string;
    private OPERATORS: Map<String, TokenType>;
    private KEYWORDS: Map<String, TokenType>;

    private input: string;
    private tokens: Token[];

    private pos: number;
    private length: number;

    public constructor(input: string) {
        this.OPERATOR_CHARS = "+-*/()=<>!&|{};,";

        this.OPERATORS = new Map();
        this.OPERATORS.set('+', TokenType.PLUS);
        this.OPERATORS.set('-', TokenType.MINUS);
        this.OPERATORS.set('*', TokenType.STAR);
        this.OPERATORS.set('/', TokenType.SLASH);
        this.OPERATORS.set('(', TokenType.LPAREN);
        this.OPERATORS.set(')', TokenType.RPAREN);
        this.OPERATORS.set('{', TokenType.LBRACE);
        this.OPERATORS.set('}', TokenType.RBRACE);
        this.OPERATORS.set('=', TokenType.ASSIGN);
        this.OPERATORS.set('<', TokenType.LT);
        this.OPERATORS.set('>', TokenType.GT);
        this.OPERATORS.set(';', TokenType.SEMICOLON);
        this.OPERATORS.set(',', TokenType.COMMA);
        this.OPERATORS.set('**', TokenType.EXP);

        this.OPERATORS.set('!', TokenType.EXCL);
        this.OPERATORS.set('&', TokenType.AMP);
        this.OPERATORS.set('|', TokenType.BAR);

        this.OPERATORS.set('==', TokenType.EQUAL);
        this.OPERATORS.set('!=', TokenType.NOT_EQUAL);
        this.OPERATORS.set('<=', TokenType.LTEQUAL);
        this.OPERATORS.set('>=', TokenType.GTEQUAL);
        
        this.OPERATORS.set('&&', TokenType.AMPAMP);
        this.OPERATORS.set('||', TokenType.BARBAR);
        
        this.KEYWORDS = new Map();
        this.KEYWORDS.set('import', TokenType.KW_IMPORT);
        this.KEYWORDS.set('if', TokenType.KW_IF);
        this.KEYWORDS.set('else', TokenType.KW_ELSE);
        this.KEYWORDS.set('while', TokenType.KW_WHILE);
        this.KEYWORDS.set('for', TokenType.KW_FOR);
        this.KEYWORDS.set('do', TokenType.KW_DO);
        this.KEYWORDS.set('break', TokenType.KW_BREAK);
        this.KEYWORDS.set('continue', TokenType.KW_CONTINUE);
        this.KEYWORDS.set('void', TokenType.KW_VOID);
        this.KEYWORDS.set('return', TokenType.KW_RETURN);
        this.KEYWORDS.set('let', TokenType.KW_LET);

        this.input = input;
        this.tokens = [];
        this.pos = 0;

        this.length = input.length;
    }

    tokenize(): Token[] {
        while(this.pos < this.length) {
            let current = this.peek(0);
            if(Character.isDigit(current)) this.tokenizeNumber();
            else if(Character.isLetter(current)) this.tokenizeWord();
            else if(current == '"') {
                this.tokenizeText();
            } else if(this.OPERATOR_CHARS.includes(current)) this.tokenizeOperator();
            else this.next();
        }

        return this.tokens;
    }

    // Tokenize methods
    private tokenizeWord(): void {
        let buffer = '';
        let current = this.peek(0);
        while(true) {
            if(!Character.isDigit(current)
                && !Character.isLetter(current)
                && !/\$_/g.test(current)) break;
            buffer += current;
            current = this.next();
        }

        if(this.KEYWORDS.has(buffer)) return this.addToken(this.KEYWORDS.get(buffer) as TokenType);
        this.addToken(TokenType.WORD, buffer);
    }

    private tokenizeText(): void {
        this.next();

        let buffer = '';
        let current = this.peek(0);
        while(true) {
            if(current == '\\') {
                current = this.next();
                switch(current) {
                    case '"': {
                        current = this.next();
                        buffer += '"';
                        continue;
                    }

                    case 'n': {
                        current = this.next();
                        buffer += '\n';
                        continue;
                    }

                    case 't': {
                        current = this.next();
                        buffer += '\t';
                        continue;
                    }
                }

                buffer += '\\';
                continue;
            }

            if(current == '"') break;

            buffer += current;
            current = this.next();
        }

        this.next();
        this.addToken(TokenType.TEXT, buffer);
    }

    private tokenizeNumber(): void {
        let buffer = '';
        let current = this.peek(0);
        while(true) {
            if(current == '.') {
                if(buffer.includes('.')) throw new SyntaxError(`Unexpected character '.' while parsing '${buffer}.'`);
            } else if(!Character.isDigit(current)) break;

            buffer += current;
            current = this.next();
        }

        this.addToken(TokenType.NUMBER, buffer);
    }

    private tokenizeOperator(): void {
        let current = this.peek(0);
        if(current == '/') {
            if(this.peek(1) == '/') {
                this.next();
                this.next();
                this.tokenizeComment();

                return;
            } else if(this.peek(1) == '*') {
                this.next();
                this.next();
                this.tokenizeMultilineComment();

                return;
            }
        }

        let buffer = '';
        while(true) {
            let text = buffer.toString();
            if(!this.OPERATORS.has(text + current)
                && text.length > 0) {
                this.addToken(this.OPERATORS.get(text) as TokenType);
                return;
            }

            buffer += current;
            current = this.next();
        }
    }

    private tokenizeComment(): void {
        let current = this.peek(0);
        while('\r\n\0'.indexOf(current) == -1) {
            current = this.next();
        }
    }

    private tokenizeMultilineComment(): void {
        let current = this.peek(0);
        while(true) {
            if(current == '\0') throw new SyntaxError('Missing multiline comment close tag');
            if(current == '*' && this.peek(1) == '/') break;
            current = this.next();
        }

        this.next();
        this.next();
    }

    // Lexer methods
    private addToken(type: TokenType, value?: string): void {
        this.tokens.push(
            new Token(type, value)
        );
    }

    private peek(relativePosition: number): string {
        let position = this.pos + relativePosition;
        if(position >= this.length) return '\0';
        return this.input.charAt(position);
    }

    private next(): string {
        this.pos++;
        return this.peek(0);
    }
}