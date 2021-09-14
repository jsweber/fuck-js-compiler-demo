const Stmt = require('./stmt')
const Types = require('./ASTNodeTypes')

class AssignStmt extends Stmt {
	constructor(parent){
		super(parent, Types.ASSIGN_STMT, 'assign-stmt')
	}
}

module.exports = AssignStmt