class ParserException extends Error {
	constructor(msg){
		super(msg)
	}

	static fromToken(token){
		return new ParserException(`Syntax error: unexpected token ${token.getValue()}`)
	}
}

module.exports = ParserException
