//测试数据总数
const total = 10000
//元素范围
const max = 1000
//数据数组
let arr = []
//随机元素
for (let i = 0; i < total; i++) {
    arr[i] = Math.floor(Math.random() * max)
}
//元素范围以10划分桶
let avarage = 10
//m桶个数
let m = max / avarage
//问题：fill生成的数组使用同一地址
// let curArr = new Array(m).fill([])
let curArr = []

//数据插入对应桶内
for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    let curIndex = Math.floor(item / avarage)
    if(!curArr[curIndex]){
        curArr[curIndex] = []
    }
    curArr[curIndex].push(item)
}
console.log(curArr)