const LinkedList = require('linkedlist')

const CAHCE_SIZE = 10

class PeekIterator {
	constructor(it, endToken=null){
		this.it = it

		this.stackedPutBacks = new LinkedList()
		this.queueCache = new LinkedList()
		this._endToken = endToken
	}
	//public 获取值后，再调用不会获取下一个值
	peek(){
		if (this.stackedPutBacks.length > 0) return this.stackedPutBacks.tail

		let val = this.next()
		this.putBack()
		return val
	}
	// public 指向上一个值，不返回值
	putBack(){
		if (this.queueCache.length > 0){
			this.stackedPutBacks.push(this.queueCache.pop())
		}
	}
	// public
	hasNext(){
		return this._endToken || !!this.peek()
	}
	//public 取值后，指向下一个值
	next(){
		let val = null

		if (this.stackedPutBacks.length > 0){
			val = this.stackedPutBacks.pop()
			// this.queueCache.push(val)
			// return val  去掉，下面同样的逻辑
		} else {
			val = this.it.next().value
			if (val === undefined) {
				val = this._endToken
				this._endToken = null
			}
		}

		while (this.queueCache.length > CAHCE_SIZE - 1){
			this.queueCache.shift()
		}

		this.queueCache.push(val)
		return val
	}
}

module.exports = PeekIterator
