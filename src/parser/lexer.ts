import { Character } from '../util/character';
import { Token } from './token';
import { TokenType } from './tokentype';

export class Lexer {
    private OPERATOR_CHARS: string;
    private OPERATOR_TOKENS: TokenType[];

    private input: string;
    private tokens: Token[];

    private pos: number;
    private length: number;

    public constructor(input: string) {
        this.OPERATOR_CHARS = "+-*/()";
        this.OPERATOR_TOKENS = [
            TokenType.PLUS, TokenType.MINUS,
            TokenType.STAR, TokenType.SLASH,
            TokenType.LPAREN, TokenType.RPAREN
        ];

        this.input = input;
        this.tokens = [];
        this.pos = 0;

        this.length = input.length;
    }

    tokenize(): Token[] {
        while(this.pos < this.length) {
            let current = this.peek(0);
            if(Character.isDigit(current)) this.tokenizeNumber();
            else if(this.OPERATOR_CHARS.includes(current)) this.tokenizeOperator();
            else this.next();
        }

        return this.tokens;
    }

    // Tokenize methods
    private tokenizeNumber(): void {
        let buffer = '';
        let current = this.peek(0);
        while(Character.isDigit(current)) {
            buffer += current;
            current = this.next();
        }

        this.addToken(TokenType.NUMBER, buffer);
    }

    private tokenizeOperator(): void {
        let index = this.OPERATOR_CHARS.indexOf(this.peek(0));
        this.addToken(this.OPERATOR_TOKENS[index]);
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