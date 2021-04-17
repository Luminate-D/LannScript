import { NumberValue } from '../lib/numbervalue';
import { StringValue } from '../lib/stringvalue';
import { Value } from '../lib/value';
import { Expression } from './expression';

export class ValueExpression implements Expression {
    private value: Value;

    public constructor(value: (number | string)) {
        if(typeof value == 'number') this.value = new NumberValue(value);
        else this.value = new StringValue(value);
        
    }

    eval(): Value {
        return this.value;
    }
}