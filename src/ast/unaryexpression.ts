import { NumberValue } from '../lib/numbervalue';
import { Value } from '../lib/value';
import { OperationType } from '../parser/operationtype';
import { Expression } from './expression';

export class UnaryExpression implements Expression {
    private expr: Expression;
    private operation: OperationType;

    public constructor(
        operation: OperationType,
        expr: Expression,
    ) {
        this.operation = operation;
        this.expr = expr;
    }

    async eval(): Promise<Value> {
        switch(this.operation) {
            case OperationType.SUBTRACT: return new NumberValue(-this.expr.eval());
            case OperationType.SUM:
            default: return this.expr.eval();
        }
    }
}