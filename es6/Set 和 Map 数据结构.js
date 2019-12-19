// Set成员唯一，
var set = new Set([1, 2, 3, 1, 2])  //Set { 1, 2, 3 }

//Map键的范围不限于字符串
var obj1 = {}
var obj2 = {}
var obj = { [obj1]: 1, [obj2]: 2 }      //{ '[object Object]': 2 }，使用'[object Object]'作key

var map = new Map()
map.set(obj1, 1)
map.set(obj2, 2)                //Map { {} => 1, {} => 2 }

//基本操作，增删查..
//Set
var s = new Set().add(1).add(2).add(2)   // Set { 1, 2 }
s.size              //2
s.delete(1)         //true
s.size              //1
s.has(2)            //true
s.clear()           //undefined, s: Set {}

//Map
var o1 = {}
var o2 = {}
var m = new Map().set(o1, 1).set(o2, 2).set(1, 'a')     //Map { {} => 1, {} => 2, 1 => 'a' }
m.size                      //3
m.delete(o1)                //true, m: Map { {} => 2, 1 => 'a' }
m.has(o1)                   //false
m.get(o2)                   //2
m.set(o2, 3)                //Map { {} => 3, 1 => 'a' }，改
m.clear()           //undefined, m: Map {}


//原型方法（遍历相关）
//keys，values，entries (返回遍历器对象，for...of遍历)
var a = new Set([1, 2, 3])
a.keys()           //[Set Iterator] { 1, 2, 3 }
Set.prototype[Symbol.iterator] === Set.prototype.values     //true
Set.prototype.keys === Set.prototype.values                 //true
for (let v of a) {      //1  2  3，遍历器调用values
    // console.log(v)
}


//参数
//Set参数可遍历
var a = new Set('123451243')    //Set { '1', '2', '3', '4', '5' }
    ;[...a].join('')                //"12345", 字符串去重

//Map参数：可遍历，且每项为双元素
var m = new Map([[1, 2]])       //Map { 1 => 2 }，和下行类似
var m = new Map().set(1, 2)     //Map { 1 => 2 }


//Map：同一键引用相同（地址）
var o = {}
var m = new Map().set({}, 1).get({})    //undefined
var m = new Map().set(o, 1).get(o)      //1


// Set、数组互相转化，去重
var s = new Set('1231')
var a = [...s]          //[ '1', '2', '3' ]
s = new Set(a)          //Set { '1', '2', '3' }

/**
 * 1. Set取交集、并集、差集
 * 2. 扩展运算符（...）内部使用for...of循环
 * 3. Set转为Array，可使用Array方法
 */
var s1 = new Set([1, 2])
var s2 = new Set([2, 3])
var s = new Set([...s1, ...s2])     //Set { 1, 2, 3 }, 并集
var s = [...s1].filter(x => s2.has(x))      //[ 2 ]， 交集
var s = [...s1].filter(x => !s2.has(x))      //[ 1 ]， 差集


/**
 * 1.  Map与其他结构互转：数组、对象、JSON
 * 2. 对象增加iterator接口
 */
var m = new Map().set(1, 1)

var a = [...m]      //[ [ 1, 1 ] ], Map->数组
m = new Map(a)      //Map { 1 => 1 }, 数组->Map

var o = {}
for (let [k, v] of m) {     //{ '1': 1 }, Map->对象
    o[k] = v
}

m = new Map()
for (let key in o) {        //Map { '1' => 1 }, 对象->Map
    m.set(key, o[key])
}


var s = JSON.stringify(o)       //{"1":1}，Map->对象->JSON


m = new Map([[true, 1], [{}, 1]])   //键非字符串
s = JSON.stringify([...m])          //[ [ true, 1 ], [ {}, 1 ] ]，Map->数组->JSON

//JSON -> Map同理：JSON->对象/数组->Map



//WeakSet和WeakMap
//Set值和Map键必须是对象
// var s = new WeakSet('11')       //Invalid value used in weak set
// var m = new WeakMap().set(1, 1)     //Invalid value used as weak map key

WeakSet.prototype       //add,delete,has，无遍历,clear,size
WeakMap.prototype       //delete,get,has,set，无遍历,clear,size


/**
 * 1. 内存泄漏的解决
 * 2. 手动释放, 赋值null
 * 3. 弱引用： Weak结构.不计入垃圾回收机制
 * 3. 垃圾回收机制：引用计数（引用为0，释放内存）
 */
var o = {}
o = null

var w = new WeakMap();
o = {}

w.set(o, "ooo");
