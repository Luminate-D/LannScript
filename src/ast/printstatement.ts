import { Expression } from './expression';
import { Statement } from './statement';

export class PrintStatement implements Statement {
    private expression: Expression;

    public constructor(expression: Expression) {
        this.expression = expression;
    }

    async execute(): Promise<void> {
        console.log('[Inner Console]:', (await this.expression.eval()).getString());
    }
}