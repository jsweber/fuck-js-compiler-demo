const Stmt = require('./stmt')
const Types = require('./ASTNodeTypes')

class FunctionDeclareStmt extends Stmt {
	constructor(parent){
		super(parent, Types.FUNCTION_DECLARE_STMT, 'function-declare-stmt')
	}
}

module.exports = FunctionDeclareStmt
