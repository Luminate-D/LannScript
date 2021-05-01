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

    async execute(): Promise<void> {
        for(await this.init.execute();
            (await this.termination.eval()).getNumber() != 0;
            await this.increment.execute()) {
            try {
                await this.block.execute();
            } catch (e) {
                if(e instanceof BreakStatement) break;
                if(e instanceof ContinueStatement) continue;
                break;
            }
        }
    }
}