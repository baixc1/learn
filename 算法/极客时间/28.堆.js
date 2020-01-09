class Heap {
    constructor() {
        this.arr = ['']      //数组，从下标1开始存储数据
    }

    setArr(arr) {
        this.arr = ['', ...arr]
    }

    display() {
        let { arr } = this
        arr = arr.slice(1)
        let len = arr.length
        let i = 0
        let h = 1
        let str = ''
        while (i < len) {
            let j = 0
            while (j++ < h) {
                if (arr[i] !== undefined) {
                    str += ' ' + arr[i]
                    i++
                }
            }
            str += '\n'
            h *= 2
        }
        console.log(str)
    }

    inserts(arr) {
        for (let v of arr) {
            this.insert(v)
        }
    }

    /**
     * 插入数据
     * 1. 新数据插入尾部
     * 2. 尾部新数据向上比较与互换
     */
    insert(data) {
        let { arr } = this
        arr.push(data)
        let i = arr.length - 1
        this.toUp(i)
    }

    //删除某个下标节点, index>=1
    del(index) {
        let { arr } = this
        let len = arr.length
        if (len == 1) return -1   //堆中无数据
        //尾部元素移动到index位置
        arr[index] = arr[len - 1]
        arr.pop()

        //往上
        this.toUp(index)
        //往下
        this.toDown(index)
    }

    //建堆: 从下往上
    buildHeap(a) {
        this.setArr(a)
        let n = this.arr.length
        for (let i = n >> 1; i >= 1; --i) {
            this.toDown(i)
        }
    }

    //排序
    sort(a) {
        a && this.setArr(a)
        let k = this.arr.length - 1
        while (k > 1) {
            swap(this.arr, 1, k--)
            this.toDown(1, k)
        }
    }

    //堆化：从下往上
    toUp(i) {
        let { arr } = this
        let p = i >> 1          //父元素下标
        while (p > 0 && arr[i] > arr[p]) {
            swap(arr, i, p)
            i = p
            p = i >> 1
        }
    }

    //堆化：从上往下。i-堆化的开始下标，n-堆化的结束下标
    toDown(i, n) {
        let { arr } = this
        if (!n) {
            n = arr.length - 1
        }
        while (true) {
            let maxPos = i
            if (i * 2 <= n && arr[i] < arr[i * 2]) maxPos = i * 2
            if (i * 2 + 1 <= n && arr[maxPos] < arr[i * 2 + 1]) maxPos = i * 2 + 1
            if (maxPos == i) break
            swap(arr, i, maxPos)
            i = maxPos
        }

    }
}

function swap(arr, x, y) {
    arr[x] += arr[y]
    arr[y] = arr[x] - arr[y]
    arr[x] -= arr[y]
}

var h = new Heap()
h.inserts([1, 2, 3, 4, 5, 6])
h.display()
h.del(2)
h.display()

var h1 = new Heap()
h1.inserts([27, 10, 18, 5, 8, 17, 16, 1, 2, 3, 4, 12])
h1.display()
h1.del(4)
h1.display()

var h2 = new Heap()
h2.buildHeap([7, 5, 19, 8, 4, 1, 20, 13, 16])
h2.display()

h2.sort()
h2.display()