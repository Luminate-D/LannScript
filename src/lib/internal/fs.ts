import { Function } from "../function";
import { Value } from "../value";
import { StringValue } from "../stringvalue";
import * as fs from 'fs';
import { Arg1, Arg2 } from "./library";

export async function apply(addFunction: Arg1, addVariable: Arg2) {
    addFunction('readFile', <Function> {
        execute: async (...args: Value[]): Promise<Value> => {
            if(!args[0]) throw new Error('Arg0 is not defined');
            
            let path = args[0].getString();
            let contents = fs.readFileSync(path, { encoding: 'utf8' });

            return new StringValue(contents);
        }
    });

    addFunction('writeFile', <Function> {
        execute: async (...args: Value[]): Promise<Value> => {
            if(!args[0]) throw new Error('Arg0 is not defined');
            if(!args[1]) throw new Error('Arg1 is not defined');
            
            let path = args[0].getString();
            let contents = args[1].getString();
            fs.writeFileSync(path, contents, { encoding: 'utf8' });

            return new StringValue(contents);
        }
    });
}
