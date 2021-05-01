export class StackValue {
    private call: string;
    private location: string;

    public constructor(call: string, location: string) {
        this.call = call;
        this.location = location;
    }

    toString() {
        return `at ${this.call} (${this.location})`;
    }
}

export class Stack {
    private static stack: StackValue[] = [];
    
    public static push(element: StackValue) {
        this.stack.push(element);
    }

    public static pop(): StackValue {
        let element = this.stack[this.stack.length - 1];
        delete this.stack[this.stack.length - 1];

        this.stack = this.stack.filter(a => a != null);

        return element;
    }

    public static get(): StackValue[] {
        return this.stack;
    }
}