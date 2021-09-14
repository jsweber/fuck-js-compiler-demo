class ASTNode {
	constructor(parent, type=null, label=null){
		this.children = []
		this.parent = parent

		this.lexeme = null // 关键信息
		this.type = type
		this.label = label
	}

	getChild(i){
		return this.children[i]
	}

	addChild(node) {
		return this.children.push(node)
	}

	getLexeme(){
		return this.lexeme
	}

	getChildren(){
		return this.children
	}

	static print(node, index=0) {
		console.log(`${''.padStart(index * 2, ' ')}${node.label}`)
		node.children.forEach(c => ASTNode.print(c, index + 1))
	}

}

module.exports = ASTNode
