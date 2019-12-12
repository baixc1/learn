//map
var arr = [1, 4, 9].map(Math.sqrt)
var arr = [1, 2, 3].map(x => x * 2)
//react使用map生成元素
//需配置依赖
// function functionComponent() {
//     return (
//         <div>
//             {
//                 arr.map((item, index) => {
//                     return <div key={index}>{item}</div>
//                 })
//             }
//         </div>
//     )
// }

//filter
//数组筛选符合要求的值
var arr = [{ status: 1 }, { status: 0 }, { status: 1 }, { status: 0 },].filter(item => item.status)


//every
//判断数组值，是否全部满足要求
var flag = [{ status: 1 }, { status: 0 }, { status: 1 }, { status: 0 },].every(item => item.status)
var flag = [].every(() => { })


//some
var flag = [{ status: 1 }, { status: 0 }, { status: 1 }, { status: 0 },].some(item => item.status)
var flag = [].some(() => { })

//reduce
//求和
var sum = [3, 4, 5].reduce((acc, curValue) => acc + curValue)
//数组为空且无initialValue，抛出TypeError,分号规则：)和[加 ; 隔开
//;[].reduce(() => { }, 1)
//对象项的值求和，提供初始值
var sum = [{ n: 3 }, { n: 4 }, { n: 5 }].reduce((acc, item) => {
    return acc + item.n
}, 0)
//二维数组转一维
var flattened = [[1], [2], [3]].reduce((a, b) => a.concat(b), [])


//push,pop,shift,unshift

var plants = [1, 2, 3]
console.log(plants.push(4))
console.log(plants)
console.log(plants.pop())
console.log(plants)
console.log(plants.shift())
console.log(plants)

//concat
var arr = [1, 2, 3]
console.log(arr.concat(4).concat([1, 2]))
console.log(arr)

//join
var arr = [1, 2, 3]
console.log(arr.join(''))

//splice
var arr = [1, 2, 3]
//删除
console.log(arr.splice(1, 1))
console.log(arr)
//新增
console.log(arr.splice(1, 0, 4))
console.log(arr)
//改
console.log(arr.splice(1, 1, 2))
console.log(arr)

//reverse
var arr = [1, 2, 3]
console.log(arr.reverse())

//sort
var arr = ['b', 'a', 'A', 'AB']
arr.sort()
console.log(arr)

var arr = [2, 1, 5, 3, 4, -1, -4, -1]
arr.sort((a, b) => a - b)
console.log(arr)