"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const character_1 = require("../util/character");
const token_1 = require("./token");
const tokentype_1 = require("./tokentype");
class Lexer {
    constructor(input) {
        this.OPERATOR_CHARS = "+-*/";
        this.OPERATOR_TOKENS = [
            tokentype_1.TokenType.PLUS, tokentype_1.TokenType.MINUS,
            tokentype_1.TokenType.STAR, tokentype_1.TokenType.SLASH
        ];
        this.input = input;
        this.tokens = [];
        this.pos = 0;
        this.length = input.length;
    }
    tokenize() {
        while (this.pos < this.length) {
            let current = this.peek(0);
            if (character_1.Character.isDigit(current))
                this.tokenizeNumber();
            else if (this.OPERATOR_CHARS.includes(current))
                this.tokenizeOperator();
            else
                this.next();
        }
        return this.tokens;
    }
    // Tokenize methods
    tokenizeNumber() {
        let buffer = '';
        let current = this.peek(0);
        while (character_1.Character.isDigit(current)) {
            buffer += current;
            current = this.next();
        }
        this.addToken(tokentype_1.TokenType.NUMBER, buffer);
    }
    tokenizeOperator() {
        let index = this.OPERATOR_CHARS.indexOf(this.peek(0));
        this.addToken(this.OPERATOR_TOKENS[index]);
        this.next();
    }
    // Lexer methods
    addToken(type, value) {
        this.tokens.push(new token_1.Token(type, value));
    }
    peek(relativePosition) {
        let position = this.pos + relativePosition;
        if (position >= this.length)
            return '\0';
        return this.input.charAt(position);
    }
    next() {
        this.pos++;
        return this.peek(0);
    }
}
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map