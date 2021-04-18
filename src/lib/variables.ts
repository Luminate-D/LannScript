import { NumberValue } from './numbervalue';
import { Value } from './value';

export class Variables {
    private static ZERO = new NumberValue(0);
    private static variables: Map<String, Value> = new Map<String, Value>([
        [ 'PI', new NumberValue(Math.PI) ],
        [ 'E', new NumberValue(Math.E) ]
    ]);

    private static stack: Map<String, Value>[] = [];

    public static push() {
        this.stack.push(new Map(this.variables));
    }

    public static pop() {
        this.variables = this.stack.pop() as Map<String, Value>;
    }

    public static isExists(key: string): boolean {
        return Variables.variables.has(key);
    }

    public static get(key: string): Value {
        if(!this.isExists(key)) return Variables.ZERO;
        return Variables.variables.get(key) as Value;
    }

    public static set(key: string, value: Value): void {
        Variables.variables.set(key, value);
    }

    public static entries(): Array<{ key: String, value: Value }> {
        let arr: Array<{ key: String, value: Value }> = [];
        Variables.variables.forEach((value, key) => {
            arr.push({ key, value });
        });

        return arr;
    }
}