//10组测试数据
for (let i = 0; i < 10; i++) {
    let arr = getTestData()
    getTestData(merge_sort(arr))
    console.log(arr)
}

//生成10个随机元素的测试数组
function getTestData() {
    let ret = []
    for (let i = 0; i < 10; i++) {
        ret.push(Math.ceil(Math.random() * 20))
    }
    return ret
}

//排序函数
function merge_sort(A) {
    merge_sort_j(A, 0, A.length - 1)
}

//递归函数
function merge_sort_j(A, p, r) {
    if (p >= r) return
    let q = p + ((r - p) >> 1)
    //分治递归
    merge_sort_j(A, p, q)
    merge_sort_j(A, q + 1, r)
    //p-q,q+1-r合并成有序的p-r
    merge_use_new_array(A, p, q, r)
}

//合并两个有序数组
function merge(A, p, q, r) {
    //两个数组指针
    let i = p
    let j = q + 1
    let addNum = 0      //中点右偏移数
    //i,j任一遍历完成则结束
    while (i < q + 1 + addNum && j < r + 1) {
        /**
         * 1. i>j值时，进入循环。删除原有j值，i之前插入j值，i和j同时后移一位。
         * 2. i<=j时，i后移
         */
        while (A[i] > A[j] && j < r + 1) {
            let temp = A[j]
            A.splice(j, 1)
            A.splice(i, 0, temp)
            j++
            i++
            addNum++
        }
        i++
    }
}

//使用新数组的merge函数
function merge_use_new_array(A, p, q, r) {
    let arr = []
    let i = p
    let j = q + 1
    while (i < q + 1 && j < r + 1) {
        if (A[i] <= A[j]) {
            arr.push(A[i])
            i++
        } else {
            arr.push(A[j])
            j++
        }
    }
    //补上剩下的部分
    if (i != q + 1) {
        arr = arr.concat(A.slice(i, q + 1))
    } else if (j != r + 1) {
        arr = arr.concat(A.slice(j, r + 1))
    }
    //排序好的值回填
    for (let i = p; i < r + 1; i++) {
        A[i] = arr[i - p]
    }
}