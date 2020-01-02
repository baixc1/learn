/**
 * Promise原型方法: then, catch
 */

/**
 * then
 * 1. then方法返回的是一个新的Promise实例，可链式调用
 * 2. then方法回调函数返回Promise实例，后一个then方法会等待
 */
//不是同一个实例
var p1 = new Promise(resolve => resolve())
var p2 = p1.then()          //1
console.log(p1 == p2)       //false
console.log(p2)             //Promise { <pending> }
//链式调用
new Promise(resolve => resolve(1))
    .then(data => data)
    .then(data => console.log(data))           //1

//then回调函数返回Promise
//1s后输出123
Promise.resolve()
    .then(
        () => new Promise(resolve => {
            setTimeout(() => { resolve(123) }, 1000)
        })
    )
    .then(data => console.log(data))

/**
 * catch
 * 0. 返回Promise对象, 状态resolved
 * 1. then(null, rejection)别名
 * 2. catch可捕获之前then方法回调函数中的错误
 * 3. Promise中的错误不会影响后续代码执行
 */
Promise.reject().catch(() => 1).then(data => console.log(data)) //1
Promise.reject(1).then(1, data => console.log(1))   //1
Promise.resolve()
    .then(() => console.log(a))
    .catch(e => console.log(e))             //ReferenceError: a is not defined
new Promise(resolve => console.log(a))
console.log('continue')                     //continue

/**
 * finally
 */
//类似then
let p = new Promise(() => { })
p.finally()
p.then(() => { }, () => { })

//finally实现，1. 执行fn，2.返回原值
Promise.resolve(2).finally(() => { })    //Promise {<resolved>: 2}
Promise.reject(3).finally(() => { })     //Promise {<rejected>: 3}
Promise.prototype.finally1 = function (fn) {
    return this.then(
        data => Promise.resolve(fn()).then(() => data),
        reason => Promise.resolve(fn()).then(() => { throw reason })
    )
}
Promise.resolve(2).finally1(() => { })    //Promise {<resolved>: 2}
Promise.reject(3).finally1(() => { })     //Promise {<rejected>: 3}

/**
 * Promise方法
 */
/**
 * Promise.all
 */
//全部resolved
Promise.all(
    [1, 2, 3].map(
        n => new Promise(
            resolve => {
                setTimeout(() => { resolve(n * 2) }, n * 500)
            }
        )
    )
).then(data => console.log(data))   //[2, 4, 6]
//任一reject
Promise.all(
    [1, 2, 3].map(
        n => new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (n == 3) { reject(n) }
                    resolve(n * 2)
                }, n * 500)
            }
        )
    )
).catch(data => console.log(data))      //3

//race，比谁快
Promise.race(
    [1, 2, 3].map(
        n => new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (n == 1) { reject(n) }
                    resolve(n * 2)
                }, n * 500)
            }
        )
    )
).catch(data => console.log(data))      //1

Promise.race(
    [1, 2, 3].map(
        n => new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (n == 2) { reject(n) }
                    resolve(n)
                }, n * 500)
            }
        )
    )
).then(data => console.log(data))      //1

/**
 * allSettled
 * 等到所有Promise状态改变，才结束
 */
function getPromise(success, data, time) {
    return new Promise((resolved, reject) => {
        setTimeout(() => {
            if (success) {
                resolved(data)
            } else {
                reject(data)
            }
        }, 500 || time)
    })
}
var p1 = getPromise(true, 'success')
var p2 = getPromise(false, 'fail')
var p3 = getPromise(true, 'long success', 3000)
//[{"status":"fulfilled","value":"success"},{"status":"rejected","reason":"fail"},{"status":"fulfilled","value":"long success"}]
Promise.allSettled([p1, p2, p3]).then(data => console.log(JSON.stringify(data)))

/**
 * resolve
 * 将现有对象转为 Promise 对象
 */
//参数是一个 Promise 实例
var p = Promise.resolve()
p == Promise.resolve(p)         //true

//then方法对象， 返回resolved的Promise对象
var thenable = {
    then(resolve) {
        resolve(42)
    }
}

Promise.resolve(thenable).then(data => console.log(data))   //42

//原始值、非then方法对象， 返回resolved的Promise对象
Promise.resolve()           //Promise {<resolved>: undefined}
Promise.resolve({})         //Promise {<resolved>: {…}}

//resolve的对象，在本轮“事件循环”的结束时执行
//依次 one two three four
setTimeout(() => console.log('four'))

Promise.resolve().then(() => console.log('two'))

new Promise(resolve => resolve(1)).then(() => console.log('three'))
console.log('one');


//reject
var thenable = {
    then(resolve) {
        resolve(42)
    }
}

Promise.reject(thenable)
    .catch(data => console.log(data == thenable))   //true
