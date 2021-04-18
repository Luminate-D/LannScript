import { MathLib } from '../lib/external/math';
import { Statement } from './statement';

export class ImportStatement implements Statement {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    execute(): void {
        if(this.name == 'math') return new MathLib().apply();
        throw new Error(`Library '${this.name}' not found`);
    }
}