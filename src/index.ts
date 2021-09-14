import { lexer } from './lexer';
const chalk = require('chalk');

const c = new chalk.Instance({
    enabled: true
})

const main = (): void => {
    console.log(c.red('main'));
    lexer();
}

main();
