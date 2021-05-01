import 'source-map-support/register';

import { Lexer } from './parser/lexer';
import { Parser } from './parser/parser';
import * as fs from 'promise-fs';
import { Stack } from './lib/stack';
import { TokenType } from './parser/tokentype';

(async () => {
    let path = process.argv.slice(2).join(' ');
    path = path || 'D:/Repositories/LannScript/test/script.lsc';

    console.log('='.repeat(30));
    console.log('- Running script');
    console.log('- ' + path);
    console.log('='.repeat(30));
    console.log();

    let contents = await fs.readFile(path, { encoding: 'utf8' });
    let tokens = new Lexer(contents).tokenize();
    let statement = new Parser(tokens, path).parse();

    try {
        await statement.execute();
    } catch (e) {
        console.log(e.toString());
        Stack.get().forEach(elem => {
            console.log(`    ${elem.toString()}`);
        });
    }
})();