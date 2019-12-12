

//平方根位数
var weishu = 6
//测试数据
for (let i = 0; i < 1000; i++) {
    let data = Math.random() * 100
    let diff = Math.pow(10, weishu) * (fun(data) - Math.sqrt(data))
    console.log(fun(data), diff <= 0 && diff > -1)
}


function fun(num) {
    //返回结果
    let res
    if (num == 1) {
        res = 1
    } else {
        res = 0
        for (let i = 0; i <= weishu; i++) {
            recursive(Math.pow(10, -1 * i))
        }
        //舍入误差解决
        let expend = Math.pow(10, weishu)
        res = Math.round(res * expend) / expend
    }

    //小数点后weishu位
    return res.toFixed(weishu)
    /**
     * 按位递归公式：
     *      0. 循环，每次cur增加digit
     *      1. 退出循环，cur方 <= num < （cur + digit*n）方，查询成功
     * 终止条件
     */
    function recursive(digit) {
        let end = 10
        //整数部分
        if (digit == 1) {
            end = num
        }
        for (let i = 0; i < end; i++) {
            if (num >= powValue(res + i * digit) && num < powValue(res + (i + 1) * digit)) {
                res = res + i * digit
                return
            }
        }
    }

    function powValue(value, param = 2) {
        return Math.pow(value, param)
    }

}
