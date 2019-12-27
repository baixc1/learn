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
        console.log(descriptor);
        return Reflect.defineProperty(target, prop, descriptor);
    }
});

Object.defineProperty(p, 'name', {          //{ value: 'proxy' }
    value: 'proxy',
    type: 'custom'          //忽略
});
p                           //{name: "proxy"}