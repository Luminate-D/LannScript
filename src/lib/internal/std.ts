import { Function } from "../function";
import { Value } from "../value";
import { StringValue } from "../stringvalue";
import { Arg1, Arg2 } from "./library";

export async function apply(addFunction: Arg1, addVariable: Arg2) {
    addFunction('print', <Function> {
        execute: async (...args: Value[]): Promise<Value> => {
            let data = args.map(a => a.getString()).join(' ');

            console.log(data);
            return new StringValue(data);
        }
    });
}