
function inOrder(root) {
    let str = ''
    fn(root)
    console.log(str)
    function fn(root) {
        if (!root) return
        fn(root.left)
        str += ' ' + root.data
        fn(root.right)
    }

}

//节点
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

//插入
function insert(tree, data) {
    if (!tree) {
        return new Node(data)
    }
    let p = tree
    while (tree) {
        if (data >= p.data) {
            if (p.right) {
                p = p.right
            } else {
                p.right = new Node(data)
                return
            }
        } else {
            if (p.left) {
                p = p.left
            } else {
                p.left = new Node(data)
                return
            }
        }
    }
}



//查找
function find(tree, data) {
    while (tree) {
        if (data < tree.data) {
            tree = tree.left
        } else if (data > tree.data) {
            tree = tree.right
        } else {
            return tree
        }
    }
    return null
}


function del(tree, data) {
    //被删除节点父节点
    let pp
    //被删除节点
    let p = tree
    while (p && p.data != data) {
        pp = p
        if (data > p.data) {
            p = p.right
        } else {
            p = p.left
        }
    }
    if (!p) return
    //两个子节点，转化
    if (p.left && p.right) {
        let minP = p.right      //右侧最小值
        let minPP = p              //右侧最小值父节点
        while (minP.left) {
            minPP = minP
            minP = minP.left
        }
        //p和minP替换
        p.data = minP.data
        //删除minP（不删p）,后面一起删，先记着
        p = minP
        pp = minPP
    }

    //小于2个子节点
    let child = p.left || p.right || null //p的子节点

    if (!pp) {          //根节点
        tree = child
    } else if (pp.left == p) { //左节点
        pp.left = child
    } else {
        pp.right = child
    }
    del(tree, data) //递归删除，直至无该数据
}


let tree = insert(null, 5)
insert(tree, 6)
insert(tree, 7)
insert(tree, 3)
insert(tree, 4)
insert(tree, 2)
insert(tree, 2)
insert(tree, 1)
insert(tree, 9)
insert(tree, 9)

inOrder(tree)
del(tree, 2)
del(tree, 9)
inOrder(tree)

insert(tree, 9)

//二叉树最大高度 - 递归
function maxDepth(tree) {
    if (!tree) return 0
    return Math.max(maxDepth(tree.left), maxDepth(tree.right)) + 1
}

//二叉树最大高度 - 循环
function maxDepth1(tree) {
    if (!tree) return 0
    let queue = [tree]
    let front = 0               //队头
    let rear = queue.length     //队尾
    let floor = 0               //高度
    while (queue.length) {
        let node = queue.shift()
        front++
        if (node.left) {
            queue.push(node.left)
        }
        if (node.right) {
            queue.push(node.right)
        }
        if (front == rear) {      //进入下一层
            front = 0
            rear = queue.length
            floor++
        }
    }
    return floor
}

console.log(maxDepth(tree))
console.log(maxDepth1(tree))