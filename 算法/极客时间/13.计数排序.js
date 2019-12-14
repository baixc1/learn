const total = 1000
let max = 1000
let min = -1000
let arr = []
//随机元素,min-max,total个
for (let i = 0; i < total; i++) {
    arr[i] = min + Math.floor(Math.random() * (max-min))
}
console.log(arr)
//值范围以0开始
let diff
if (min != 0) {
    diff = min
    max = max - min
    min = 0
    arr.forEach((item, index) => {
        arr[index] = item - diff
    })
}
let curArr = new Array(max).fill(0)

//键值互换，相同元素的个数
for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    curArr[item]++
}

//累加，小于该值个数
for (let i = 1; i < curArr.length; i++) {
    curArr[i] += curArr[i - 1]
}

let retArr = []
//按序插入
for (let i = arr.length - 1; i >= 0; i--) {
    let item = arr[i]
    //插入相同元素时，从后往前
    retArr[--curArr[item]] = item
}
if (diff) {
    retArr.forEach((item, index) => {
        retArr[index] = item + diff
    })
}
console.log(retArr)