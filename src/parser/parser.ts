import { AssignmentStatement } from '../ast/assignmentstatement';
import { BinaryExpression } from '../ast/binaryexpression';
import { VariableExpression } from '../ast/variableexpression';
import { Expression } from '../ast/expression';
import { ValueExpression } from '../ast/valueexpression';
import { PrintStatement } from '../ast/printstatement';
import { Statement } from '../ast/statement';
import { UnaryExpression } from '../ast/UnaryExpression';
import { RuntimeException } from '../errors/runtime';
import { OperationType } from './operationtype';
import { Token } from './token';
import { TokenType } from './tokentype';
import { ConditionalExpression } from '../ast/conditionalexpression';
import { LogicalOperationType } from './logicaloperationtype';
import { IfStatement } from '../ast/ifstatement';

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

    parse(): Statement[] {
        let result: Statement[] = [];
        
        while(!this.match(TokenType.EOF)) {
            result.push(this.statement());
        }

        return result;
    }

    // Statement parser
    private statement(): Statement {
        if(this.match(TokenType.KW_PRINT)) {
            return new PrintStatement(this.expression());
        }

        if(this.match(TokenType.KW_IF)) {
            return this.conditionalStatement();
        }

        return this.assignmentStatement();
    }

    private assignmentStatement(): Statement {
        let current = this.get(0);
        if(this.match(TokenType.WORD) && this.get(0).getType() == TokenType.ASSIGN) {
            let variable = current.getText();
            this.consume(TokenType.ASSIGN);

            return new AssignmentStatement(variable, this.expression());
        }

        throw new RuntimeException('Unknown statement (operator)');
    }

    private conditionalStatement(): Statement {
        let condition = this.expression();
        let ifStatement = this.statement();

        let elseStatement: (Statement | null);
        if(this.match(TokenType.KW_ELSE)) {
            elseStatement = this.statement();
        } else elseStatement = null;

        return new IfStatement(condition, ifStatement, elseStatement);
    }

    // Expression parser
    private expression(): Expression {
        return this.logicalOr();
    }

    private logicalOr(): Expression {
        let result = this.logicalAnd();

        while(true) {
            if(this.match(TokenType.BARBAR)) {
                result = new ConditionalExpression(
                    LogicalOperationType.OR, result, this.logicalAnd()
                );
                continue;
            }

            break;
        }
        
        return result;
    }

    private logicalAnd(): Expression {
        let result = this.equality();
        
        while(true) {
            if(this.match(TokenType.AMPAMP)) {
                result = new ConditionalExpression(
                    LogicalOperationType.AND, result, this.equality()
                );
                continue;
            }

            break;
        }

        return result;
    }

    private equality(): Expression {
        let result = this.conditional();

        if(this.match(TokenType.EQUAL)) {
            return new ConditionalExpression(
                LogicalOperationType.EQUAL, result, this.conditional()
            );
        }

        if(this.match(TokenType.NOT_EQUAL)) {
            return new ConditionalExpression(
                LogicalOperationType.NOT_EQUAL, result, this.conditional()
            );
        }

        return result;
    }

    private conditional(): Expression {
        let result = this.additive();

        while(true) {
            if(this.match(TokenType.LT)) {
                result = new ConditionalExpression(
                    LogicalOperationType.LT, result, this.additive()
                );
                continue;
            }

            if(this.match(TokenType.LTEQUAL)) {
                result = new ConditionalExpression(
                    LogicalOperationType.LTEQ, result, this.additive()
                );
                continue;
            }

            if(this.match(TokenType.GT)) {
                result = new ConditionalExpression(
                    LogicalOperationType.GT, result, this.additive()
                );
                continue;
            }

            if(this.match(TokenType.GTEQUAL)) {
                result = new ConditionalExpression(
                    LogicalOperationType.GTEQ, result, this.additive()
                );
                continue;
            }
            
            break;
        }

        return result;
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
                OperationType.SUBTRACT, this.primary()
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
            return new ValueExpression(
                parseFloat(current.getText())
            );
        }

        if(this.match(TokenType.WORD)) {
            return new VariableExpression(
                current.getText()
            );
        }

        if(this.match(TokenType.TEXT)) {
            return new ValueExpression(
                current.getText()
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
    private consume(type: TokenType): Token {
        let current = this.get(0);
        if(current.getType() != type) throw new SyntaxError(`Unexpected token ${TokenType[current.getType()]}, expected ${TokenType[type]}`);

        this.pos++;
        return current;
    }

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