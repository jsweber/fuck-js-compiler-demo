const PeekIterator = require('../../common/peek-iterator')
const ParserException = require('./parser-exception')

class PeekTokenIterator extends PeekIterator{
	constructor(it) {
		super(it)
	}

	nextMatch(value){
		const token = this.next()
		if (token.getValue() !== value){
			throw ParserException.fromToken(token)
		}

		return token
	}

	nextMatch1(type){
		const token = this.next()
		if (token.getType() !== type){
			throw ParserException.fromToken(token)
		}

		return token
	}
}

module.exports = PeekTokenIterator
