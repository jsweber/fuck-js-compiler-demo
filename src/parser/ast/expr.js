const ASTNode = require('./ASTNode')
const Types = require('./ASTNodeTypes')
const PriorityTable = require('../util/priority-table')

class Expr extends ASTNode {
	constructor(parent){
		super(parent)

	}

	static fromToken(parent, type, token){
		const expr = new Expr(parent)

		expr.label = token.getValue()
		expr.type = type
		expr.lexeme = token
	}
	/**
	 * left: E(k) -> E(k)op(k)E(k+1) | E(k+1)
	 * right: 
	 * 		E(k) -> E(k+1)E_(k)
	 * 			combine
	 * 		 	var e = new Expr(); e.left = E(k+1); e.right = E_(k).children[0]
	 * 		E_(k) -> op(k)E(k+1)E_(k)| e
	 * 			race
	 * 终极形态：
	 * 		E(t) -> FE(t) | UE(t)    F是factor；U是一元表达式 (E) | ++E | --E
	 * 
	 * @param {*} parent 
	 * @param {*} it 
	 */
	static parseExpr(parent, it){
		return Expr.E(parent, it, 0)
	}

	static E(parent, it, k){
		if (k < PriorityTable.length - 1){

		} else {
			
		}
	}

	static E_(parent, it, k){

	}

	static U(parent, it){

	}

	static F(parent, it){

	}

	static combine(funcA, funcB, it, parent){
		if (!it.hasNext()) return null

		const a = funcA()
		if ( a === null ) return it.hasNext() ? funcB() : null // 每调用一次func都要判断一下hasNext,引func调用一次会消耗一个token

		const b = it.hasNext() ? funcB() : null
		if ( b === null ) return a 

		const expr = Expr.fromToken(parent, Types.BINARY_EXPR, b.lexeme) // expr是表达式，因为这是右递归，所以右边是下一个要处理的表达式
		expr.addChild(a)
		expr.addChild(b.getChild(0))
		return expr
	}

	static race(funcA, funcB, it){
		if (!it.hasNext()) return null

		const a = funcA()

		if (a === null) return funcB()
		return a
	}
}

module.exports = Expr
