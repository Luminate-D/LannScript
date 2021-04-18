import { Statement } from './statement';

export class ImportStatement implements Statement {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    async execute(): Promise<void> {
        try {
            let lib = require(`../lib/internal/${this.name}`);

            let instance = new (lib[Object.keys(lib)[0]])();
            instance.apply();
        } catch (e) {
            throw new Error(`Library '${this.name}' not found`);
        }
    }
}