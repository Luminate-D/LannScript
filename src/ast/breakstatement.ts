import { Statement } from './statement';

export class BreakStatement extends Error implements Statement {
    async execute(): Promise<void> {
        throw this;
    }
}