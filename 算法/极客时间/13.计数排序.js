const total = 10
const max = 10
let arr = []
//随机元素
for (let i = 0; i < total; i++) {
    arr[i] = Math.floor(Math.random() * max)
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