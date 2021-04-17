export class Character {
    static isDigit(char: string): boolean {
        let num = parseInt(char);
        return !isNaN(num) && isFinite(num);
    }

    static isLetter(char: string): boolean {
        return /[A-Za-zА-Яа-я]+/g.test(char);
    }
}