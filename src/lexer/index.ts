// 词法分析器
const PeekIterator = require('./common/peek-iterator')
const Token = require('../common/token')
const TokenType = require('../common/token-type')
const AlphabetHelper = require('../common/alphabet-helper')
const LexicalException = require('../common/lexical-exception')

class Lexer {
	analyse(source: any){
		const tokens = []
		const it = new PeekIterator(source, '\0')

		while(it.hasNext()){
			let c = it.next()
			
			if (c === '\0') break

			let lookahead = it.peek()
			if (c.trim() === '' || c === '\n' || c == '\r'){
				continue
			}

			// 注释去掉
			if (c === '/'){
				if (lookahead === '/'){
					while(it.hasNext && (c = it.next()) !== '\n') {}
				} else if (lookahead === '*') {
					let valid = false
					while(it.hasNext()){
						const p = it.next()
						if (p === '*' && it.peek() === '/'){
							valid = true
							it.next()
							break
						}
					}

					if (!valid) {
						throw LexicalException.fromChar('comment not matched')
					}
				}

				continue
			}

			if (c === '{' || c === '}' || c === '(' || c === ')') {
				tokens.push(new Token(TokenType.BRACKET, c))
				continue
			}

			if (c === '"' || c === "'") {
				it.putBack()
				tokens.push(Token.makeString(it))
				continue
			}

			if (AlphabetHelper.isLetter(c)){
				it.putBack()
				tokens.push(Token.makeVarOrKeyword(it))
				continue
			}

			if (AlphabetHelper.isNumber(c)){
				it.putBack()
				tokens.push(Token.makeNumber(it))
				continue
			}
			// +0， -9 这种也是数字
			if ((c === '-' || c === '+') && AlphabetHelper.isNumber(lookahead)){
				// 这几种不符合要要求 10-1, --1 3*-5
				// 这个需要结合上一个token是什么类型，只有当上一个token是空的时候才符合当前判断
				const lastToken = tokens[tokens.length - 1] || null
				if (lastToken === null || !lastToken.isValue()){
					it.putBack()
					tokens.push(Token.makeNumber(it))
					continue
				}
			}
			// 先判断数字，再判断操作符，因为只有确定了是不是数字，才好判断操作符
			if (AlphabetHelper.isOperator(c)){
				it.putBack()
				tokens.push(Token.makeOp(it))
				continue
			}

			throw LexicalException.fromChar(c)
		}

		return tokens
	}
}

module.exports = Lexer
