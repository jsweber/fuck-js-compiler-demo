const Enum = require('./enum')

module.exports = {
	KEYWORD: new Enum('KEYWORD', 1),
    VARIABLE: new Enum('VARIABLE', 2),
    OPERATOR: new Enum('OPERATOR', 3),
    BRACKET: new Enum('BRACKET', 4),
	STRING: new Enum('STRING', 5),
	INTEGER: new Enum('INTEGER', 6),
    FLOAT: new Enum('FLOAT', 7),
    BOOLEAN: new Enum('BOOLEAN', 8)
}
