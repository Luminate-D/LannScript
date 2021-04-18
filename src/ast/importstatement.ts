import { Library } from '../lib/external/library';
import { Statement } from './statement';

export class ImportStatement implements Statement {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    execute(): void {
        try {
            let lib = require(`../lib/external/${this.name}`);
            let instance = new (lib[Object.keys(lib)[0]])();
            instance.apply();
        } catch {
            throw new Error(`Library '${this.name}' not found`);
        }
    }
}