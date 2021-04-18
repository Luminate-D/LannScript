import 'source-map-support/register';

import { Lexer } from './parser/lexer';
import { Parser } from './parser/parser';
import * as fs from 'promise-fs';

(async () => {
    let path = process.argv.slice(2).join(' ');

    console.log('='.repeat(30));
    console.log('- Running script');
    console.log('- ' + path);
    console.log('='.repeat(30));
    console.log();

    let contents = await fs.readFile(path || 'D:/Repositories/LannScript/test/script.lsc', { encoding: 'utf8' });
    let tokens = new Lexer(contents).tokenize();
    let statement = new Parser(tokens).parse();

    console.log(statement);
    console.log('-'.repeat(30));

    await statement.execute();
})();