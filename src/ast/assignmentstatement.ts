import { Variables } from '../lib/variables';
import { Expression } from './expression';
import { Statement } from './statement';

export class AssignmentStatement implements Statement {
    private variable: string;
    private expression: Expression;

    public constructor(variable: string, expression: Expression) {
        this.variable = variable;
        this.expression = expression;
    }

    async execute(): Promise<void> {
        let result = await this.expression.eval();

        if(!Variables.isExists(this.variable)) throw new Error('Assign to undefined variable "' + this.variable + '"');
        Variables.set(this.variable, result);
    }
}