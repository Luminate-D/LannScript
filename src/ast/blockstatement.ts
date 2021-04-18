import { Statement } from './statement';
import * as Bluebird from 'bluebird';

export class BlockStatement implements Statement {
    private statements: Statement[];

    public constructor(statements: Statement[] = []) {
        this.statements = statements;
    }

    public add(statement: Statement) {
        this.statements.push(statement);
    }

    async execute(): Promise<void> {
        await Bluebird.each(this.statements, async statement => {
            await statement.execute();
        });
    }
}