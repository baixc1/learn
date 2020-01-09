//遍历器模拟
var it = maker()

it.next()       //{value: 0, done: false}
it.next()       //{value: 1, done: false}
it.next()       //{value: 2, done: false}

function maker() {
    var index = 0
    return {
        next() {
            return { value: index++, done: false }
        }
    }
}

//自定义遍历器：执行Symbol.iterator方法,返回遍历器对象,该对象具有next方法
class RangeIterator {
    constructor(start, stop) {
        this.value = start
        this.stop = stop
    }

    [Symbol.iterator]() { return this }

    next() {
        let { value, stop } = this
        if (value < stop) {
            this.value++
            return { value }
        } else {
            return { done: true }
        }
    }
}

function range(start, end) {
    return new RangeIterator(start, end)
}
//单个输出
var it = range(1, 3)[Symbol.iterator]()
it.next()           //{value: 1}
it.next()           //{value: 2}
it.next()           //{done: true}

//for...of遍历(默认调用Symbol.iterator方法，后调用next循环)
for (let v of range(0, 5)) {
    console.log(v)          //依次输出0-4
}


//修改数组for...of遍历，输出2倍值
var arr = [1, 2, 3]

Array.prototype[Symbol.iterator] = function () {
    let me = this
    let i = 0
    return {
        next() {
            if (i++ < me.length) {
                return { value: me[i - 1] * 2 }
            } else {
                return { done: true }
            }
        }
    }
}
var it = arr[Symbol.iterator]()
for (let v of arr) {            //谷歌浏览器：输出2，4，6
    console.log(v)
}