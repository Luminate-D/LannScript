import 'source-map-support';

import { Lexer } from './parser/lexer';
import { Parser } from './parser/parser';
import * as fs from 'promise-fs';

(async () => {
    console.log('='.repeat(30));
    console.log('- Running script \'script.lsc\'');
    console.log('='.repeat(30));
    console.log();

    let contents = await fs.readFile('test/script.lsc', { encoding: 'utf8' });
    let tokens = new Lexer(contents).tokenize();
    let statements = new Parser(tokens).parse();

    //console.log(statements);
    statements.forEach(statement => {
        statement.execute();
    });

    // console.log('-'.repeat(30));
    // console.log();

    // Variables.entries().forEach(entry => {
    //     console.log(entry.key + ' | ' + entry.value);
    // });
})();