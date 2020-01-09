//Symbol.iterator
var obj = {
    [Symbol.iterator]() {
        return {
            index: 1,
            next() {
                return {
                    value: this.index++,
                    done: false
                }
            }
        }
    }
}
//next调用
var it = obj[Symbol.iterator]()
it.next()                   //{value: 1, done: false}
it.next()                   //{value: 2, done: false}

//for...of循环: 自动调用obj的Symbol.iterator方法，并调用next遍历
for (var i of obj) {
    console.log(i)      //输出1-9
    if (it.next().value > 10) {
        break
    }
}

//Array: 输出value，
var arr = [1, 2, 3]
for (let v of arr) {
    console.log(v)
}
arr[Symbol.iterator] === Array.prototype[Symbol.iterator]       //true


//Map： 输出key,value
var m = new Map([['a', 1], ['b', 2]])
for (let [v, k] of m) {
    console.log(k, v)
}

//Set: 输出value
var s = new Set([1, 2, 3, 1, 2, 3])
for (let v of s) {
    console.log(v)
}

//String：输出每个字符串
var str = '1231'
for (let v of str) {
    console.log(v)
}

//Arguments: 遍历参数
fun(1, 2, 3)
function fun() {
    for (let v of arguments) {
        console.log(v)
    }
}

//NodeList： 输出p元素
var eles = document.getElementsByTagName('p')
for (let v of eles) {
    console.log(v)
}


//覆盖默认Iterator：字符输出为x
var str = '123'
String.prototype[Symbol.iterator] = function () {
    let me = this
    let i = 0
    return {
        /**
         * 1. next必须返回对象格式
         * 2. 返回done为true时，遍历结束，for...of循环退出
         */
        next() {
            if (i++ < me.length) {  
                return {
                    value: 'x'
                }
            } else {                
                return {
                    done: 1
                }
            }
        }
    }
}
for (let v of str) {
    console.log(v)
}