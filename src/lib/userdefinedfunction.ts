import { ReturnStatement } from "../ast/returnstatement";
import { Statement } from "../ast/statement";
import { Function } from "./function";
import { NumberValue } from "./numbervalue";
import { Value } from "./value";

export class UserDefinedFunction implements Function {
    private args: string[];
    private body: Statement;

    public constructor(args: string[], body: Statement) {
        this.args = args;
        this.body = body;
    }

    getArgsCount(): number {
        return this.args.length;
    }

    getArgName(index: number): string {
        if(index < 0 || index > this.getArgsCount()) return "";
        return this.args[index];
    }

    execute(...args: Value[]): Value {
        try {
            this.body.execute();
        } catch (e) {
            let err = e as ReturnStatement;
            return err.getResult();
        }
        
        return NumberValue.ZERO;
    }
}