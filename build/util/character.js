"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    static isDigit(char) {
        let num = parseInt(char);
        return !isNaN(num) && isFinite(num);
    }
}
exports.Character = Character;
//# sourceMappingURL=character.js.map