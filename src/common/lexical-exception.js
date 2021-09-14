class LexicalException extends Error {
	constructor(msg){
		super(msg)
	}

	static fromChar(c){
		return new LexicalException(`unexpected error ${c.trim() === '' ? '空' : c}`)
	}
}

module.exports = LexicalException
