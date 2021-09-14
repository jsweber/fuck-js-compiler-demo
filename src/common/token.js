const TokenType = require('./token-type')
const AlphabetHelper = require('./alphabet-helper')
const LexicalException = require('./lexical-exception')

const Keywords = new Set([
	'var',
	'if',
	'else',
	'for',
	'while',
	'break',
	'func',
	'return'
])

class Token {
	constructor(type, value){
		this._type = type
		this._value = value
	}

	getType(){
		return this._type
	}

	getValue(){
		return this._value
	}

	isVariable(){
		return this._type === TokenType.VARIABLE
	}

	isScalar(){
		return this._type === TokenType.STRING
			|| this._type === TokenType.BOOLEAN
			|| this._type === TokenType.FLOAT
			|| this._type === TokenType.INTEGER
	}

	isValue() {
		return this.isScalar() || this.isVariable()
	}

	toString(){
		return `type ${this._type}, value ${this._value}`
	}

	static makeVarOrKeyword(it){
		let s = ''

		while(it.hasNext()) {
			const c = it.peek()
			if (AlphabetHelper.isLiteral(c)) {
				s += c
			} else {
				break
			}

			it.next()
		}

		if (Keywords.has(s)){
			return new Token(TokenType.KEYWORD, s)
		}

		if (s === 'true' || s === 'false') return new Token(TokenType.BOOLEAN, s)

		return new Token(TokenType.VARIABLE, s)
	}

	static makeString(it){
		let s = ''

		let state = 0

		while(it.hasNext()) {
			const c = it.next()
			switch(state){
				case 0:
					if (c === '"'){
						state = 1
					} else {
						// 已经在调用makeString的地方预先检查过了，不是单引号就是双引我们号
						state = 2
					}
					s += c
					break

				case 1:
					if (c === '"'){
						return new Token(TokenType.STRING, s + c)
					} else {
						s += c
					}
					break

				case 2:
					if (c === "'"){
						return new Token(TokenType.STRING, s + c)
					} else {
						s += c
					}
					break
			}
		}
		throw new LexicalException('Unexpected error')
	}

	static makeOp(it){
		let state = 0

		while(it.hasNext()){
			const c = it.next()

			switch(state){
				case 0:
					if (c === '+'){
						state = 1
					} else if (c === '-'){
						state = 2
					} else if (c === '*'){
						state = 3
					} else if (c === '/'){
						state = 4
					} else if (c === '='){
						state = 5
					} else if (c === ','){
						return new Token(TokenType.OPERATOR, ',')
					} else if (c === ';'){
						return new Token(TokenType.OPERATOR, ';')
					}
					break
				case 1:
					if (c === '='){
						return new Token(TokenType.OPERATOR, '+=')
					} else if (c === '+'){
						return new Token(TokenType.OPERATOR, '++')
					} else {
						it.putBack()
						return new Token(TokenType.OPERATOR, '+')
					}

				case 2: 
					if (c === '='){
						return new Token(TokenType.OPERATOR, '-=')
					} else if (c === '-'){
						return new Token(TokenType.OPERATOR, '--')
					} else {
						it.putBack()
						return new Token(TokenType.OPERATOR, '-')
					}

				case 3: 
					if (c === '='){
						return new Token(TokenType.OPERATOR, '*=')
					} else if (c === '*'){
						return new Token(TokenType.OPERATOR, '**')
					} else {
						it.putBack()
						return new Token(TokenType.OPERATOR, '*')
					}
					
				case 4: 
					if (c === '='){
						return new Token(TokenType.OPERATOR, '/=')
					} else if (c === '/'){
						return new Token(TokenType.OPERATOR, '//')
					} else {
						it.putBack()
						return new Token(TokenType.OPERATOR, '/')
					}

				case 5: 
					if (c === '='){
						return new Token(TokenType.OPERATOR, '==')
					} else {
						it.putBack()
						return new Token(TokenType.OPERATOR, '=')
					}
			}

		}

		throw new LexicalException('Unexpected error')

	}

	static makeNumber(it){
		let state = 0
		let s = ''

		while(it.hasNext()){
			const c = it.peek()
			switch(state){
				case 0:
					if (c === '0'){
						state = 1
					} else if (AlphabetHelper.isNumber(c)){
						state = 2
					} else if (c === '+' || c === '-'){
						state = 3
					} else if (c === '.'){
						state = 5
					}

					break
				case 1:
					if (c === '0'){
						state = 1
					} else if (AlphabetHelper.isNumber(c)){
						state = 2
					} else if (c === '.'){
						state = 4
					} else {
						return new Token(TokenType.INTEGER, s)
					}

					break
				case 2:
					if (AlphabetHelper.isNumber(c)){
						state = 2
					} else if (c === '.'){
						state = 4
					} else {
						return new Token(TokenType.INTEGER, s)
					}

					break
				case 3:
					if (AlphabetHelper.isNumber(c)){
						state = 2
					} else if (c === '.'){
						state = 5
					} else {
						throw LexicalException.fromChar(c)
					}

					break
				case 4:
					if (AlphabetHelper.isNumber(c)){
						state = 4
					} else if (c === '.'){
						throw LexicalException.fromChar(c)
					} else {
						return new Token(TokenType.FLOAT, s)
					}

					break
				case 5:
					if (AlphabetHelper.isNumber(c)){
						state = 4
					}else {
						throw LexicalException.fromChar(c)
					}

					break
				// case 5:
					// 如果到5，其实剩下的情况和4是一样的，上面是精简的写法，下面是考虑的思路
					// 那为什么只剩4和5其中一个呢，只要是小数有两种可能： 0.123 和 .123
					// 第一张前置字符必行是0，然后是. 才能是小数，后者当判断是.时可以直接进入

					// 注意！！！，这种写法是错误的，因为无法防止只有一个 . 的情况，当出现这种情况下面的写法会判断成小数
					// 所以进入5后，必须进入4，这样才算是小数，其他情况都是错误的
					// if (AlphabetHelper.isNumber(c)){
					// 	state = 5
					// } else if (c === '.'){
					// 	throw LexicalException.fromChar(c)
					// } else {
					// 	return new Token(TokenType.FLOAT, s)
					// }

					// break
			}
			s += c
			it.next()
		}

		throw new LexicalException('Unexpected error')
	}
}

module.exports = Token
