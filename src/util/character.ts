export class Character {
    static isDigit(char: string): boolean {
        let num = parseInt(char);
        return !isNaN(num) && isFinite(num);
    }
}