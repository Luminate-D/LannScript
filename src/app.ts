import { Lexer } from './parser/lexer';

let tokens = new Lexer("2 + 2").tokenize();
console.log(tokens);