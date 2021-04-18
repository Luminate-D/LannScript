import { Value } from '../lib/value';
import { Expression } from './expression';
import { Statement } from './statement';

export class ReturnStatement extends Error implements Statement {
    private expression: Expression;
    private result: Value;

    public constructor(expression: Expression, result: Value) {
        super();
        this.expression = expression;
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    execute(): void {
        this.result = this.expression.eval();
        throw this;
    }
}