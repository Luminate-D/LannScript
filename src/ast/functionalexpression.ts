import { Functions } from '../lib/functions';
import { UserDefinedFunction } from '../lib/userdefinedfunction';
import { Value } from '../lib/value';
import { Variables } from '../lib/variables';
import { Expression } from './expression';
import * as Bluebird from 'bluebird';
import { Stack, StackValue } from '../lib/stack';

export class FunctionalExpression implements Expression {
    private name: string;
    private args: Expression[];
    private path: string;

    public constructor(name: string, path: string, args: Expression[] = []) {
        this.name = name;
        this.args = args;
        this.path = path;
    }

    addArgument(arg: Expression) {
        this.args.push(arg);
    }

    async eval(): Promise<Value> {
        Stack.push(
            new StackValue(this.name, this.path)
        );

        let values: Value[] = [];
        await Bluebird.each(this.args, async arg => {
            values.push(await arg.eval());
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

            let result = await userFunction.execute();
            Variables.pop();

            Stack.pop();
            return result;
        }

        let result = await func.execute(...values);

        Stack.pop();
        return result;
    }
}