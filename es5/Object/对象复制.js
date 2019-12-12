//浅复制
var obj = { a: 1, b: 2 }
var obj1 = { ...obj }
var obj2 = Object.assign({}, obj)

//问题：引用类型的值，是地址复制
var obj = { c: [1] }
var obj1 = { ...obj }
var obj2 = Object.assign({}, obj)
obj.c.push(2)

//JSON.stringify()
var obj = { a: [1, 2], b: 2 }
var copyObj = JSON.parse(JSON.stringify(obj))

//有循环引用的情况报错：Converting circular structure to JSON
var obj = {}
obj.my = obj
// JSON.stringify(obj)

//日期对象不可以被序列化
var date = JSON.stringify(new Date())

// 函数不可以被序列化
var fun = JSON.stringify(() => { })

//递归实现深复制
const wm = new WeakMap()
function deepCopy(obj) {
    wm.set(obj, obj)
    //新对象、数组
    var newObj = obj.constructor == Array ? [] : {}
    for (let key in obj) {
        let value = obj[key]
        let arr = [Object, Array]

        //对象、数组
        if (arr.includes(value.constructor)) {
            //解决循环引用问题
            if (wm.get(value)) {
                newObj[key] = wm.get(value)
            } else {
                newObj[key] = deepCopy(value)
            }
        } else {
            newObj[key] = value
        }
    }
    return newObj
}
//循环引用
var obj = { a: 1, b: 2 }
obj.my = obj
var obj1 = deepCopy(obj)

//对象复制
var obj = { a: { b: 1 } }
var obj1 = deepCopy(obj)
obj.a.b = 2

//函数、日期等复制引用
var obj = { date: new Date(), f: () => { } }
var obj1 = deepCopy(obj)
console.log(obj.f === obj1.f)
