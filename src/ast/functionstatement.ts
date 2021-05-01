import { Stack, StackValue } from '../lib/stack';
import { Value } from '../lib/value';
import { FunctionalExpression } from './functionalexpression';
import { Statement } from './statement';

export class FunctionStatement implements Statement {
    private expr: FunctionalExpression;

    public constructor(expr: FunctionalExpression) {
        this.expr = expr;
    }

    async execute(): Promise<void> {
        await this.expr.eval();
        Stack.pop();
    }
}