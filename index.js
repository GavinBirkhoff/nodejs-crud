// 图书管理系统入口文件
const path = require('path')
const express = require('express')
const router = require('./router.js')
const restfulRouter = require('./restfulRouter.js')

const template = require('art-template')
const bodyParser = require('body-parser')
const app = express()

// 启动静态资源服务 /www 为虚拟路径
app.use('/www',express.static('public'));

// 设置模板引擎
// 设置模板路径
app.set("views", path.join(__dirname,"views"))
// 设置模板引擎后缀
app.set("view engine", "art")
// 使express 兼容art-template模板引擎
app.engine("art", require('express-art-template'))

// 处理请求参数
// 挂载参数处理中间件 (post)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 处理json格式的参数
app.use(bodyParser.json())

// 启动服务器功能
// 配置路由
// express.Router

// Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
// The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.
// Create a router file named birds.js in the app directory, with the following content:
app.use(router)

app.use(restfulRouter)

// 监听端口
app.listen(3000, ()=>{
    console.log(`runing...`)
})