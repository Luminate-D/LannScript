import { Expression } from './expression';

export class UnaryExpression implements Expression {
    private expr: Expression;
    private operation: string;

    public constructor(
        operation: string,
        expr: Expression,
    ) {
        this.operation = operation;
        this.expr = expr;
    }

    eval(): number {
        switch(this.operation) {
            case '+': return this.expr.eval();
            case '-': return -this.expr.eval();
            default: return this.expr.eval();
        }
    }
}