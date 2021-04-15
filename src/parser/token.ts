import { TokenType } from './tokentype';

export class Token {
    private type: TokenType;
    private text: string;

    public constructor(type?: TokenType, text?: string) {
        this.type = type ?? TokenType.EOF;
        this.text = text ?? '';
    }

    getType(): TokenType {
        return this.type;
    }

    setType(type: TokenType): void {
        this.type = type;
    }

    getText(): string {
        return this.text;
    }

    setText(text: string): void {
        this.text = text;
    }
}