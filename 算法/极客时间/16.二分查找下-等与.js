let arr = [1, 8, 8, 8, 8, 8, 8, 8, 11, 18]

let index = bsearch(arr, 8)
let indexEnd = bsearchEnd(arr, 8)
let indexGreatOrEqual = bsearchGreatOrEqual(arr, 10)
let indexLessOrEqual = bsearchLessOrEqual(arr, 10)

console.log(index, indexEnd, indexGreatOrEqual, indexLessOrEqual)
//核心思想：有序列表，从两边往中间找，用中间值比较。每次比较后，缩小一半区间，直至区间<0
//变体一：查找第一个值等于给定值的元素
function bsearch(arr, value) {
    let low = 0
    let high = arr.length - 1
    while (low <= high) {
        //运算符优先级： + 大于 >>
        let mid = low + ((high - low) >> 1)
        if (value > arr[mid]) {
            low = mid + 1
        } else if (value < arr[mid]) {
            high = mid - 1
        } else {
            //无左值，或左值小于value
            if (mid == 0 || arr[mid - 1] < value) {
                return mid
            } else {        //继续二分查找
                high = mid - 1
            }
        }
    }
    return -1
}

//变体二：查找最后一个值等于给定值的元素
function bsearchEnd(arr, value) {
    let low = 0
    let high = arr.length - 1
    while (low <= high) {
        let mid = low + ((high - low) >> 1)
        if (value > arr[mid]) {
            low = mid + 1
        } else if (value < arr[mid]) {
            high = mid - 1
        } else {
            //右边界，或<右值退出。否则往右继续
            if (mid == arr.length - 1 || value < arr[mid + 1]) {
                return mid
            } else {
                low = mid + 1
            }
        }
    }
    return -1
}

//变体三：查找第一个大于等于给定值的元素
function bsearchGreatOrEqual(arr, value) {
    let low = 0
    let high = arr.length - 1
    while (low <= high) {
        let mid = low + ((high - low) >> 1)
        if (value > arr[mid]) {
            low = mid + 1
        } else {
            //左边界，或左值小于value退出。否则向左
            if (mid == 0 || arr[mid - 1] < value) {
                return mid
            } else {
                high = mid - 1
            }
        }
    }
    return -1
}

//变体四：查找最后一个小于等于给定值的元素
function bsearchLessOrEqual(arr, value) {
    let low = 0
    let high = arr.length - 1
    while (low <= high) {
        let mid = low + ((high - low) >> 1)
        if (value < arr[mid]) {
            high = mid - 1
        } else {
            //右边界，或右值大于value退出。否则向右
            if (mid == arr.length - 1 || arr[mid + 1] > value) {
                return mid
            } else {
                low = mid + 1
            }
        }
    }
    return -1
}