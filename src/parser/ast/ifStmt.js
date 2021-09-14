const Stmt = require('./stmt')
const Types = require('./ASTNodeTypes')

class IfStmt extends Stmt {
	constructor(parent){
		super(parent, Types.IF_STMT, 'if-stmt')
	}
}

module.exports = IfStmt
