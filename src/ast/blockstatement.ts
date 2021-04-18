import { Statement } from './statement';

export class BlockStatement implements Statement {
    private statements: Statement[];

    public constructor(statements: Statement[] = []) {
        this.statements = statements;
    }

    public add(statement: Statement) {
        this.statements.push(statement);
    }

    execute(): void {
        this.statements.forEach(statement => {
            statement.execute();
        });
    }
}