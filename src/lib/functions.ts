import { Function } from './function';
import { NumberValue } from './numbervalue';
import { StringValue } from './stringvalue';
import { Value } from './value';

export class Functions {
    private static functions: Map<String, Function> = new Map<String, Function>([
        [ 'print', <Function> {
            execute(...args: Value[]): Value {
                let data = args.map(a => a.getString()).join(' ');
                
                console.log('[Inner Console]:', data);
                return new StringValue(data);
            }
        } ]
    ]);

    public static isExists(key: string): boolean {
        return Functions.functions.has(key);
    }

    public static get(key: string): Function {
        if(!this.isExists(key)) throw new ReferenceError(`Function "${key}" is not defined`);
        return Functions.functions.get(key) as Function;
    }

    public static set(key: string, value: Function): void {
        Functions.functions.set(key, value);
    }
}