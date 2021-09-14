const ASTNode = require('./ASTNode')
const TokenType = require('../../token-type')
const ASTNodeTypes = require('./ASTNodeTypes')

class Factor extends ASTNode {
	constructor(parent, it){
		super(parent)

		const token = it.next()

		if (token.getType() === TokenType.VARIABLE){
			this.type = ASTNodeTypes.VARIABLE
		} else {
			this.type = ASTNodeTypes.SCALAR
		}

		this.label = token.getValue()
		this.lexeme = token

	}
}

module.exports = Factor
