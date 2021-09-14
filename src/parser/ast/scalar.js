const Factor = require('./factor')
const Types = require('./ASTNodeTypes')

class Scalar extends Factor {
	constructor(parent, it){
		// super(parent, Types.SCALAR, 'scalar-factor')
		super(parent, it)
	}
}

module.exports = Scalar
