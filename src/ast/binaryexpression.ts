import { NumberValue } from '../lib/numbervalue';
import { StringValue } from '../lib/stringvalue';
import { Value } from '../lib/value';
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

    async eval(): Promise<Value> {
        let value1 = await this.expr1.eval();
        let value2 = await this.expr2.eval();
        
        if(value1 instanceof StringValue) {
            let string1 = value1.getString();
            let string2 = value2.getString();

            switch(this.operation) {
                case OperationType.SUM:
                default: return new StringValue(string1 + string2);
            }
        }

        let res1 = value1.getNumber();
        let res2 = value2.getNumber();
        
        switch(this.operation) {
            case OperationType.SUM: return new NumberValue(res1 + res2);
            case OperationType.SUBTRACT: return new NumberValue(res1 - res2);
            case OperationType.MULTIPLY: return new NumberValue(res1 * res2);
            case OperationType.EXP: return new NumberValue(res1 ** res2);
            case OperationType.DIVIDE: {
                if(res2 == 0) return new NumberValue(0);

                return new NumberValue(res1 / res2);
            } default: return new NumberValue(res1 + res2);
        }
    }
}