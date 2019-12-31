
var tree = {
    data: 1,
    left: {
        data: 2,
        left: {
            data: 4
        }
    },
    right: {
        data: 3,
        left: {
            data: 5
        },
        right: {
            data: 6,
            left: {
                data: 7
            },
            right: {
                data: 8,
                left: {
                    data: 9
                }
            }
        }
    }
}
//前序
function preOrder(root) {
    if (!root) return
    console.log(root.data)
    preOrder(root.left)
    preOrder(root.right)
}
//中序
function inOrder(root) {
    if (!root) return
    inOrder(root.left)
    console.log(root.data)
    inOrder(root.right)
}
//后序 
function postOrder(root) {
    if (!root) return
    postOrder(root.left)
    postOrder(root.right)
    console.log(root.data)
}

preOrder(tree)
console.log('---------------')
inOrder(tree)
console.log('---------------')
postOrder(tree)
console.log('---------------')

//广度优先，借助队列
let queue = [tree]
while (queue.length) {
    let { left, right, data } = queue.shift()
    console.log(data)
    if (left) queue.push(left)
    if (right) queue.push(right)
}

/**
 * 完全二叉树数组储藏
 * 1. 节点下标i，其左节点2*i，右节点2*i+1
 */
arr = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
