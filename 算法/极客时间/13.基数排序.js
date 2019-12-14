//测试数据
let arr = []
const len = 11
for (let i = 0; i < 10000; i++) {
    arr.push(randomPhone())
}

for (let i = len - 1; i >= 0; i--) {
    countingSort(i)
}
console.log(arr)

function countingSort(index) {
    let curArr = new Array(10).fill(0)

    //键值互换，相同元素的个数
    for (let i = 0; i < arr.length; i++) {
        let item = Number(arr[i][index])
        curArr[item]++
    }

    //累加，小于该值个数
    for (let i = 1; i < curArr.length; i++) {
        curArr[i] += curArr[i - 1]
    }

    let retArr = []
    //按序插入
    for (let i = arr.length - 1; i >= 0; i--) {
        let item = Number(arr[i][index])
        //插入相同元素时，从后往前
        retArr[--curArr[item]] = arr[i]
    }
    arr = retArr
}

function randomPhone() {
    let str = ''
    for (let i = 0; i < len; i++) {
        str += Math.ceil(Math.random() * 9)
    }
    return str
}

