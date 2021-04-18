import { BreakStatement } from './breakstatement';
import { ContinueStatement } from './continuestatement';
import { Expression } from './expression';
import { Statement } from './statement';

export class ForStatement implements Statement {
    private init: Statement;
    private termination: Expression;
    private increment: Statement;
    private block: Statement;

    public constructor(
            init: Statement,
            termination: Expression,
            increment: Statement,
            block: Statement
        ) {
        this.init = init;
        this.termination = termination;
        this.increment = increment;
        this.block = block;
    }

    execute(): void {
        for(this.init.execute();
            this.termination.eval().getNumber() != 0;
            this.increment.execute()) {
            try {
                this.block.execute();
            } catch (e) {
                if(e instanceof BreakStatement) break;
                if(e instanceof ContinueStatement) continue;
                break;
            }
        }
    }
}