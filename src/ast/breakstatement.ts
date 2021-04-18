import { Statement } from './statement';

export class BreakStatement extends Error implements Statement {
    execute(): void {
        throw this;
    }
}