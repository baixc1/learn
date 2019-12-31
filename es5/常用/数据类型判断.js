/**
 * Object.prototype.toString.call，对象原型方法
 * 1. 返回"[object type]"，type为具体类型
 * 2. 可以区分内置对象（ Null,Array，Date...）
 */

Object.prototype.toString === toString  //true，全局方法
Object.prototype.toString.call(null)    //"[object Null]"
Object.prototype.toString.call([])      //"[object Array]"
Object.prototype.toString.call(new Date())  //"[object Date]"

/**
 * 扩展
 * 1. 数组的toString方法
 * 2. 删除该方法，则去原型链查找
 */
var arr = [1, 2, 3]
arr.toString()      //"1,2,3"
delete Array.prototype.toString
arr.toString()      //"[object Array]"


/**
 * typeof
 * 返回字符串：undefined,boolean,string,number,object,function,symbol,bigint
 *   	类型 -> 结果
 * 1. Null -> 'object'
 * 2. Function -> 'function'
 * 3. Symbol -> 'symbol'
 * 4. 宿主对象 -> 取决于具体实现
 * 5. 其他对象 -> 'object'
 */
typeof null == 'object'                //true
typeof (() => { }) == 'function'       //true
typeof Symbol() == 'function'          //true
// typeof document.all == "undefined"     //true，浏览器
typeof new Set() == 'object';            //true


/**
 * instanceof
 * 返回布尔值
 * 1. 无法区分各种对象，基于原型链比较
 * 2. 无法区分基本类型
 */
({}) instanceof Object              //true
    ([]) instanceof Object              //true
new String('') instanceof String    //true
'' instanceof String                //false
111 instanceof Number               //false



/**
 * constructor
 * 返回构造函数
 * 1. undefined和null无该属性
 * 2. 容易改写
 */
1..constructor == Number            //true
window.constructor == Window;        //true
[].constructor == Array            //true
undefined.constructor               //报错