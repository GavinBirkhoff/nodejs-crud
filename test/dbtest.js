const db = require('../db.js')

let sql = `insert into book set ?`
let data = {
    name: 'sql语句',
    author: 'gavin',
    category: '数据库语句',
    description: '操作数据库的语言'
}

db.base(sql, data, (result)=>{
    console.log(result)
})