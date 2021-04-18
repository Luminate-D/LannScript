import { Value } from './value';

export class NumberValue implements Value {
    public static ZERO: NumberValue = new NumberValue(0);
    private value: number;

    public constructor(value: (number | boolean)) {
        if(typeof value == 'number') this.value = value;
        else this.value = value ? 1 : 0;
    }

    public getNumber(): number {
        return this.value;
    }

    public getString(): string {
        return this.value.toString();
    }

    public toString(): string {
        return this.getString();
    }
}