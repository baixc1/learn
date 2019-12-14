//测试数据
let arr = [1, 82, 22, 3, 222, 44, 55, 6, 9, 48]

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

//
function quickSort(arr, p, r) {
    if (p >= r) return
    //获取分区点下标
    let q = partition(arr, p, r)
    quickSort(arr, p, q - 1)
    quickSort(arr, q + 1, r)
}

quickSort(arr, 0, arr.length - 1)
console.log(arr)