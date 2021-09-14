const PeekTokenIterator = require('../util/peek-token-iterator')
const Expr = require('./expr')
const Scalar = require('./scalar')
const ASTNodeTypes = require('./ASTNodeTypes')

class SimpleParser {

	// expr -> digit + expr | digit
	static parse(it){
		const expr = new Expr(null) // 操作符作为父节点
		const scalar = new Scalar(expr, it) // 这里理解成数字

		if (!it.hasNext()){
			// 当没有下一个时，直接返回数字
			return scalar
		}

		expr.addChild(scalar) // 添加左节点
		expr.label = '+'
		expr.type = ASTNodeTypes.BINARY_EXPR // 二项表达式
		expr.lexeme = it.nextMatch('+')
		expr.addChild(SimpleParser.parse(it)) // 右节点继续递归
		return expr
	}
}

module.exports = SimpleParser
