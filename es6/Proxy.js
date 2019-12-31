/**
 * 常见参数
 * target: 目标对象（函数）
 * property: 被设置的属性名
 * value: 被设置的新值
 * receiver: 最初被调用的对象(通常是proxy本身)
 * thisArg: 被调用时的上下文对象
 * argumentsList: 被调用时的参数数组
 */

/**
 * get，重载对象读取属性运算
 */
var obj = new Proxy({}, {
    get(target, property, receiver) {
        return 'run get'
    }
})

obj.a           //run get

/**
 * set，拦截赋值操作
 */
//四种赋值： [] . Object.create(proxy) Reflect.set
var obj = {}
var p = new Proxy(obj, {
    set() {
        // console.log('run set')
        return Reflect.set(...arguments)        //赋值
    }
})
Reflect.set(p, 'a', 1)      //run set
p.a = 2                     //run set
p['a'] = 3                  //run set
Object.create(p).a = 1      //run set
//set内Reflect操作
var obj = {}
var p = new Proxy(obj, {
    set(target, property, value, receiver) {
        return Reflect.set(obj, property, value)        //赋值
        //死循环，RangeError: Maximum call stack size exceeded
        // return Reflect.set(p, property, value)
    }
})

p.a = 1        //1
p               //{ a: 1 }
obj             //{ a: 1 }



/**
 * apply，拦截函数的调用
 */
//参数
var add = (a, b) => a + b
var p = new Proxy(add, {
    apply(target, thisArg, argumentsList) {
        target === add          //true
        thisArg === p           //true
        argumentsList           //[1,2]
    }
})
p.call(p, 1, 2)
//三种调用：proxy(),Function.prototype.apply/call，Reflect.apply
var p = new Proxy((a, b) => a + 10 * b, {
    apply(target, thisArg, argumentsList) {
        return target(...argumentsList)
    }
})

p(1, 2)                                 //21
Reflect.apply(p, null, [1, 2])          //21
p.call(null, 1, 2)                      //21
p.apply(null, [1, 2])                   //21


/**
 * has，针对 in 操作符的代理方法
 */
//拦截：属性查询，继承属性查询，with检查，Reflect.has
var p = new Proxy({ a: 1, _a: 2 }, {
    has(target, prop) {
        if (prop[0] == '_') {
            return false
        }
        return Reflect.has(target, prop);
    }
});

'a' in p                    //true
'_a' in p                   //false
'a' in Object.create(p)     //true
'_a' in Object.create(p)    //false
Reflect.has(p, 'a')          //true
Reflect.has(p, '_a')         //false


/**
 * construct，拦截new 操作符
 * 目标对象具有[[Construct]]内部方法
 * 返回值：必须对象
 */
//拦截操作：new proxy(...args)、Reflect.construct()
var p = new Proxy(function () { }, {
    construct: function (target, argumentsList, newTarget) {
        // console.log('run construct')
        return { a: 1 }
    }
});
new p()                     //run construct
Reflect.construct(p, [])    //run construct

//参数
var p = new Proxy(function () { }, {
    construct: function (target, argumentsList, newTarget) {
        argumentsList                   //[1]
        // console.log(newTarget == p)     //true
        return {}
    }
});

new p(1)

/**
 * deleteProperty，拦截 delete 操作
 */
//操作：delete 或 Reflect.deleteProperty
var p = new Proxy({ a: 1 }, {
    deleteProperty: function (target, prop) {
        // console.log('run deleteProperty')
        return true;
    }
});

delete p.a;                         //true
p                                   //run deleteProperty    {a: 1}
Reflect.deleteProperty(p, 'a')      //true
p                                   //run deleteProperty    {a: 1}

//搭配Reflect.deleteProperty
var p = new Proxy({ a: 1 }, {
    deleteProperty: function (target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
});

delete p.a;         //true
p                   //{}



/**
 * defineProperty，拦截对对象的 Object.defineProperty() 操作
 */
var p = new Proxy({}, {
    defineProperty(target, prop, descriptor) {
        return Reflect.defineProperty(target, prop, descriptor);
    }
});

Object.defineProperty(p, 'name', {          //{ value: 'proxy' }
    value: 'proxy',
    type: 'custom'          //忽略
});
p                           //{name: "proxy"}



//返回一个可取消的 Proxy 实例
var { proxy: p, revoke } = Proxy.revocable({}, {})
p.a = 1
p.a                 //1
// revoke()
p.a             //TypeError




//数据响应式
var watch = (obj, event1, event2) => {
    return new Proxy(obj, {
        //手机依赖
        get(target, property) {
            event1(target, property)
            return Reflect.get(...arguments)
        },
        //更新
        set(target, property, value) {
            event2(target, property, value)
            return Reflect.set(...arguments)
        }
    })
}

var p = watch({ a: 1 },
    (target, property) => {
        console.log(`get: ${property}=${target[property]}`)
    },
    (target, property, value) => {
        console.log(`set: ${property}，${target[property]}->${value}`)
    })

p.a = 2
p.a

//https://www.jianshu.com/p/ce16fc34fc33


//数据校验
function validator(target, validator) {
    return new Proxy(target, {
        set(target, key, value, receiver) {
            if (target.hasOwnProperty(key)) {
                if (validator[key](value)) {
                    return Reflect.set(target, key, value, receiver)
                } else {
                    throw Error(`不能设置${key}到${value}`)
                }
            } else {
                throw Error(`${key}不存在`)
            }
        }
    })
}

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
        return validator(this, {
            name(val) {
                return typeof val === 'string'
            },
            age(val) {
                return typeof val === 'number' && val > 18
            }
        })
    }
}

var person = new Person('knyel', 30)
person
person.name = 'lk'
// person.age = 12     //报错  

//不能直接代理一些需要 this 的对象
//原生对象的内部属性
var target = new Date('2020-01-01')
var handler = {
    get(target, prop) {
        if (prop == 'getDate') {
            return target.getDate.bind(target)
        } else {
            return Reflect.get(target, prop)
        }
    }
}

var proxy = new Proxy(target, handler)
proxy.getDate()                 //1
// proxy.getMonth()                //报错

