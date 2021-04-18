import { NumberValue } from '../lib/numbervalue';
import { Value } from '../lib/value';
import { Expression } from './expression';
import { Statement } from './statement';

export class ReturnStatement extends Error implements Statement {
    private expression: Expression;
    private result: Value;

    public constructor(expression: Expression) {
        super();
        this.expression = expression;
        this.result = new NumberValue(0);
    }

    getResult() {
        return this.result;
    }

    execute(): void {
        this.result = this.expression.eval();
        throw this;
    }
}