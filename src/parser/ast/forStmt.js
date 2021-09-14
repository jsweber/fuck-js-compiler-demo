const Stmt = require('./stmt')
const Types = require('./ASTNodeTypes')

class ForStmt extends Stmt {
	constructor(parent){
		super(parent, Types.FOR_STMT, 'for-stmt')
	}
}

module.exports = ForStmt
