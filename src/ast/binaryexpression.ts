import { OperationType } from '../parser/operationtype';
import { Expression } from './expression';

export class BinaryExpression implements Expression {
    private expr1: Expression;
    private expr2: Expression;
    private operation: OperationType;

    public constructor(
        operation: OperationType,
        expr1: Expression,
        expr2: Expression
    ) {
        this.operation = operation;
        this.expr1 = expr1;
        this.expr2 = expr2;
    }

    eval(): number {
        switch(this.operation) {
            case OperationType.SUM: return this.expr1.eval() + this.expr2.eval();
            case OperationType.SUBTRACT: return this.expr1.eval() - this.expr2.eval();
            case OperationType.MULTIPLY: return this.expr1.eval() * this.expr2.eval();
            case OperationType.DIVIDE: {
                let val1 = this.expr1.eval();
                let val2 = this.expr2.eval();
                if(val2 == 0) return 0;

                return val1 / val2;
            } default: return this.expr1.eval() + this.expr2.eval();
        }
    }
}