"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./parser/lexer");
let tokens = new lexer_1.Lexer("2 + 2").tokenize();
console.log(tokens);
//# sourceMappingURL=app.js.map