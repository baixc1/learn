class HashTable {
    constructor() {
        this.table = []
    }

    //散列函数
    hash(key) {
        var hash = 0
        //hash算法
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        //取小值
        return hash % 37
    }

    put(key, value) {
        this.table[this.hash(key)] = value
    }

    remove(key) {
        delete this.table[this.hash(key)]
    }

    get(key) {
        return this.table[this.hash(key)]
    }

    print() {
        let list = this.table
        for (let i = 0; i < list.length; i++) {
            if (list[i] !== undefined) {
                console.log(i, list[i])
            }
        }
    }
}

var hash = new HashTable()
for (let i = 0; i < 40; i++) {
    hash.put(i + '', i)
}
hash.print()