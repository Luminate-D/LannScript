import { Function } from './function';
export class Functions {
    private static functions: Map<String, Function> = new Map<String, Function>();

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