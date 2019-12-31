
/**
 * 概述
 * 三种状态pending，resolved，rejected
 * pending（进行中）
 * fulfilled（已成功）-> resolve
 * rejected（已失败）-> reject
 */
new Promise(() => { })        //Promise {<pending>}
Promise.resolve()          //Promise {<resolved>: undefined}
Promise.reject()           //Promise {<rejected>: undefined}


/**
 * 1. 一旦状态改变，就不会再变
 * 2. 对象的状态不受外界影响
 * 3. resolve或reject执行后，继续往后执行
 * 4. then在本轮事件循环的末尾执行
 */
//依次输出： 2 1
new Promise(resolve => {
    resolve(1)
    console.log(2)
    reject()
}).then(data => console.log(data))


/**
 * 基本用法
 */
//Promise是构造函数, 生成Promise实例
toString.call(Promise)      //"[object Function]"
toString.call(new Promise(() => { }))   //"[object Promise]"

/**
 * 0. 通过resolve，reject，自定义结果
 * 1. resolve（已成功），走then第一个回调
 * 2. reject（已失败），走catch或then第二个回调
 * 3. then，catch指定Promise状态改变时的回调
 * 4. reject和then指定的回调函数，在同步任务执行完才执行
 * 5. Promise 新建后就会立即执行
 */

//调用reslove，使用then第一个回调接受结果及参数
new Promise(resolve => {
    resolve(1)
}).then(data => console.log(data))      //1
//调用reject，使用then第二个回调接收结果及参数
new Promise((resolve, reject) => {
    reject(1)
}).then(null, data => console.log(data))      //1
//调用reject，使用catch接收结果及参数
new Promise((resolve, reject) => {
    reject(1)
}).catch(data => console.log(data))      //1

//reject和then指定的回调函数，在同步任务执行完才执行
//以下输出：1 2 3
new Promise(resolve => {
    console.log(1)
    resolve()
}).then(v => console.log(3))
console.log(2)

//应用1： 加载图片(浏览器运行)
function loadImg(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject('load img fail')
        }
        img.src = url
    })
}
//reslove
loadImg('https://static.dongtu.com/netpic/20191210175042C88HPAVRX37AZMIW.gif').then(data => console.log(data))
//reject
loadImg('https://static.dongtu.com/netpic/20191210175042C88HPAVRX37AZMIW.gi').catch(data => console.log(data))


//应用2： get请求封装(浏览器运行)
function httpRequest(url) {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest()
        client.open('GET', url)
        //this不能使用 => 定义函数
        client.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.response)
                } else {
                    reject(this.statusText)
                }
            }
        }
        client.send()
    })
}

//可分开写，p.then可在之后任意时刻调用
var p = httpRequest('http://dongtu.com/index/banner')
console.log(p)                           //Promise {<pending>}
setTimeout(() => {
    console.log(p)          //Promise {<resolved>: "{"data":[...
    p.then(
        data => console.log(data),
        data => console.log(data)
    )
}, 1000)


/**
 * 1. resolve函数参数可为Promise实例，其对应实例状态由它决定（如2）
 * 2. p2的状态由p1决定
 * 3. catch后，p3状态变为resolved
 * 4. 流程：
        p1/p2/p3 pending -> 
        p1 rejected -> 
        p2 rejected -> 
        p3 resolved
 */
var p1 = new Promise((resolve, reject) => {
    setTimeout(() => reject('data'), 5000)
})

var p2 = new Promise(resolve => resolve(p1))

var p3 = p2.catch(data => console.log(data))


