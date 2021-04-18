import { Function } from '../lib/function';
import { Functions } from '../lib/functions';
import { Value } from '../lib/value';
import { Variables } from '../lib/variables';
import { Statement } from './statement';

export class ImportStatement implements Statement {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    async execute(): Promise<void> {
        try {
            let lib = require(`../lib/internal/${this.name}`);
            await lib.apply((name: string, fn: Function) => {
                Functions.set(name, fn);
            }, (name: string, value: Value) => {
                Variables.set(name, value);
            });
        } catch (e) {
            throw new Error(`Library '${this.name}' not found`);
        }
    }
}