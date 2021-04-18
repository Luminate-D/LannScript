import { Value } from '../lib/value';

export interface Expression {
    eval(): Promise<Value>;
}