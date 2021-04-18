import { Value } from "./value";

export interface Function {
    execute(...args: Value[]): Promise<Value>;
}