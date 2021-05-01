import { Function } from '../lib/function';
import { Functions } from '../lib/functions';
import { Value } from '../lib/value';
import { Variables } from '../lib/variables';
import { Lexer } from '../parser/lexer';
import { Parser } from '../parser/parser';
import { Statement } from './statement';
import * as fs from 'promise-fs';

export class ImportStatement implements Statement {
    private name: string;
    private internal: boolean;

    public constructor(name: string, internal: boolean) {
        this.name = name;
        this.internal = internal
    }

    async execute(): Promise<void> {
        try {
            if(this.internal) {
                let lib = require(`../lib/internal/${this.name}`);
                await lib.apply((name: string, fn: Function) => {
                    Functions.set(name, fn);
                }, (name: string, value: Value) => {
                    Variables.set(name, value);
                });
            } else {
                let content = await fs.readFile(this.name, { encoding: 'utf8' });
                let tokens = new Lexer(content).tokenize();
                let statement = new Parser(tokens, this.name).parse();

                await statement.execute();
            }
        } catch (e) {
            throw new Error(`Library '${this.name}' not found`);
        }
    }
}