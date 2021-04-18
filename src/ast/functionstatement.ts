import { Value } from '../lib/value';
import { FunctionalExpression } from './functionalexpression';
import { Statement } from './statement';

export class FunctionStatement implements Statement {
    private expr: FunctionalExpression;

    public constructor(expr: FunctionalExpression) {
        this.expr = expr;
    }

    execute(): Value {
        return this.expr.eval();
    }
}