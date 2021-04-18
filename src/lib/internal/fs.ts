import { Functions } from "../functions";
import { Function } from "../function";
import { Value } from "../value";
import { StringValue } from "../stringvalue";
import * as fs from 'fs';

export class FSLib {
    apply() {
        Functions.set('readFile', <Function> {
            execute: async (...args: Value[]): Promise<Value> => {
                if(!args[0]) throw new Error('Arg0 is not defined');
                
                let path = args[0].getString();
                let contents = fs.readFileSync(path, { encoding: 'utf8' });

                return new StringValue(contents);
            }
        });

        Functions.set('writeFile', <Function> {
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
}