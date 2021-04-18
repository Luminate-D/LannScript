import { Statement } from './statement';

export class ContinueStatement extends Error implements Statement {
    execute(): void {
        throw this;
    }
}