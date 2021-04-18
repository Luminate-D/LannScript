import { Functions } from '../lib/functions';
import { UserDefinedFunction } from '../lib/userdefinedfunction';
import { Value } from '../lib/value';
import { Variables } from '../lib/variables';
import { Expression } from './expression';

export class FunctionalExpression implements Expression {
    private name: string;
    private args: Expression[];

    public constructor(name: string, args: Expression[] = []) {
        this.name = name;
        this.args = args;
    }

    addArgument(arg: Expression) {
        this.args.push(arg);
    }

    eval(): Value {
        let values: Value[] = [];
        this.args.forEach(arg => {
            values.push(arg.eval());
        });

        let func = Functions.get(this.name);
        if(func instanceof UserDefinedFunction) {
            let userFunction = func as UserDefinedFunction;
            if(values.length != userFunction.getArgsCount())
                throw new Error(`${this.name}: ${userFunction.getArgsCount()} arguments expected, received ${values.length}`);
            
            Variables.push();
            for(let i = 0; i < values.length; i++) {
                Variables.set(userFunction.getArgName(i), values[i]);
            }

            let result = userFunction.execute();
            Variables.pop();

            return result;
        }

        return func.execute(...values);
    }
}