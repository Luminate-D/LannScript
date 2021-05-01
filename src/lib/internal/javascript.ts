import { Function } from "../function";
import { Value } from "../value";
import { StringValue } from "../stringvalue";
import { Arg1, Arg2 } from "./library";

export async function apply(addFunction: Arg1, addVariable: Arg2) {
    addFunction('javascript', <Function> {
        execute: async (...args: Value[]): Promise<Value> => {
            if(!args[0]) throw new Error('Arg0 is not defined');
            
            let code = args[0].getString();

            let _res = undefined;
            try {
                _res = await eval(code);
            } catch (e) {
                throw new Error('JS Eval error: ' + e.toString());
            }

            return new StringValue(require('util').inspect(_res));
        }
    });
}
