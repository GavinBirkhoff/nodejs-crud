/*
    业务模块 基于本地dada.json 的写入读取
*/
const data = require('./data.json');
const path = require('path');
const fs = require('fs');

// 自动生成图书编号（自增）
let maxBookCode = ()=>{
    let arr = [];
    data.forEach((item)=>{
        arr.push(item.id);
    });
    return Math.max.apply(null,arr);
}
// 把内存数据写入文件
let writeDataToFile = (res) => {
    fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err)=>{
        if(err){
            res.send('server error');
        }
        // 文件写入成功之后重新跳转到主页面
        res.redirect('/');
    });
}

// 渲染主页面
exports.showIndex = (req,res) => {
    // 演示静态数据 找到index.art 然后替换内容渲染
    res.render('index', {list: data})
}
// 跳转到添加图书的页面
exports.toAddBook = (req,res) => {
    res.render('addBook',{});
}
// 添加图书保存数据
exports.addBook = (req,res) => {
    // 获取表单数据
    let info = req.body;
    let book = {id: maxBookCode() + 1};
    for(let key in info){
        book[key] = info[key];
    }
    data.push(book)
    writeDataToFile(res)
}
// 跳转编辑图书页面
exports.toEditBook = (req,res) => {
    let id = req.query.id;
    let book = {}
    data.forEach(item=>{
        if(item.id == id) {
            book= item
        }
    })
    res.render('editBook', book)
}
// 编辑图书更新数据
exports.editBook = (req,res) => {
    let info = req.body;
    data.forEach(item=>{
        if(item.id == info.id) {
            for(let key in info){
                item[key] = info[key];
            }
        }
    })
    writeDataToFile(res)
}
// 删除图书信息
exports.deleteBook = (req,res) => {
    let id = req.query.id;
    data.forEach((item, index)=>{
        if(item.id == id) {
            data.splice(index, 1)
        }
    })
    writeDataToFile(res)
}

