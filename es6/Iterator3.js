var str = 'hello';
[...str]		//["h", "e", "l", "l", "o"]

//覆盖默认Iterator：字符输出为x
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
};

[...str]		//["x", "x", "x", "x", "x"]


//遍历生成器, yield*后面的可遍历结构会自动遍历
var generator = function* () {
    yield 1
    yield* '234'
    yield 5
}
for (let v of generator()) {	//依次输出1-5
    console.log(v)
}


//接受数组作为参数
Array.from([1, 2])       //[1,2]
//重写

Array.prototype[Symbol.iterator] = function* () {
    yield 'hi';
};

Array.from([1, 2])      //["hi"]
new Set([1,2])          //Set(1) {"hi"}
