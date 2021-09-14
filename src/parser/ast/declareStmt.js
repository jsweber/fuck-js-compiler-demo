const Stmt = require('./stmt')
const Types = require('./ASTNodeTypes')

class DeclareStmt extends Stmt {
	constructor(parent){
		super(parent, Types.DECLARE_STMT, 'declare-stmt')
	}
}

module.exports = DeclareStmt
