import { Expression } from './expression';
import { Statement } from './statement';

export class PrintStatement implements Statement {
    private expression: Expression;

    public constructor(expression: Expression) {
        this.expression = expression;
    }

    execute(): void {
        console.log('[Inner Console]:', this.expression.eval().getString());
    }
}