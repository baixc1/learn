let arr = []
//随机数组元素
let num = 10
for (let i = 0; i < num; i++) {
    arr.push(Math.round(Math.random() * num))
}
//排序
arr.sort((a, b) => a - b)
console.log(String(arr))

//随机查找值
const value = Math.round(Math.random() * num)
console.log(value, bsearch(arr, 0, arr.length, value))

function bsearch(arr, low, high, value) {
    /**
     * 递归公式：判断中间值
     *      1. 等于value则返回
     *      2. 小于value则向右查找
     *      3. 大于value则向左查找
     * 终止条件：low > high或已找到
     */
    if (low > high) return -1
    //优先级：+ 大于 >>
    let mid = low + ((high - low) >> 1)
    if (arr[mid] == value) {
        return mid
    } else if (arr[mid] < value) {
        return bsearch(arr, mid + 1, high, value)
    } else {
        return bsearch(arr, low, mid - 1, value)
    }
}