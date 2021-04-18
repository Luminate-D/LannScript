import { Functions } from "../functions";
import { NumberValue } from "../numbervalue";
import { Variables } from "../variables";
import { Function } from "../function";
import { Value } from "../value";

export class MathLib {
    apply() {
        Variables.set('PI', new NumberValue(Math.PI));
        Variables.set('E', new NumberValue(Math.E));

        Functions.set('sin', <Function> {
            execute: (num: NumberValue): Value => {
                if(!num) throw new ReferenceError('sin: First argument is not provided');
                return new NumberValue(
                    Math.sin(num.getNumber())
                );
            }
        });

        Functions.set('cos', <Function> {
            execute: (num: NumberValue): Value => {
                if(!num) throw new ReferenceError('cos: First argument is not provided');
                return new NumberValue(
                    Math.cos(num.getNumber())
                );
            }
        });

        Functions.set('tg', <Function> {
            execute: (num: NumberValue): Value => {
                if(!num) throw new ReferenceError('tg: First argument is not provided');
                return new NumberValue(
                    Math.tan(num.getNumber())
                );
            }
        });

        Functions.set('ctg', <Function> {
            execute: (num: NumberValue): Value => {
                if(!num) throw new ReferenceError('ctg: First argument is not provided');
                return new NumberValue(
                    1 / Math.tan(num.getNumber())
                );
            }
        });

        Functions.set('pow', <Function> {
            execute: (num: NumberValue, num2: NumberValue): Value => {
                if(!num) throw new ReferenceError('pow: First argument is not provided');
                if(!num2) throw new ReferenceError('pow: Second argument is not provided');
                
                return new NumberValue(
                    Math.pow(num.getNumber(), num2.getNumber())
                );
            }
        });
    }
}