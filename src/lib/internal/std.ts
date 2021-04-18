import { Functions } from "../functions";
import { Function } from "../function";
import { Value } from "../value";
import { StringValue } from "../stringvalue";

export class STDLib {
    apply() {
        Functions.set('print', <Function> {
            execute: async (...args: Value[]): Promise<Value> => {
                let data = args.map(a => a.getString()).join(' ');

                console.log(data);
                return new StringValue(data);
            }
        });
    }
}