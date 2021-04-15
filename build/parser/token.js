"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const tokentype_1 = require("./tokentype");
class Token {
    constructor(type, text) {
        this.type = type !== null && type !== void 0 ? type : tokentype_1.TokenType.EOF;
        this.text = text !== null && text !== void 0 ? text : '';
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
    }
}
exports.Token = Token;
//# sourceMappingURL=token.js.map