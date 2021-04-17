import { Expression } from './expression';
import { Statement } from './statement';

export class IfStatement implements Statement {
    private expression: Expression;
    private ifStatement: Statement;
    private elseStatement: Statement | null;

    public constructor(expression: Expression, ifStatement: Statement, elseStatement: Statement | null) {
        this.expression = expression;
        this.ifStatement = ifStatement;
        this.elseStatement = elseStatement;
    }

    execute(): void {
        let result = this.expression.eval().getNumber();
        if(result != 0) this.ifStatement.execute();
        else if(this.elseStatement != null) this.elseStatement.execute();
    }
}