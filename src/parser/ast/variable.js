const Factor = require('./factor')
const Types = require('./ASTNodeTypes')

class Variable extends Factor {
	constructor(parent, it){
		super(parent, it)

	}
}

module.exports = Variable
