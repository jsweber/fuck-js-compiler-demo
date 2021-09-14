const Stmt = require('./stmt')
const Types = require('./ASTNodeTypes')

class Block extends Stmt {
	constructor(parent){
		super(parent, Types.BLOCK, 'block')
	}
}

module.exports = Block
