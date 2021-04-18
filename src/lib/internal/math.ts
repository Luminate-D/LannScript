import { NumberValue } from "../numbervalue";
import { Function } from "../function";
import { Value } from "../value";
import { Arg1, Arg2 } from "./library";

export async function apply(addFunction: Arg1, addVariable: Arg2) {
    addVariable('PI', new NumberValue(Math.PI));
    addVariable('E', new NumberValue(Math.E));

    addFunction('sin', <Function> {
        execute: async (num: NumberValue): Promise<Value> => {
            if(!num) throw new ReferenceError('sin: First argument is not provided');
            return new NumberValue(
                Math.sin(num.getNumber())
            );
        }
    });

    addFunction('cos', <Function> {
        execute: async (num: NumberValue): Promise<Value> => {
            if(!num) throw new ReferenceError('cos: First argument is not provided');
            return new NumberValue(
                Math.cos(num.getNumber())
            );
        }
    });

    addFunction('tg', <Function> {
        execute: async (num: NumberValue): Promise<Value> => {
            if(!num) throw new ReferenceError('tg: First argument is not provided');
            return new NumberValue(
                Math.tan(num.getNumber())
            );
        }
    });

    addFunction('ctg', <Function> {
        execute: async (num: NumberValue): Promise<Value> => {
            if(!num) throw new ReferenceError('ctg: First argument is not provided');
            return new NumberValue(
                1 / Math.tan(num.getNumber())
            );
        }
    });

    addFunction('pow', <Function> {
        execute: async (num: NumberValue, num2: NumberValue): Promise<Value> => {
            if(!num) throw new ReferenceError('pow: First argument is not provided');
            if(!num2) throw new ReferenceError('pow: Second argument is not provided');
            
            return new NumberValue(
                Math.pow(num.getNumber(), num2.getNumber())
            );
        }
    });
}