# ajax

## 1 概述

### 1.1 浏览器发送请求方式

* 地址栏输入地址，回车，刷新
* 特定元素的 href 或 src 属性
* 表单提交 

缺点：这些方案都是我们无法通过或者很难通过代码的方式进行编程（对服务端发出请求并且接受服务端返回的响应） 

### 1.2 ajax

A JAX（Asynchronous JavaScript and XML），最早出现在 2005 年的 Google Suggest，是在浏览器端进行网络编程（发送请求、接收响应）的技术方案，它使我们可以通过 JavaScript 直接获取服务端最新的内容而不必重新加载页面。让 Web 更能接近桌面应用的用户体验 

A JAX 就是浏览器提供的一套 API，可以通过 JavaScript 调用，从而实现通过代码控制请求与响应。实现网络编程。 

## 2 创建ajax请求

### 2.1 基本用法

```javascript
// 1. 创建一个 XMLHttpRequest 类型的对象 
var xhr = new XMLHttpRequest()
// 2. 打开与一个网址之间的连接,设置请求方式，请求的地址
xhr.open('GET', '请求地址')
// 3. 通过连接发送请求 
xhr.send(发送内容)
// 4. 指定 xhr 状态变化事件处理函数 
xhr.onreadystatechange = function () {
// 通过 xhr 的 readyState 判断此次请求的响应是否接收完成
if (this.readyState === 4) {
// 通过 xhr 的 responseText 获取到响应的响应体
console.log(this)
}
}
```

### 2.2 readyState 状态

| readyState | 状态描述         | 说明                                               |
| ---------- | ---------------- | -------------------------------------------------- |
| 0          | unsent           | 代理xhr被创建，但未调用open（）方法                |
| 1          | opened           | open（）方法已经被调用，建立了连接                 |
| 2          | headers_received | send()方法已经被调用，并且可以获得状态行和响应头   |
| 3          | loading          | 响应体下载中，responseText属性可能已经包含部分数据 |
| 4          | done             | 响应体下载完成，可以直接使用responseText           |

### 2.3 遵循http

本质上 XMLHttpRequest 就是 JavaScript 在 Web 平台中发送 HTTP 请求的手段，所以我们发送出去的请求任然是
HTTP 请求，同样符合 HTTP 约定的格式：
参考链接：
https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

```javascript
//具体用法
xhr.onreadystatechange = function () {
if (this.readyState === 4) {
// 后续逻辑......
}
}
// 设置请求报文的请求行
xhr.open('GET', './time.php')
// 设置请求头
xhr.setRequestHeader('Accept', 'text/plain')
// 设置请求体
xhr.send(null)
xhr.onreadystatechange = function () {
if (this.readyState === 4) {
// 获取响应状态码
console.log(this.status)
// 获取响应状态描述
console.log(this.statusText)
// 获取响应头信息
console.log(this.getResponseHeader('Content‐Type')) // 指定响应头
console.log(this.getAllResponseHeader()) // 全部响应头
// 获取响应体
console.log(this.responseText) // 文本形式
console.log(this.responseXML) // XML 形式，了解即可不用了
}
} 
```

## 3 axios

### 3.1 安装

vue本身不支持发送AJAX请求，需要使用vue-resource、axios等插件实现
axios是一个基于Promise的HTTP请求客户端，用来发送请求，也是vue2.0官方推荐的，同时不再对vue-resource进行更新和维护

axios基于promise，可以调用promise的then()和catch()等方法，看下面的例子

参考：GitHub上搜索axios，查看API文档

* npm install axios -S
  也可直接下载axios.min.js文件

### 3.2 基本用法

#### axios([config])  

```javascript
//发送post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
})
//发送get请求
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

#### axios.get(url,[config])

*  传参方式：

  * 通过url传参
    axios.get('server.php?name=tom&age=23')
    请求地址加上？后面的参数拼接

  * 通过params选项传参

    ```javascript
    	axios.get('server.php',{
    		params:{
    			name:'alice',
    			age:19
    		}
    	})
    	.then(resp => {
    		console.log(resp.data);
    	}).catch(err => {
    		console.log('请求失败：'+err.status+','+err.statusText);
    	});
    },
    ```

    

#### axios.post(url,data,[config])

​    **axios默认发送数据时，数据格式是Request Payload，并非我们常用的Form Data格式**，

所以参数必须要以键值对形式传递，不能以json形式传参

```
采用node.js中，express框架已经可以接收axios的post form data传参方式,采用req.body接收
```

* 传参方式：
          1.自己拼接为键值对
          2.使用transformRequest，在请求发送前将请求数据进行转换
          3.如果使用模块化开发，可以使用qs模块进行转换

* 案例

  ```javascript
  axios.post('server.php',{
  	name:'alice',
  	age:19
  	})
  //这种形式post传参获取不到
  
  //方案1 自己拼接为键值对
   axios.post('server.php','name=alice&age=20&')
  
  //方案2  使用transformRequest，在请求发送前将请求数据进行转换
  axios.post('server.php',this.user,{
  	//这里的this.user是vue要传递的参数，在传递前，将this.user的数据放入transformRequest的函数	//function中，将数据传给形参data
      transformRequest:[
  		function(data){
  		let params='';
  		for(let index in data){
  			params+=index+'='+data[index]+'&';
  		}
  		return params;
  		}
  	]
  })
  //方案3 如果使用模块化开发，可以使用qs模块进行转换    
  ```

**注意：**

axios本身并不支持发送跨域的请求，没有提供相应的API，作者也暂没计划在axios添加支持发送跨域请求，所以只能使用第三方库

### 3.3 优点

- 从浏览器中创建XMLHttpRequest
- 从node.js 中发出http请求
- 支持 Promise API
- 客户端支持防止CSRF（伪脚本攻击）
  -提供了并发请求API接口
- 支持请求/响应拦截
- 取消请求
  -自动转换json数据

### 3.4 axios拦截器

一般在使用axios时，会用到拦截器的功能，一般分为两种：`请求拦截器`、 `响应拦截器`。

- **请求拦截器** 在请求发送前进行必要操作处理，例如添加统一cookie、请求体加验证、设置请求头等，相当于是对每个接口里相同操作的一个封装；
- **响应拦截器** 同理，响应拦截器也是如此功能，只是在请求得到响应之后，对响应体的一些处理，例如数据统一处理，错误统一处理等，也常来判断登录失效等。

1 创建拦截器实例

```javascript
import axios from 'axios'

//  这个是常用的配置项
let baseURL;
if(process.env.NODE_ENV ==='development')
 { baseURL = 'xxx本地环境xxx';}
 else if(process.env.NODE_ENV === 'production')
{ 
   baseURL = 'xxx生产环境xxx';
}

//创建实例
let instance = axios.create({
    baseURL: 'xxxxxxxxxx',
    timeout:15000// 毫秒
})
```

2 请求拦截器

```javascript
axios.interceptors.request.use(function (request) {
    //发送请求之前配置请求项
    return request;
  }, function (error) {
    // 请求错误时的操作
    return Promise.reject(error);
  });
```

3 响应拦截器

```javascript
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```



## 4 vue-resource

### 4.1 发送跨域请求

```javascript
使用this.$http发送请求  
    this.$http.get(url, [options])
    this.$http.head(url, [options])
    this.$http.delete(url, [options])
    this.$http.jsonp(url, [options])
    this.$http.post(url, [body], [options])
    this.$http.put(url, [body], [options])
    this.$http.patch(url, [body], [options])  
```

## 5 jquery中的ajax

jQuery 中有一套专门针对 A JAX 的封装，功能十分完善，经常使用，需要着重注意。
参考：
http://www.jquery123.com/category/ajax/
http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp 

```javascript
$.ajax({
url: './get.php',
type: 'get',
dataType: 'json',
data: { id: 1 },
beforeSend: function (xhr) {
console.log('before send')
},
success: function (data) {
console.log(data)
},
error: function (err) {
console.log(err)
},
complete: function () {
console.log('request completed')
}
})
```

```
常用选项参数介绍：
url：请求地址
type：请求方法，默认为 get
dataType：服务端响应数据类型
contentType：请求体内容类型，默认 application/x-www-form-urlencoded
data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递
timeout：请求超时时间
beforeSend：请求发起之前触发
success：请求成功之后触发（响应状态码 200）
error：请求失败触发
complete：请求完成触发（不管成功与否）
```

## 6 json

### 1 概念

\* JS中的对象只有JS自己认识，其他的语言都不认识
 \* JSON就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别，
 \* 并且可以转换为任意语言中的对象，JSON在开发中主要用来数据的交互

### 2 语法

#### 2.1**语法规则**

```
JSON 语法是 JavaScript 对象表示语法的子集。
数据在名称/值对中,属性必须用双引号包起来
数据由逗号分隔大括号保存对象
中括号保存数组
```

**分类**
 1 对象{}

```
{"name":"小明"，"age":"12"}
```

2 数组[]

```
 [
 { "name":"runoob" , "url":"www.runoob.com" },
 { "name":"google" , "url":"www.google.com" }, 
 { "name":"微博" , "url":"www.weibo.com" } 
 ]
```

#### 2.2 json的值类型

数字（整数或浮点数）
 字符串（在双引号中）
 逻辑值（true 或 false）
 数组（在中括号中）
 对象（在大括号中）为普通的对象，不包含函数类的对象
 null

### 3 json格式转换

#### 3.1 js对象转json格式

JSON 通常用于与服务端交换数据。在向服务器发送数据时一般是字符串。我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串
**JSON.stringify**

```
var obj3 = {name:"猪八戒" , age:28 , gender:"男"};
var str = JSON.stringify(obj3);
console.log(str)
```

#### 3.2 json格式转js对象

**JSON.parse**

```
var json = '{"name":"孙悟空","age":18,"gender":"男"}';
var o = JSON.parse(json);
console.log(o)
```

### 4 jSON.parse和JSON.stringify兼容性

```
Firefox 3.5
Internet Explorer 8
Chrome
Opera 10
Safari 4
```

### 5 eval()函数

1. 这个函数可以用来执行一段字符串形式的JS代码，并将执行结果返回
2. 如果使用eval()执行的字符串中含有{},它会将{}当成是代码块
    3.如果不希望将其当成代码块解析，则需要在字符串前后各加一个()
    4.eval()这个函数的功能很强大，可以直接执行一个字符串中的js代码，
    5.但是在开发中尽量不要使用，首先它的执行性能比较差，然后它还具有安全隐患

### 6 json优点

对于 AJAX 应用程序来说，JSON 比 XML 更快更易使用：
**使用 XML**
 读取 XML 文档
 使用 XML DOM 来循环遍历文档
 读取值并存储在变量中
**使用 JSON**
 读取 JSON 字符串
 用 eval() 处理 JSON 字符串
**与 XML 相同之处**

JSON 是纯文本JSON 具有"自我描述性"（人类可读）JSON 具有层级结构（值中存在值）
 JSON 可通过 JavaScript 进行解析
 JSON 数据可使用 AJAX 进行传输
**与 XML 不同之处**
 没有结束标签
 更短读写的速度
 更快能够使用内建的 JavaScript eval() 方法进行解析使
 用数组不使用保留字

## 7 fetch

fetch号称是ajax的替代品，它的API是基于Promise设计的，旧版本的浏览器不支持Promise，需要使用polyfill es6-promise

举个例子：

```
// 原生XHR
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)   // 从服务器获取数据
    }
}
xhr.send()
// fetch
fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
复制代码
```

看起来好像是方便点，then链就像之前熟悉的callback。

在MDN上，讲到它跟jquery ajax的区别，这也是fetch很奇怪的地方：

> 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），  仅当网络故障时或请求被阻止时，才会标记为 reject。 默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）.

突然感觉这还不如jquery ajax好用呢？别急，再搭配上async/await将会让我们的异步代码更加优雅：

```
async function test() {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
}
复制代码
```

看起来是不是像同步代码一样？简直完美！好吧，其实并不完美，async/await是ES7的API，目前还在试验阶段，还需要我们使用babel进行转译成ES5代码。

还要提一下的是，fetch是比较底层的API，很多情况下都需要我们再次封装。 比如：

```
// jquery ajax
$.post(url, {name: 'test'})
// fetch
fetch(url, {
    method: 'POST',
    body: Object.keys({name: 'test'}).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&')
})
复制代码
```

由于fetch是比较底层的API，所以需要我们手动将参数拼接成'name=test'的格式，而jquery ajax已经封装好了。所以fetch并不是开箱即用的。

另外，fetch还不支持超时控制。

### 7.2 缺点

符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
更好更方便的写法
更加底层，提供的API丰富（request, response）
脱离了XHR，是ES规范里新的实现方式
1）fetchtch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
2）fetch默认不会带cookie，需要添加配置项
3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
4）fetch没有办法原生监测请求的进度，而XHR可以

