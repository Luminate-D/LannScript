import { BinaryExpression } from '../ast/binaryexpression';
import { Expression } from '../ast/expression';
import { NumberExpression } from '../ast/numberexpression';
import { UnaryExpression } from '../ast/UnaryExpression';
import { RuntimeException } from '../errors/runtime';
import { OperationType } from './operationtype';
import { Token } from './token';
import { TokenType } from './tokentype';

export class Parser {
    private EOF = new Token(TokenType.EOF);

    private tokens: Token[];
    private pos: number;
    private size: number;

    public constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.size = tokens.length;
        this.pos = 0;
    }

    parse(): Expression[] {
        let result: Expression[] = [];
        
        while(!this.match(TokenType.EOF)) {
            result.push(this.expression());
        }

        return result;
    }

    // Expression parser
    private expression(): Expression {
        return this.additive();
    }

    private additive(): Expression {
        let result = this.multiplicative();

        while(true) {
            if(this.match(TokenType.PLUS)) {
                result = new BinaryExpression(
                    OperationType.SUM, result, this.multiplicative()
                );
                continue;
            }

            if(this.match(TokenType.MINUS)) {
                result = new BinaryExpression(
                    OperationType.SUBTRACT, result, this.multiplicative()
                );
                continue;
            }
            
            break;
        }

        return result;
    }

    private multiplicative(): Expression {
        let result = this.unary();

        while(true) {
            if(this.match(TokenType.STAR)) {
                result = new BinaryExpression(
                    OperationType.MULTIPLY, result, this.unary()
                );
                continue;
            }

            if(this.match(TokenType.SLASH)) {
                result = new BinaryExpression(
                    OperationType.DIVIDE, result, this.unary()
                );
                continue;
            }
            
            break;
        }

        return result;
    }

    private unary(): Expression {
        if(this.match(TokenType.MINUS)) {
            return new UnaryExpression(
                '-', this.primary()
            );
        }

        if(this.match(TokenType.PLUS)) {
            return this.primary();
        }
        
        return this.primary();
    }

    private primary(): Expression {
        let current = this.get(0);
        if(this.match(TokenType.NUMBER)) {
            return new NumberExpression(
                parseFloat(current.getText())
            );
        }

        if(this.match(TokenType.LPAREN)) {
            let result = this.expression();
            this.match(TokenType.RPAREN);
            
            return result;
        }

        throw new RuntimeException('Unknown expression');
    }

    // Parser methods
    private match(type: TokenType): boolean {
        let current = this.get(0);
        let matches = current.getType() == type;

        if(matches) this.pos++;
        return matches;
    }

    private get(relativePosition: number): Token {
        let position = this.pos + relativePosition;
        if(position >= this.size) return this.EOF;
        return this.tokens[position];
    }
}