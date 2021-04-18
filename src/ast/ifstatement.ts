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

    async execute(): Promise<void> {
        let result = (await this.expression.eval()).getNumber();
        if(result != 0) await this.ifStatement.execute();
        else if(this.elseStatement != null) await this.elseStatement.execute();
    }
}