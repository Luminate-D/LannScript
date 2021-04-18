import { Functions } from '../lib/functions';
import { NumberValue } from '../lib/numbervalue';
import { UserDefinedFunction } from '../lib/userdefinedfunction';
import { Value } from '../lib/value';
import { Statement } from './statement';

export class FunctionDefine implements Statement {
    private name: string;
    private args: string[];
    private body: Statement;

    public constructor(name: string, args: string[], body: Statement) {
        this.name = name;
        this.args = args;
        this.body = body;
    }

    execute(): Value {
        Functions.set(this.name, new UserDefinedFunction(this.args, this.body));
        return NumberValue.ZERO;
    }
}