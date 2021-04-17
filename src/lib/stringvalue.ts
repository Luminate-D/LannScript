import { Value } from './value';

export class StringValue implements Value {
    private value: string;

    public constructor(value: string) {
        this.value = value;
    }

    public getNumber(): number {
        let result = parseFloat(this.value);
        return isNaN(result) && !isFinite(result) ? 0 : result;
    }

    public getString(): string {
        return this.value;
    }

    public toString(): string {
        return this.getString();
    }
}