let arr = []
//随机数组元素
for (let i = 0; i < 40; i++) {
    arr.push(Math.round(Math.random() * 40))
}
//排序
arr.sort((a, b) => a - b)
console.log(String(arr))

//随机查找值
const value = Math.round(Math.random() * 40)
console.log(value, bsearch(arr, value))

function bsearch(arr, value) {
    //指针low从左向右，指针high从右向左
    let low = 0
    let high = arr.length
    /**
     * 实现
     * 1. low大于high时，跳出循环
     * 2. 取中间值，中间值等于value，则查找成功
     * 3. 中间值小于value,则low指向mid+1
     * 4. 中间值大于value,则high指向mid-1
     */
    /**
     * 注意
     * 1. low等于high，也是一种情况
     * 2. 避免溢出：mid = low + ((high-low)>>1)
     * 3. low和high更新，low = mid或high=mid，可能死循环
     */
    while (low <= high) {
        let mid = (low + high) >> 1
        if (arr[mid] == value) {
            return mid
        } else if (arr[mid] < value) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}


