import { NumberValue } from '../lib/numbervalue';
import { StringValue } from '../lib/stringvalue';
import { Value } from '../lib/value';
import { LogicalOperationType } from '../parser/logicaloperationtype';
import { Expression } from './expression';

export class ConditionalExpression implements Expression {
    private expr1: Expression;
    private expr2: Expression;
    private operation: LogicalOperationType;

    public constructor(
        operation: LogicalOperationType,
        expr1: Expression,
        expr2: Expression
    ) {
        this.operation = operation;
        this.expr1 = expr1;
        this.expr2 = expr2;
    }

    eval(): Value {
        let value1 = this.expr1.eval();
        let value2 = this.expr2.eval();
        
        let number1: number;
        let number2: number;

        if(value1 instanceof StringValue) {
            number1 = new NumberValue(value1.getString() < value2.getString()).getNumber();
            number2 = 0;

            // let string1 = value1.getString();
            // let string2 = value2.getString();

            // switch(this.operation) {
            //     case LogicalOperationType.LOWER: return new NumberValue(string1 < string2);
            //     case LogicalOperationType.HIGHER: return new NumberValue(string1 > string2);
            //     case LogicalOperationType.EQUAL:
            //     default: return new NumberValue(string1 == string2);
            // }
        } else {
            number1 = value1.getNumber();
            number2 = value2.getNumber();
        }
        
        let result: boolean;
        switch(this.operation) {
            case LogicalOperationType.LT: result = number1 < number2; break;
            case LogicalOperationType.LTEQ: result = number1 <= number2; break;
            case LogicalOperationType.GT: result = number1 > number2; break;
            case LogicalOperationType.GTEQ: result = number1 >= number2; break;
            case LogicalOperationType.NOT_EQUAL: result = number1 != number2; break;

            case LogicalOperationType.AND: result = (number1 != 0) && (number2 != 0); break;
            case LogicalOperationType.OR: result = (number1 != 0) || (number2 != 0); break;

            case LogicalOperationType.EQUAL:
            default: result = number1 == number2;
        }

        return new NumberValue(result);
    }
}