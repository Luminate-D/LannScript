import { Value } from '../lib/value';
import { Variables } from '../lib/variables';
import { Expression } from './expression';

export class VariableExpression implements Expression {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    eval(): Value {
        if(!Variables.isExists(this.name)) throw new ReferenceError(`'${this.name}' is not defined`)
        return Variables.get(this.name);
    }
}