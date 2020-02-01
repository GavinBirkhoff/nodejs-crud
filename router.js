const express = require('express')
const router = express.Router()
// const service = require('./staticservice.js') // 操作本地的dada.json
const service = require('./service.js')          // 操作真正的数据库mysql


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// // define the home page route
// router.get('/', function (req, res) {
//   res.send('Birds home page')
// })
// // define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

// 路由处理

// 渲染主页
router.get('/',service.showIndex)
// 添加图书(跳转到添加图书的页面)
router.get('/toAddBook',service.toAddBook)
// 添加图书(提交表单)
router.post('/addBook',service.addBook)
// 跳转到编辑图书信息页面
router.get('/toEditBook',service.toEditBook)
// 编辑图书提交表单
router.post('/editBook',service.editBook)
// 删除图书信息
router.get('/deleteBook',service.deleteBook)

module.exports = router