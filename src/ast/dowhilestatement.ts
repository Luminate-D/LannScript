import { BreakStatement } from './breakstatement';
import { ContinueStatement } from './continuestatement';
import { Expression } from './expression';
import { Statement } from './statement';

export class DoWhileStatement implements Statement {
    private condition: Expression;
    private statement: Statement;

    public constructor(condition: Expression, statement: Statement) {
        this.condition = condition;
        this.statement = statement;
    }

    async execute(): Promise<void> {
        do {
            try {
                await this.statement.execute();
            } catch (e) {
                if(e instanceof BreakStatement) break;
                if(e instanceof ContinueStatement) continue;
                break;
            }
        } while((await this.condition.eval()).getNumber() != 0);
    }
}