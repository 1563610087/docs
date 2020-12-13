前端性能优化

## 1 资源合并与压缩

### html压缩

​	HTML的全称是超文本标记语言，HTML网页本身是一种文本文件，通过在文件中添加标记符，可以告诉浏览器如何显示其中的内容，包括文字大小，颜色，图片显示等等。这就意味着在文本文件中的一些特定意义的字符可以在浏览器显示的时候就不一样了，HTML代码压缩就是压缩这些在文本文件中有意义，但是在HTML中不显示的字符，包括空格，制表符，换行符等，还有一些其他意义的字符，如HTML注释也可以被压缩。

* 案例：
  * 新浪首页----源代码未压缩，查看网页源代码可以看到清晰的代码结构
  * 谷歌首页----源代码压缩，去掉多余的空格及字符
* 压缩方法
  * 使用在线网站进行压缩----实际工作中不使用，一般采用框架开发，有打包工具
  * nodejs提供了html-minifier工具
  * 后端模板引擎渲染压缩

###css压缩

* 无效代码删除

 * css语义合并

   * 压缩方法

     1.使用在线网站进行压缩

     2.使用html-minifier对html中的css进行压缩

     3.使用clean-css对css进行压缩

###js的压缩和混乱

* 无效字符的删除------空格-回车等格式

* 剔除注释

* 代码语义的缩减和优化-----例如变量长度减少，happy变成h

* 代码保护

  * 压缩方法

    1.使用在线网站进行压缩

    2.使用html-minifier对html中的js进行压缩

    3.使用uglifyjs2对js进行压缩

###文件合并

将多个文件合并成一个文件，减少http请求次数

![1553256219974](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553256219974.png)

* 文件与文件之间有插入的上行请求，增加了N-1个网络延迟受

* 丢包问题影响更严重

* 经过代理服务器时可能会被断开

**文件合并出现的问题：**

* 首屏渲染问题
  * 一些网页在加载资源过程中，假设首页依赖某个文件，在未合并之前，文件能快速请求到，并迅速渲染首页，合并之前，资源比较大，请求时间较长，首屏渲染比较慢

* 缓存失效问题
  * 文件在压缩打包之后，假设a文件有所改动，合并文件之后整个文件的缓存失效，未合并的情况下只有a文件失效，其他文件缓存没有失效

###开启gzip

### fis3前端性能优化工具

FIS3 是面向前端的工程构建工具。解决前端工程中性能优化、资源加载（异步、同步、按需、预加载、依赖管理、合并、内嵌）、模块化开发、自动化工具、开发规范、代码部署等问题。

<http://fis.baidu.com/fis3/docs/beginning/intro.html>



## 2 图片的优化

### 图片的格式

* jpg有损压缩，压缩率高，不支持透明

* png支持透明，浏览器兼容好
  * png8 —— 256色 + 支持透明
  * png24 —— 2^24色 + 不支持透明
  * png32 —— 2^24色 + 支持透明 

* webp压缩程度更好，在ios webview有兼容性问题 

* svg矢量图，代码内嵌，相对较小，图片样式相对简单的场景
  * 字体图标及其他图标
  * 阿里巴巴矢量图

### 方法

 * CSS雪碧图-精灵图-sprite
    * 把网站上用到的一些图片整合到一张单独的图片中，减少网站的HTTP请求数量
 * Image inline
    * 将图片的内容内嵌到html当中，减少你的网站的HTTP请求数量
* 使用矢量图
  * 使用SVG进行矢量图的绘制，使用iconfont解决icon问题
* 在安卓下使用webp---手机淘宝采用大量的这种格式
  * WebP
    的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都非常优秀、稳定和统一
* 将图片采用，方式转码，可以内嵌到代码中----手机淘宝的淘字
* 图片压缩及图片格式的合理使用

## 3 css和js装载和执行

### HTML渲染

* 流程

  ![1553259727240](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553259727240.png)

* 特点

  * 顺序执行、并发加载
    * 词法分析
    * 并发加载
    * 并发上限
  * 是否阻塞
    * css阻塞
      * css head中阻塞页面的渲染   
      * css阻塞js的执行
      * css不阻塞外部脚本的加载
    * js阻塞
      * 直接引入的js阻塞页面的渲染
      * js不阻塞资源的加载
      * js顺序执行，阻塞后续js逻辑的执行
  * 依赖关系
  * 引入方式

### 优化点

* css 样式表置顶
* 用 link 代替 import
* js 脚本置底
* 合理使用 js 的异步加载能力

## 4 懒加载和预加载

### 4.1 懒加载

#### 1 定义

**懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式**。用户滚动到它们之前，可视区域外的图像不会加载。这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。在某些情况下，它还可以帮助减少服务器负载。常适用图片很多，页面很长的电商网站场景中。

#### 2.优点

- **能提升用户的体验**，不妨设想下，用户打开像手机淘宝长页面的时候，如果页面上所有的图片都需要加载，由于图片数目较大，等待时间很长，用户难免会心生抱怨，这就严重影响用户体验。
- **减少无效资源的加载**，这样能明显减少了服务器的压力和流量，也能够减小浏览器的负担。
- **防止并发加载的资源过多会阻塞js的加载**，影响网站的正常使用。

#### 3.原理

首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中，
当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载。

#### 4.懒加载实现步骤

```
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lazyload</title>
    <style>
      .image-item {
	    display: block;
	    margin-bottom: 50px;
	    height: 200px;//一定记得设置图片高度
	}
    </style>
</head>
<body>
<img src="" class="image-item" lazyload="true"  data-original="images/1.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/2.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/3.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/4.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/5.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/6.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/7.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/8.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/9.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/10.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/11.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/12.png"/>
<script>
var viewHeight =document.documentElement.clientHeight//获取可视区高度
function lazyload(){
var eles=document.querySelectorAll（'img[data-original][lazyload]'）
Array.prototype.forEach.call(eles,function(item,index){
var rect
if(item.dataset.original==="")
   return
rect=item.getBoundingClientRect()// 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
if(rect.bottom>=0 && rect.top < viewHeight){
!function(){
  var img=new Image()
  img.src=item.dataset.original
  img.onload=function(){
    item.src=img.src
    }
item.removeAttribute（"data-original"）//移除属性，下次不再遍历
item.removeAttribute（"lazyload"）
   }()
  }
 })
}
lazyload()//刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
document.addEventListener（"scroll"，lazyload)
</script>
</body>
</html>
```

### 4.2 预加载

#### 1.定义

资源预加载是另一个性能优化技术，我们可以使用该技术来预先告知浏览器某些资源可能在将来会被使用到。**预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源**。

#### 2.使用场景

在网页全部加载之前，对一些主要内容进行加载，以提供给用户更好的体验，减少等待的时间。否则，如果一个页面的内容过于庞大，没有使用预加载技术的页面就会长时间的展现为一片空白，直到所有内容加载完毕。

#### 3.实现方法

1 使用HTML标签

```html
<img src="http://pic26.nipic.com/20121213/6168183 0044449030002.jpg" style="display:none"/>
```

2 使用Image对象

```html
<script src="./myPreload.js"></script>
```

```html
//myPreload.js文件
var image= new Image()
image.src="http://pic26.nipic.com/20121213/6168183 004444903000 2.jpg"
```

3 使用XMLHttpRequest对象,虽然存在跨域问题，但会精细控制预加载过程

```html
var xmlhttprequest=new XMLHttpRequest();
xmlhttprequest.onreadystatechange=callback;
xmlhttprequest.onprogress=progressCallback;
xmlhttprequest.open("GET","http://image.baidu.com/mouse,jpg",true);
xmlhttprequest.send();
function callback(){
  if(xmlhttprequest.readyState==4&& xmlhttprequest.status==200){
    var responseText=xmlhttprequest.responseText;
  }else{
     console.log("Request was unsuccessful:"+xmlhttprequest.status);
  }
}
function progressCallback(e){
e=e || event;
if(e.lengthComputable){
console.log("Received"+e.loaded+"of"+e.total+"bytes")
}
}
```

4 使用[PreloadJS库](https://createjs.com/preloadjs)

PreloadJS提供了一种预加载内容的一致方式，以便在HTML应用程序中使用。预加载可以使用HTML标签以及XHR来完成。默认情况下，PreloadJS会尝试使用XHR加载内容，因为它提供了对进度和完成事件的更好支持，但是由于跨域问题，使用基于标记的加载可能更好。

```
//使用preload.js
var queue=new createjs.LoadQueue();//默认是xhr对象，如果是new createjs.LoadQueue(false)是指使用HTML标签，可以跨域
queue.on("complete",handleComplete,this);
queue.loadManifest([
{id:"myImage",src:"http://pic26.nipic.com/20121213/6168183  0044449030002.jpg"},
{id："myImage2"，src:"http://pic9.nipic.com/20100814/2839526  1931471581702.jpg"}
]);
function handleComplete(){
  var image=queue.getResuLt("myImage");
  document.body.appendChild(image);
}
```

## 5 重绘与回流

###回流（reflow）

####概念

当页面元素的尺寸大小，布局，隐藏等属性改变导致render tree需要重新构建，浏览器重新渲染页面，这个过程就称为回流

#### 触发

* 盒子模型相关属性会触发重布局

  * •width 

    •height

    •padding

    •margin

    •display

    •border-width

    •border

    •min-height

* 定位属性及浮动也会触发重布局

  * •top

    •bottom

    •left

    •right

    •position

    •float

    •clear

* 改变节点内部文字结构也会触发重布局

  * •text-align

    •overflow-y

    •font-weight

    •overflow

    •font-family

    •line-height

    •vertival-align

    •white-space

    •font-size

### 重绘

* 当页面中的一些元素发生变化，而这些属性只是影响元素的外观，样式，而不会影响布局的，浏览器不需要重新构建render tree，重新进行页面的渲染，这个过程就是重绘。

* 触发

  * •color

    •border-style

    •border-radius

    •visibility

    •text-decoration

    •background

    •background-image

    •background-position

    •background-repeat

    •background-size

    •outline-color

    •outline

    •outline-style

    •outline-width

    •box-shadow

**回流必将引起重绘，重绘不一定会引起回流**

### 解决方式

* 避免使用触发重绘、回流的css属性，用其他的属性替代

* 将频繁重绘与回流的DOM元素放在一个单独的图层之中，减少重绘回流的时间。图层过多会增加计算量，图层重组会消耗性能

  **chrome创建图层的条件**

   * 3D或透视变换CSS属性
   * 使用加速视频解码的`<vidio>`节点
   * 拥有3D(WebGL)上下文或加速的2D上下文的`<canvas>`节点
   * 混合插件（flash）
   * 对自己的opacity做css动画或者使用一个动画webkit变换元素
   * 拥有加速css过滤器的元素
   * 元素有一个包含复合层的后代节点
   * 元素有一个z-index较低且包含一个复合层的兄弟元素

* 实际项目优化点
  1. 用tanslate替代top改变
  2. 用opacity替代visibility
  3. 不要一条一条修改DOM，预先定义好class，然后修改DOW的className
  4. 不要把DOM节点的属性值放在一个循环里当成循环的变量
  5. 不要使用table布局，一个小的改动会造成整个table的重新布局
  6. 动画实现的速度选择
  7. 对于动画新建图层
  8. 启用GPU硬件加速

## 6 浏览器存储

###cookie

![1553321978230](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553321978230.png)

生成方式：

1. http response header中的set-cookie

2. js中可以通过document.cookie可以读写cookie

作用：

1. 用户浏览器和服务端的交互---维护客户端状态
   * 客户端向服务端发送http请求时，http请求是无状态的，请求结束就断开连接，当再次发送请求时，服务端不能判断该请求和之前的请求来自同一客户端，所以需要用cookie维持客户端状态。例如网站用户的登录信息，使用cookie保持该网站一直保持登录状态
   * cookie由服务端生成返回给客户端，保存在浏览器的cookie存储里，当客户端再次发送请求时，http请求会带上cookie，服务端就可以分辨这个 http来自哪个客户端
2. 客户端自身数据的存储

* cookie存储的限制
  1. 作为浏览器存储，大小4kb左右
  2. 需要设置过期时间expire
  3. httponly 不支持js读写，防止黑客攻击
  4. 同一个域名下发送http请求都会携带cookie，不是每个请求都需要cookie，例如请求js css文件，这样会产生大量cdn的流量损耗，解决方法是cdn的域名和主站的域名分开

### LocalStorage

* 特点
  * HTML5设计出来专门用于浏览器存储的
  * 大小为5M左右
  * 仅在客户端使用，不和服务端进行通信
  * 接口封装较好
  * 浏览器本地缓存方案

### SessionStorage

* 特点
  * 会话级别的浏览器存储
  * 大小为5M左右
  * 仅在客户端使用，不和服务端进行通信
  * 接口封装较好
  * 对于表单信息的维护

### IndexedDB

* 特点
  * IndexedDB
    是一种低级API，用于客户端存储大量结构化数据。该API使用索引来实现对该数据的高性能搜索。虽然 Web Storage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。IndexedDB提供了一个解决方案。
  * 为应用创建离线版本

### Service Workers

* ServiceWorker 是一个脚本，浏览器独立于当前网页，将其在后台运行,为实现一些不依赖页面或者用户交互的特性打开了一扇大门。在未来这些特性将包括推送消息,背景后台同步， geofencing（地理围栏定位），但它将推出的第一个首要特性，就是拦截和处理网络请求的能力，包括以编程方式来管理被缓存的响应。
* 应用
  1. 使用拦截和处理网络请求的能力，去实现一个离线应用
  2. 使用Service Worker在后台运行同时能和页面通信的能力，去实现大规模后台数据的处理
* 生命周期
  * ![1553327381599](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553327381599.png)
* chrome://serviceworker-internals/
* chrome://inspect/#service-workers
* 案例淘宝网

### PWA

PWA(Progressive Web Apps) 是一种WebApp 新模型，并不是具体指某一种前沿的技术或者某一个单一的知识点，我们从英文缩写来看就能看出来，这是一个渐进式的WebApp，是通过一系列新的Web特性，配合优秀的
UI 交互设计，逐步的增强 Web App 的用户体验

* 可靠：在没有网络的环境中也能提供基本的页面访问，而不会出现“未连接到互联网”的页面。
* 快速：针对网页渲染及网络数据访问有较好优化
* 融入（Engaging）：应用可以被增加到手机桌面，并且和普通应用一样有全屏、推送等特性

ulighthouse
（下载地址：https://lavas.baidu.com/doc-assets/lavas/vue/more/downloads/lighthouse_2.1.0_0.zip）

## 7 缓存

###httpheader配置缓存信息

cache-control-request-response

* 属性max-age
  * 缓存有效时间，在此期间可以读取缓存
* x-maxage
  * 指定缓存时间，设置public缓存，可从CDN读取
* no-cache
  * 请求去服务端，通过服务端判断缓存是否过期
* no-store
  * 完全不使用缓存
* expires
  * http1.0属性，设置缓存过期期间，读取缓存不会发送请求到服务端
* Last-Modified---if-modified-since
  * 
* ETag

### 分级缓存策略

![1553395972699](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553395972699.png)

 ## 8 服务端性能优化

1  服务端渲染

2  客户端渲染

## 9 函数的防抖和节流

在进行窗口的resize、scroll，输入框内容校验等操作时，如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用debounce（防抖）和throttle（节流）的方式来减少调用频率，同时又不影响实际效果。

函数防抖

函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。如下图，持续触发scroll事件时，并不执行handle函数，当1000毫秒内没有触发scroll事件时，才会延时触发scroll事件。

```javascript
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if(timeout !== null) 
                clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));
```

函数节流

函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。节流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，秉着勤俭节约的优良传统美德，我们要把水龙头关小点，最好是如我们心意按照一定规律在某个时间间隔内一滴一滴的往下滴。如下图，持续触发scroll事件时，并不立即执行handle函数，每隔1000毫秒才会执行一次handle函数

```javascript
//时间戳
var throttle = function(func, delay) {
            var prev = Date.now();
            return function() {
                var context = this;
                var args = arguments;
                var now = Date.now();
                if (now - prev >= delay) {
                    func.apply(context, args);
                    prev = Date.now();
                }
            }
        }
        function handle() {
            console.log(Math.random());
        }
        window.addEventListener('scroll', throttle(handle, 1000));
```

```javascript
//定时器

var throttle = function(func, delay) {
            var timer = null;
            return function() {
                var context = this;
                var args = arguments;
                if (!timer) {
                    timer = setTimeout(function() {
                        func.apply(context, args);
                        timer = null;
                    }, delay);
                }
            }
        }
        function handle() {
            console.log(Math.random());
        }
        window.addEventListener('scroll', throttle(handle, 1000));
```

## 10 使用CDN

大型Web应用对速度的追求并没有止步于仅仅利用浏览器缓存，因为浏览器缓存始终只是为了提升二次访问的速度，对于首次访问的加速，我们需要从网络层面进行优化，最常见的手段就是CDN（Content Delivery Network，内容分发网络）加速。**通过将静态资源(例如javascript，css，图片等等）缓存到离用户很近的相同网络运营商的CDN节点上，不但能提升用户的访问速度，还能节省服务器的带宽消耗，降低负载。**

CDN是怎么做到加速的呢？

其实这是CDN服务商在全国各个省份部署计算节点，CDN加速将网站的内容缓存在网络边缘,不同地区的用户就会访问到离自己最近的相同网络线路上的CDN节点，当请求达到CDN节点后，节点会判断自己的内容缓存是否有效，如果有效，则立即响应缓存内容给用户，从而加快响应速度。如果CDN节点的缓存失效，它会根据服务配置去我们的内容源服务器获取最新的资源响应给用户，并将内容缓存下来以便响应给后续访问的用户。**因此，一个地区内只要有一个用户先加载资源，在CDN中建立了缓存，该地区的其他后续用户都能因此而受益**。