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
    if (!curArr[curIndex]) {
        curArr[curIndex] = []
    }
    curArr[curIndex].push(item)
}

for (let i = 0; i < curArr.length; i++) {
    sortArr(curArr[i])
}

console.log(curArr.slice(0,8))

//排序
function sortArr(arr) {
    quickSort(arr, 0, arr.length - 1)

    //数组list，下标p->r
    function partition(list, p, r) {
        //分区点
        let pivot = list[r]
        let i = j = p   //指针i，遍历数组，指针j记录小于pivot的下标
        for (; i <= r - 1; i++) {
            //小于pivot的数，放到前面
            if (list[i] < pivot) {
                exchangeTwo(list, i, j)
                //小于pivot的数加一
                j++
            }
        }
        exchangeTwo(list, j, r)
        return j
    }

    function exchangeTwo(list, x, y) {
        if (x != y) {
            let temp = list[x]
            list[x] = list[y]
            list[y] = temp
        }
    }

    function quickSort(arr, p, r) {
        if (p >= r) return
        //获取分区点下标
        let q = partition(arr, p, r)
        quickSort(arr, p, q - 1)
        quickSort(arr, q + 1, r)
    }
}
