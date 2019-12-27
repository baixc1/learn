//函数调用合理化
//Object.defineProperty定义相同属性时，会抛出一个错误
var obj = {}
Object.defineProperty(obj, 'name', { value: 'a', writable: false })
//Cannot redefine property: name
// Object.defineProperty(obj, 'name', { value: 'b' })
var res = Reflect.defineProperty(obj, 'name', { value: 1 })     //false


//命令式操作->函数
var obj = { a: 1 }
var res1 = 'a' in obj                   //true
var res2 = Reflect.has(obj, 'a')        //true

//与Proxy对应关系
var obj = { a: 1 }
var p = new Proxy({}, {
    get(target, name, value, receiver) {
        //新功能，类似装饰器
        console.log(Date.now())
        //原有功能
        return Reflect.get(target, name, value, receiver)
    }
})
obj.a           //时间戳

//操作易读
var res = Function.prototype.apply.call(Math.pow, null, [2, 6])     //64
var res1 = Reflect.apply(Math.pow, null, [2, 6])                    //64


/**
 * 静态方法
 */
/**
 * 1. Reflect.get，对象按key查找
 * 2. 属性有getter（读取函数），则调用
 * 3. 第三个参数，替换当前this
 */

var res = Reflect.get(Array, 'name')            //Array

var obj = {
    get isObj() {
        return this === obj
    },
    get isObject() {
        return this == Object
    }
}
var res = Reflect.get(obj, 'isObj')             //true
var r1 = Reflect.get(obj, 'isObj', Object)      //false
var r2 = Reflect.get(obj, 'isObject', Object)   //true



/**
 * 语法： Reflect.set(target, propertyKey, value[, receiver])
 * 作用： 对象设置属性
 * 参数： 
 *      target: 目标对象
 *      receiver: 如果遇到 setter，this 将提供给目标调用。
 * 返回值：Boolean，是否设置成功
 * 异常：  抛出一个 TypeError，如果目标不是 Object
 * 描述： 函数式的property
 */

var obj = {
    foo: 1,
    //属性赋值函数，有receiver, 则this==receiver
    set bar(v) {
        this.foo = v
    },
}

var obj2 = { foo: 'last' }

Reflect.set(obj, 'bar', 4)
obj.foo                             //4
Reflect.set(obj, 'bar', 66, obj2)
obj2.foo                            //66


//Reflect.set触发Proxy.defineProperty拦截（传入receiver）
//receiver指向Proxy实例
var p = {
    a: 'a'
};

var handler = {
    set(target, key, value, receiver) {
        console.log(target === p);              //true
        console.log(receiver === obj);          //true
        Reflect.set(target, key, value, receiver)
    },
    defineProperty(target, key, attribute) {
        console.log(target === p);              //true
        Reflect.defineProperty(target, key, attribute);
    }
};

var obj = new Proxy(p, handler);
// obj.a = 'A';

/**
 * 语法：  Reflect.has(target, propertyKey)
 * 返回值：Boolean
 * 异常：  抛出一个 TypeError，如果目标不是 Object
 */

Reflect.has({ x: 0 }, 'x')              //true
Reflect.has({ x: 0 }, 'toString')       //true
'x' in { x: 0 }                         //true


//Reflect.deleteProperty：类似delete obj.property

//Reflect.construct: 等同于new target(...args)
function Greeting(name) {
    this.name = name
}

var instance = Reflect.construct(Greeting, ['jack'])


//Reflect.getPrototypeOf(obj): 读取对象的__proto__属性
//对应Object.getPrototypeOf(obj)
var obj = new Object()

Object.getPrototypeOf(obj) == Object.prototype      //true
Reflect.getPrototypeOf(obj) == Object.prototype     //true

//Reflect.setPrototypeOf(obj, newProto)
//设置目标对象的原型, 对应Object.setPrototypeOf(obj, newProto)
var obj = {}

Object.setPrototypeOf(obj, Array.prototype)
obj.length          //0
Reflect.setPrototypeOf(obj, Array.prototype)
obj.length          //0


/**
 * 1. Reflect.apply(func, thisArg, args)
 * 2. 等同于Function.prototype.apply.call(func, thisArg, args)
 * 3. 用于绑定this对象后执行给定函数
 * 4. thisArg - 如果没有用到this，随便传个值
 * 5. args - func调用时传入的实参列表, 必传，类数组的对象
 */

var args = [1, 2, 3, 4]

Math.min.apply(null, args)                          //1
Object.prototype.toString.call(1)                   //"[object Number]"

Reflect.apply(Math.max, null, args)                 //4
Reflect.apply(Object.prototype.toString, 1, {})     //"[object Number]"

//类似
Reflect.apply(RegExp.prototype.exec, /ab/, ["confabulation"])
RegExp.prototype.exec.apply(/ab/, ['confabulation']);
/ab/.exec("confabulation")

//类似
Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111])
String.fromCharCode.apply(null, [104, 101, 108, 108, 111])
String.fromCharCode(104, 101, 108, 108, 111)


//Reflect.defineProperty: 等同于 Object.defineProperty()
//返回Boolean

//Reflect.isExtensible
//对象是否可扩展(添加新属性)

//Reflect.preventExtensions: 阻止对象添加属性

/**
 * 1. Reflect.ownKeys
 * 2. 返回对象的所有属性, Array
 * 3. 等同Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
 */
var obj = {
    a: 1,
    [Symbol()]: 2
}
Object.getOwnPropertyNames(obj)     //["a"]
Object.getOwnPropertySymbols(obj)   //[Symbol()]
Reflect.ownKeys(obj)                //["a", Symbol()]


/**
 * Proxy实现观察者模式
 * 1. Proxy拦截赋值操作，触发观察者函数
 * 2. 定义观察者函数们的列表
 */

var list = []

var observe = f => list.push(f)
var observable = obj => new Proxy(obj, { set })

function set(target, key, value, receiver) {
    var res = Reflect.set(target, key, value, receiver)
    list.forEach(fn => fn(value))
    return res
}

var obj = { a: 1 }
//观察对象
var proxy = observable(obj)
//观察者函数
observe(res => console.log(res))
proxy.a = 2                             //2
proxy.a = 3                             //3