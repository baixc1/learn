// Iterator的简单实现： Generator
var it = {
    *[Symbol.iterator]() {
        yield* [1, 2, 3]
    }
};
//...和for...of均依次输出1，2，3
[...it]
for (let x of it) {
    console.log(x)
}

//遍历结束（报错或break）：走return
var it = {
    [Symbol.iterator]() {
        let i = 0
        return {
            next() {
                if (i > 5) {
                    return { done: 1 }
                }
                return { value: i++ }
            },
            //必须返回对象, next返回done:true后，不走return
            return() {
                console.log('return')
                return {}
            },
        }

    }
};
for (let x of it) {
    if (x++ > 3) break;
    console.log(x)          //走return
}

for (let x of it) {
    if (x++ > 8) break;
    console.log(x)          //不走return
}


//计算生成的数据结构
Array.prototype.entries         //f
Set.prototype.entries           //f
Map.prototype.entries           //f
Object.prototype.keys           //undefined
let map = new Map([[1, 1], [2, 2]]);
[...map.entries()]              //[Array(2), Array(2)]

//for...in
var arr = [1,2,3]
Array.prototype.c = 'c'
arr.d = 'd'
arr.a = 'a'
//依次输出0，1，2，d，a，c
for(let k in arr){
    console.log(k)
}
//1,2,3
for(let v of arr){
    console.log(v)
}