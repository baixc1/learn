/**
 * 1. 原始数据，不可new(无构造函数)
 * 2. 数据类型：Number 、 String 、 Boolean 、 Objec t、 null 和 undefined
 */
var a = Symbol()

//唯一性
console.log(Symbol() === Symbol())


/**
 * 1. Symbol.prototype.description
 * 2. 参数即描述
 * 3. es2019，Chrome最新浏览器可测试
 */
var a = Symbol('miaoshu')
console.log(a.description)

/**
 * 1. Symbol 值不能与其他类型的值进行运算
 * 2. 可以显式转为字符串/布尔值(true)
 */
try { Symbol() + 1 } catch (e) { console.log(e) }
console.log(String(Symbol()))
console.log(Boolean(Symbol()))


//动态唯一属性，解决命名冲突，mixin 模式
var a = Symbol()
var obj = { [a]: 1 }

//对象动态属性, []或Object.defineProperty，区分字符串key
var a = 'key'
var obj = { [a]: 22 }
obj[a] = 11
Object.defineProperty(obj, a, { value: 33 });

console.log(obj)

/*
    1. Symbol不会被常规方法遍历得到（for循环，Object.keys()、
Object.getOwnPropertyNames()、JSON.stringify()）
    2. 可用来做非私有、内部成员
    3. 获取方法：Object.getOwnPropertySymbols，
    Reflect.ownKeys()
*/
var a = Symbol()
var b = Symbol()
var obj = { [a]: -1, [b]: 0, c: 1 }

console.log(JSON.stringify(obj))    //无法克隆Symbol属性
for (let key in obj) {              //不遍历Symbol属性
    console.log(key)
}
console.log(Object.getOwnPropertyNames(obj))        //无法获取Symbol属性
console.log(Reflect.ownKeys(obj))       //获取所有属性key
console.log(Object.getOwnPropertySymbols(obj))      //获取Symbol属性

/**
 * 1. 同一业务，不同类型
 * 2. 无需关心类型的值
 * 3. 魔术字符串: 与代码形成强耦合的字符串或数值
 */
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()
//业务逻辑...


/**
 * 1. 重复使用Symbol值
 * 2. 无则新建，有则返回
 * 3. 登记机制，似单例模式
 * 4. 全局登记特性（用在不同的 iframe 或 service worker中）
 */
console.log(Symbol.for(), Symbol())
console.log(Symbol.for() === Symbol.for())
//匿名函数自调，内部与外部的Symbol相同
console.log(
    (
        () => Symbol.for()
    )() === Symbol.for()
)

/**
 * 1. 检测是否登记
 * 2. 参数必须是Symbol类型
 * 3. for定义才有值
 */
var a = Symbol('a')
var b = Symbol.for('b')
console.log(Symbol.keyFor(a), Symbol.keyFor(b))