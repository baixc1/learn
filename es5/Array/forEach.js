//forEach
var res = [1, 4, 9].forEach(x => Math.sqrt(x))
var arr = [1, 2, 3]
arr.forEach((x, i) => arr[i] = x * 2)
var arr = [{ a: 1 }]
//函数参数按值传递（复制），赋值无效（地址改变）
//类似：let item = arr[i]
arr.forEach(item => item = [])
//引用类型，修改每项
arr.forEach(item => item.a = 2)
console.log(arr)