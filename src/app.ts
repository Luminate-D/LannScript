import { Lexer } from './parser/lexer';
import { Parser } from './parser/parser';
import * as fs from 'promise-fs';

(async () => {
    let contents = await fs.readFile('test/script.lsc', { encoding: 'utf8' });
    let tokens = new Lexer(contents).tokenize();
    let exprs = new Parser(tokens).parse();

    console.log(exprs);
    exprs.forEach(expr => {
        console.log(expr.eval());
    });
})();