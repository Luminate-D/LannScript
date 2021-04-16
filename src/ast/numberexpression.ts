import { Expression } from './expression';

export class NumberExpression implements Expression {
    private value: number;

    public constructor(value: number) {
        this.value = value;
    }

    eval(): number {
        return this.value;
    }
}