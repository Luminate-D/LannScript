import { AssignmentStatement } from '../ast/assignmentstatement';
import { BinaryExpression } from '../ast/binaryexpression';
import { VariableExpression } from '../ast/variableexpression';
import { Expression } from '../ast/expression';
import { ValueExpression } from '../ast/valueexpression';
import { PrintStatement } from '../ast/printstatement';
import { Statement } from '../ast/statement';
import { UnaryExpression } from '../ast/UnaryExpression';
import { OperationType } from './operationtype';
import { Token } from './token';
import { TokenType } from './tokentype';
import { ConditionalExpression } from '../ast/conditionalexpression';
import { LogicalOperationType } from './logicaloperationtype';
import { IfStatement } from '../ast/ifstatement';
import { BlockStatement } from '../ast/blockstatement';
import { WhileStatement } from '../ast/whilestatement';
import { ForStatement } from '../ast/forstatement';
import { BreakStatement } from '../ast/breakstatement';
import { ContinueStatement } from '../ast/continuestatement';
import { FunctionalExpression } from '../ast/functionalexpression';
import { FunctionStatement } from '../ast/functionstatement';
import { FunctionDefine } from '../ast/functiondefine';
import { ReturnStatement } from '../ast/returnstatement';
import { ImportStatement } from '../ast/importstatement';
import { VariableDefineStatement } from '../ast/variabledefinestatement';

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

    parse(): Statement {
        let result = new BlockStatement();
        
        while(!this.match(TokenType.EOF)) {
            result.add(this.statement());
        }

        return result;
    }

    // Statement parser
    private block(): Statement {
        let block = new BlockStatement();

        this.consume(TokenType.LBRACE);
        while(!this.match(TokenType.RBRACE)) {
            block.add(this.statement());
        }

        return block;
    }

    private statementOrBlock(): Statement {
        if(this.get(0).getType() == TokenType.LBRACE) return this.block();
        else return this.statement();
    }

    private statement(): Statement {
        // if(this.match(TokenType.KW_PRINT)) return new PrintStatement(this.expression());
        if(this.match(TokenType.KW_IF)) return this.conditionalStatement();
        if(this.match(TokenType.KW_DO)) return this.doWhileStatement();
        if(this.match(TokenType.KW_WHILE)) return this.whileStatement();
        if(this.match(TokenType.KW_FOR)) return this.forStatement();
        if(this.match(TokenType.KW_BREAK)) return new BreakStatement();
        if(this.match(TokenType.KW_CONTINUE)) return new ContinueStatement();
        if(this.match(TokenType.KW_VOID)) return this.functionDefine();
        if(this.match(TokenType.KW_RETURN)) return new ReturnStatement(this.expression());
        if(this.match(TokenType.KW_IMPORT)) return this.importStatement();
        if(this.get(0).getType() == TokenType.KW_LET) return this.variableDefineStatement();

        if(this.get(0).getType() == TokenType.WORD
            && this.get(1).getType() == TokenType.LPAREN) {
            return new FunctionStatement(this._function());
        }

        return this.assignmentStatement();
    }

    private variableDefineStatement(): Statement {
        this.consume(TokenType.KW_LET);
        
        let current = this.get(0);
        if(this.match(TokenType.WORD) && this.get(0).getType() == TokenType.ASSIGN) {
            let variable = current.getText();
            this.consume(TokenType.ASSIGN);

            return new VariableDefineStatement(variable, this.expression());
        }

        throw new Error('Invalid variable define statement');
    }

    private assignmentStatement(): Statement {
        let current = this.get(0);
        if(this.match(TokenType.WORD) && this.get(0).getType() == TokenType.ASSIGN) {
            let variable = current.getText();
            this.consume(TokenType.ASSIGN);

            return new AssignmentStatement(variable, this.expression());
        }

        throw new SyntaxError('Invalid assignment statement');
    }

    private conditionalStatement(): Statement {
        let condition = this.expression();
        let ifStatement = this.statementOrBlock();

        let elseStatement: (Statement | null);
        if(this.match(TokenType.KW_ELSE)) {
            elseStatement = this.statementOrBlock();
        } else elseStatement = null;

        return new IfStatement(condition, ifStatement, elseStatement);
    }

    private whileStatement(): Statement {
        this.consume(TokenType.LPAREN);
        let condition = this.expression();
        this.consume(TokenType.RPAREN);
        let statement = this.statementOrBlock();

        return new WhileStatement(condition, statement);
    }

    private doWhileStatement(): Statement {
        let statement = this.statementOrBlock();
        this.consume(TokenType.KW_WHILE);
        this.consume(TokenType.LPAREN);
        let condition = this.expression();
        this.consume(TokenType.RPAREN);

        return new WhileStatement(condition, statement);
    }

    private forStatement(): Statement {
        this.consume(TokenType.LPAREN);
        let init = this.variableDefineStatement();
        this.consume(TokenType.SEMICOLON);
        let termination = this.expression();
        this.consume(TokenType.SEMICOLON);
        let increment = this.assignmentStatement();
        this.consume(TokenType.RPAREN);
        let block = this.statementOrBlock();

        return new ForStatement(init, termination, increment, block);
    }

    private functionDefine(): FunctionDefine {
        let name = this.consume(TokenType.WORD).getText();
        let args: string[] = [];

        this.consume(TokenType.LPAREN);
        while(!this.match(TokenType.RPAREN)) {
            args.push(this.consume(TokenType.WORD).getText());
            this.match(TokenType.COMMA);
        }

        let body = this.statementOrBlock();
        return new FunctionDefine(name, args, body);
    }

    private _function(): FunctionalExpression {
        let name = this.consume(TokenType.WORD).getText();

        this.consume(TokenType.LPAREN);
        let _function = new FunctionalExpression(name);
        while(!this.match(TokenType.RPAREN)) {
            _function.addArgument(this.expression());
            this.match(TokenType.COMMA);
        }

        return _function;
    }

    private importStatement(): Statement {
        if(this.match(TokenType.LT)) {
            let module = this.consume(TokenType.WORD).getText();
            this.consume(TokenType.GT);

            return new ImportStatement(module, true);
        }

        let module = this.consume(TokenType.TEXT).getText();
        return new ImportStatement(module, false);
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
        let result = this.exponentive();

        while(true) {
            if(this.match(TokenType.LT)) {
                result = new ConditionalExpression(
                    LogicalOperationType.LT, result, this.exponentive()
                );
                continue;
            }

            if(this.match(TokenType.LTEQUAL)) {
                result = new ConditionalExpression(
                    LogicalOperationType.LTEQ, result, this.exponentive()
                );
                continue;
            }

            if(this.match(TokenType.GT)) {
                result = new ConditionalExpression(
                    LogicalOperationType.GT, result, this.exponentive()
                );
                continue;
            }

            if(this.match(TokenType.GTEQUAL)) {
                result = new ConditionalExpression(
                    LogicalOperationType.GTEQ, result, this.exponentive()
                );
                continue;
            }
            
            break;
        }

        return result;
    }

    private exponentive(): Expression {
        let result = this.additive();

        while(true) {
            if(this.match(TokenType.EXP)) {
                result = new BinaryExpression(
                    OperationType.EXP, result, this.additive()
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

        if(this.get(0).getType() == TokenType.WORD
            && this.get(1).getType() == TokenType.LPAREN) {
            return this._function();
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

        throw new SyntaxError('Unknown expression');
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