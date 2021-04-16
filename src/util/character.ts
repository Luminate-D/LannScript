export class Character {
    static isDigit(char: string): boolean {
        let num = parseInt(char);
        return !isNaN(num) && isFinite(num);
    }

    static isHexMatches(char: string): boolean {
        return '0123456789abcdef'.includes(char.toLowerCase());
    }
}