import { Statement } from './statement';

export class ContinueStatement extends Error implements Statement {
    async execute(): Promise<void> {
        throw this;
    }
}