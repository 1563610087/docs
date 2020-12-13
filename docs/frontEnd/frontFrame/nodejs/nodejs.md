# node学习笔记

## 1 构建web应用

### 1.1 创建http服务

```javascript
1. 引入http模块
2. 创建http服务，监听端口
3. 接受请求
4. 处理请求
5. 发送响应
var http = require('http');
const server=http.createServer(function(req,res){
    console.log('hah');
 res.end('hello world')
})
server.listen(8080,'127.0.0.1');
console.log('server running at http://127.0.0.1：8080')
```

### 1.2 常见业务需求

1. 请求方法的判断
2. url的路径解析
3. url中查询字符串解析
4. cookie的解析
5. basic认证
6. 表单数据的解析
7. 任意格式文件的上传

## 2  核心模块

### 2.1 文件模块

```javascript
const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    // data 是二进制类型，需要转换为字符串
    console.log(data.toString())
})

// 写入文件
const content = '这是新写入的内容\n'
const opt = {
    flag: 'a'  // 追加写入。覆盖用 'w'
}
fs.writeFile(fileName, content, opt, (err) => {
    if (err) {
        console.error(err)
    }
})

// 判断文件是否存在
fs.exists(fileName, (exist) => {
    console.log('exist', exist)
})

```

## 3 express框架

### 3.1 中间件

Express是一个路由和中间件Web框架，它具有自己的最小功能：Express应用程序本质上是一系列中间件函数调用。

*中间件*函数是可以访问[请求对象](http://expressjs.com/en/4x/api.html#req)（`req`），[响应对象](http://expressjs.com/en/4x/api.html#res)（`res`）以及`next`应用程序请求 - 响应周期中的函数的函数。该`next`功能是Express路由器中的一个功能，当被调用时，它将执行当前中间件之后的中间件。

### 3.2 分类

Express应用程序可以使用以下类型的中间件：

- [应用程序级中间件](http://expressjs.com/en/guide/using-middleware.html#middleware.application)
- [路由器级中间件](http://expressjs.com/en/guide/using-middleware.html#middleware.router)
- [错误处理中间件](http://expressjs.com/en/guide/using-middleware.html#middleware.error-handling)
- [内置中间件](http://expressjs.com/en/guide/using-middleware.html#middleware.built-in)
- [第三方中间件](http://expressjs.com/en/guide/using-middleware.html#middleware.third-party)

