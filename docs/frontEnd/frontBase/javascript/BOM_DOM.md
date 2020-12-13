#  javascript ----------DOM&BOM

## 1 DOM

### 1 事件

#### 1.1 事件流

事件流是指从页面中接收事件的顺序，在IE和netscape中事件流是不一样的，在ie中为事件冒泡，在Netscape 中为事件捕获

#### 1.2 事件冒泡

所谓的冒泡指的就是事件的向上传导，当子节点的事件被触发时，事件逐级向上传播到较为不具体的节点。

![img](https://segmentfault.com/img/remote/1460000012729085)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			#box1{
				width: 200px;
				height: 200px;
				background-color: yellowgreen;
			}			
			#s1{
				background-color: yellow;
			}			
		</style>
		<script type="text/javascript">			
			window.onload = function(){				
				//为s1绑定一个单击响应函数
				var s1 = document.getElementById("s1");
				s1.onclick = function(event){
					event = event || window.event;
					alert("我是span的单击响应函数");					
					//取消冒泡
					//可以将事件对象的cancelBubble设置为true，即可取消冒泡
					event.cancelBubble = true;
				};				
				//为box1绑定一个单击响应函数
				var box1 = document.getElementById("box1");
				box1.onclick = function(event){
					event = event || window.event;
					alert("我是div的单击响应函数");
					
					event.cancelBubble = true;
				};			
				//为body绑定一个单击响应函数
				document.body.onclick = function(){
					alert("我是body的单击响应函数");
				};				
			};			
		</script>
	</head>
	<body>	
		<div id="box1">
			我是box1
			<span id="s1">我是span</span>
		</div>	
	</body>
</html>
```

取消事件冒泡：

event.cancelBubble=true  ie浏览器

event.stopPropagation()   w3c标准

DOM中提供preventDefault()方法来取消事件默认行为，但是只有当cancelable属性设置为true的事件，才可以使用preventDefault()来取消事件默认行为，使用event对象在事件函数中调用就行。  

IE中提供的是returnValue属性，默认为true，当它设置为false时，就是取消事件默认行为，也是用event对象在事件函数中调用

#### 1.3 事件捕获

是一种自顶向下的事件类型，从DOM层次的顶端沿着子节点依次向下延伸，直到目标节点

![img](https://segmentfault.com/img/remote/1460000012729086)

#### 1.4 DOM事件流



DOM2级事件”规定事件流包括三个阶段，事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的事件捕获，捕获阶段不会触发事件。然后是实际的目标接收了事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。

![img](https://segmentfault.com/img/remote/1460000012729087?w=664&h=343)

```
 事件的传播
				 - 关于事件的传播网景公司和微软公司有不同的理解
				 - 微软公司认为事件应该是由内向外传播，也就是当事件触发时，应该先触发当前元素上的事件，
				 * 		然后再向当前元素的祖先元素上传播，也就说事件应该在冒泡阶段执行。
				 *  - 网景公司认为事件应该是由外向内传播的，也就是当前事件触发时，应该先触发当前元素的最外层的祖先元素的事件，
				 * 		然后在向内传播给后代元素
				 * 	- W3C综合了两个公司的方案，将事件传播分成了三个阶段
				 * 		1.捕获阶段
				 * 			- 在捕获阶段时从最外层的祖先元素，向目标元素进行事件的捕获，但是默认此时不会触发事件
				 * 		2.目标阶段
				 * 			- 事件捕获到目标元素，捕获结束开始在目标元素上触发事件
				 * 		3.冒泡阶段
				 * 			- 事件从目标元素向他的祖先元素传递，依次触发祖先元素上的事件
				 * 
				 * 	- 如果希望在捕获阶段就触发事件，可以将addEventListener()的第三个参数设置为true
				 * 			一般情况下我们不会希望在捕获阶段触发事件，所以这个参数一般都是false
				 * 
				 * 	- IE8及以下的浏览器中没有捕获阶段
```

#### 1.5 事件委托（事件代理）

这就是所谓的事件委托，通过监听一个父元素，来给不同的子元素绑定事件，减少监听次数，从而提升速度。是JavaScript中绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定在子元素的响应事件（click、keydown......）委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。

优点：

【1】可以大量节省内存占用，减少事件注册，比如在ul上代理所有li的click事件就非常棒**

**【2】可以实现当新增子对象时无需再次对其绑定（动态绑定事件）**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script type="text/javascript">			
			window.onload = function(){				
				var u1 = document.getElementById("u1");
				//点击按钮以后添加超链接
				var btn01 = document.getElementById("btn01");
				btn01.onclick = function(){
					//创建一个li
					var li = document.createElement("li");
					li.innerHTML = "<a href='javascript:;' class='link'>新建的超链接</a>";
					
					//将li添加到ul中
					u1.appendChild(li);
				};
				/*
				 * 为每一个超链接都绑定一个单击响应函数
				 * 这里我们为每一个超链接都绑定了一个单击响应函数，这种操作比较麻烦，
				 * 	而且这些操作只能为已有的超链接设置事件，而新添加的超链接必须重新绑定
				 */
				//获取所有的a
				var allA = document.getElementsByTagName("a");
				//遍历
				/*for(var i=0 ; i<allA.length ; i++){
					allA[i].onclick = function(){
						alert("我是a的单击响应函数！！！");
					};
				}*/			
				/*
				 * 我们希望，只绑定一次事件，即可应用到多个的元素上，即使元素是后添加的
				 * 我们可以尝试将其绑定给元素的共同的祖先元素
				 * 
				 * 事件的委派
				 * 	- 指将事件统一绑定给元素的共同的祖先元素，这样当后代元素上的事件触发时，会一直冒泡到祖先元素
				 * 		从而通过祖先元素的响应函数来处理事件。
				 *  - 事件委派是利用了冒泡，通过委派可以减少事件绑定的次数，提高程序的性能
				 */				
				//为ul绑定一个单击响应函数
				u1.onclick = function(event){
					event = event || window.event;				
					/*
					 * target
					 * 	- event中的target表示的触发事件的对象
					 */
					//alert(event.target);				
					//如果触发事件的对象是我们期望的元素，则执行否则不执行
					if(event.target.className == "link"){
						alert("我是ul的单击响应函数");
					}					
				};				
			};			
		</script>
	</head>
	<body>
		<button id="btn01">添加超链接</button>
		
		<ul id="u1" style="background-color: #bfa;">
			<li>
				<p>我是p元素</p>
			</li>
			<li><a href="javascript:;" class="link">超链接一</a></li>
			<li><a href="javascript:;" class="link">超链接二</a></li>
			<li><a href="javascript:;" class="link">超链接三</a></li>
		</ul>
		
	</body>
</html>
```

#### 1.6 事件绑定

* 方式1---绑定单个函数

  ​	

* 方式2 ----绑定多个函数
  addEventListener
  这个方法不支持IE8及以下的浏览器

  ```shell
  				 * addEventListener()
  				 * 	- 通过这个方法也可以为元素绑定响应函数
  				 *  - 参数：
  				 * 		1.事件的字符串，不要on
  				 * 		2.回调函数，当事件触发时该函数会被调用
  				 * 		3.是否在捕获阶段触发事件，需要一个布尔值，一般都传false
  				 * 
  				 * 使用addEventListener()可以同时为一个元素的相同事件同时绑定多个响应函数，
  				 * 	这样当事件被触发时，响应函数将会按照函数的绑定顺序执行
  				 
  ```

  ```javascript
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="utf-8" />
  		<title></title>
  		<script type="text/javascript">			
  			window.onload = function(){				
                  var btn01 = document.getElementById("btn01");
                  var btn02=document.getElementById('btn02')
                  // btn01.onclick=function (){
                  //     alert('1')
                  // }              
  				// btn02.onclick=function (){
                  //     alert('2')
                  // }
                  btn01.addEventListener('click',function(){
                      alert('1')
                  },true)
                  btn02.addEventListener('click',function(){
                      alert('2')
                  },true)
  			};			
  		</script>
  	</head>
  	<body>
  		<div id='btn01'>
              <div id='btn02'> hah</div>
          </div>
  	</body>
  </html>
  ```

  attachEvent()

  在IE8中可以使用attachEvent()来绑定事件

  ```
  参数：
  				 * 		1.事件的字符串，要on
  				 * 		2.回调函数
  				 * 
  				 *  - 这个方法也可以同时为一个事件绑定多个处理函数，
  				 * 		不同的是它是后绑定先执行，执行顺序和addEventListener()相反
  				 btn01.attachEvent("onclick",function(){
  					alert(1);
  				});
  ```

* 兼容性问题

  ```javascript
  function bind(obj , eventStr , callback){
  				if(obj.addEventListener){
  					//大部分浏览器兼容的方式
  					obj.addEventListener(eventStr , callback , false);
  				}else{
  					/*
  					 * this是谁由调用方式决定
  					 * callback.call(obj)
  					 */
  					//IE8及以下
  					obj.attachEvent("on"+eventStr , function(){
  						//在匿名函数中调用回调函数
  						callback.call(obj);
  					});
  				}
  			}
  ```

### 2 事件对象

在触发dom上的某个事件时，会产生一个事件对象event，这个对象包含这所有与事件有关的信息。

在触发的事件的函数里面我们会接收到一个event对象,通过该对象我们需要的一些参数,比如说我们需要知道此事件作用到谁身上了,就可以通过event的属性`target`来获取到(IE暂且不谈),或者想阻止浏览器的默认行为可以通过方法`preventDefault()`来进行阻止.以下是event对象的一些属性和方法

#### 2.1 属性

| 属性          | 描述                                         |
| ------------- | -------------------------------------------- |
| altKey        | 返回当事件被触发时，”ALT” 是否被按下。       |
| button        | 返回当事件被触发时，哪个鼠标按钮被点击。     |
| clientX       | 返回当事件被触发时，鼠标指针的水平坐标。     |
| clientY       | 返回当事件被触发时，鼠标指针的垂直坐标。     |
| ctrlKey       | 返回当事件被触发时，”CTRL” 键是否被按下。    |
| metaKey       | 返回当事件被触发时，”meta” 键是否被按下。    |
| relatedTarget | 返回与事件的目标节点相关的节点。             |
| screenX       | 返回当某个事件被触发时，鼠标指针的水平坐标。 |
| screenY       | 返回当某个事件被触发时，鼠标指针的垂直坐标。 |
| shiftKey      | 返回当事件被触发时，”SHIFT” 键是否被按下。   |

- `IE` 属性(除了上面的鼠标/事件属性，IE 浏览器还支持下面的属性)

| 属性            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| `cancelBubble`  | 如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。 |
| fromElement     | 对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。 |
| keyCode         | 对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup |
| offsetX,offsetY | 发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。   |
| `returnValue`   | 如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为 |
| `srcElement`    | 对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。 |
| toElement       | 对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素。  |
| x,y             | 事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素。 |

#### 2.2 标准属性方法

- 标准 Event 属性 下面列出了 2 级 DOM 事件标准定义的属性。

| 属性和方法          | 描述                                           |
| ------------------- | ---------------------------------------------- |
| bubbles             | 返回布尔值，指示事件是否是起泡事件类型。       |
| `cancelable`        | 返回布尔值，指示事件是否可拥可取消的默认动作。 |
| `currentTarget`     | 返回其事件监听器触发该事件的元素。             |
| eventPhase          | 返回事件传播的当前阶段。                       |
| `target`            | 返回触发此事件的元素（事件的目标节点）。       |
| timeStamp           | 返回事件生成的日期和时间。                     |
| `type`              | 返回当前 Event 对象表示的事件的名称。          |
| initEvent()         | 初始化新创建的 Event 对象的属性。              |
| `preventDefault()`  | 通知浏览器不要执行与事件关联的默认动作。       |
| `stopPropagation()` | 不再派发事件。                                 |

#### 2.3 兼容性写法

- 获得event对象兼容性写法 
  `event || (event = window.event);`
- 获得target兼容型写法 
  `event.target||event.srcElement`
- 阻止浏览器默认行为兼容性写法 
  `event.preventDefault ? event.preventDefault() : (event.returnValue = false);`
- 阻止冒泡写法 
  `event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);`
- 注册和删除事件方法的形式

```javascript
1.// 绑定事件.
2.function on(id, eventType, fn) {
3.    var dom = this.isString(id) ? this.$id(id) : id;
4.    if(dom.addEventListener) {
5.        dom.addEventListener(eventType, fn);
6.    } else {
7.        if(dom.attachEvent) {
8.            dom.attachEvent('on' + eventType, fn);
9.        }
10.    }
11.},
12.// 解除绑定
13.function un(id, eventType, fn) {
14.    var dom = this.$id(id);
15.    if(dom.removeEventListener) {
16.        dom.removeEventListener(eventType, fn, false);
17.    } else {
18.        if(dom.detachEvent) {
19.            dom.detachEvent("on" + eventType, fn)
20.        }
21.    }
22.
23.}
```

### 3 事件类型

#### 鼠标事件

mouseover mouseouer

元素内部有子元素，进入和离开子元素也会触发这两个事件

mouseenter mouseleave

元素内部有子元素不会触发，只在进入这个元素和离开时触发

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<style>
    body {
        margin-top: 100px;
        margin-left: 100px;
    }

    .father {
        width: 200px;
        height: 200px;
        background-color: blue;
        overflow: hidden;
    }

    .son {
        width: 100px;
        height: 100px;
        background-color: red;
        margin: 50px 50px;
    }
</style>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        var father = document.getElementsByClassName('father')[0]
        var son = document.getElementsByClassName('son')[0]

        // father.addEventListener('mouseover', function () {
        //     console.log('进去')

        // })
        // father.addEventListener('mouseout', function () {
        //     console.log('出去')

        // })
        father.addEventListener('mouseenter', function () {
            console.log('进去')

        })
        father.addEventListener('mouseleave', function () {
            console.log('出去')

        })      
    </script>
</body>

</html>
```



## 2 Dom树

DOM树中总共分为如下几种节点格式：Element类型（元素节点）、Text类型（文本节点）、Comment类型（注释节点）、Document类型（document节点）。

## 3 Dom对象

| getElementsByTagName() | 返回带有指定标签名的对象的集合 |
| ---------------------- | ------------------------------ |
|                        |                                |
| querySelector          | 这个查一下                     |
|                        |                                |

## 4 DOM操作



# 2 浏览器BOM

浏览器对象：

* window
* navigator
* location
* history
* screen

## 1 navigator

代表的当前浏览器的信息，通过该对象可以来识别不同的浏览器

```
由于历史原因，Navigator对象中的大部分属性都已经不能帮助我们识别浏览器了
一般我们只会使用userAgent来判断浏览器的信息，
			 * 		userAgent是一个字符串，这个字符串中包含有用来描述浏览器信息的内容，
			 * 		不同的浏览器会有不同的userAgent
			 * 
			 * 火狐的userAgent
			 * 	Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0
			 * 
			 * Chrome的userAgent
			 *  Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36
			 * 
			 * IE8
			 * 	Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
			 * 
			 * IE9
			 * 	Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
			 * 
			 * IE10
			 * 	Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
			 * 
			 * IE11
			 * 	Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko
			 * 	- 在IE11中已经将微软和IE相关的标识都已经去除了，所以我们基本已经不能通过UserAgent来识别一个浏览器是否是IE了
```

判断浏览器类型：

```javascript
var ua = navigator.userAgent;
			
			console.log(ua);
			
			if(/firefox/i.test(ua)){
				alert("你是火狐！！！");
			}else if(/chrome/i.test(ua)){
				alert("你是Chrome");
			}else if(/msie/i.test(ua)){
				alert("你是IE浏览器~~~");
			}else if("ActiveXObject" in window){
				alert("你是IE11，枪毙了你~~~");
			}
			
```

## 2 history

保存用户上网的历史记录，从窗口被打开的那一刻算起。由于安全原因，不能获取具体的url，只能实现页面的前进和后退

属性：length

方法：go()   back()  forword()

```
//后退一页
history.go(-1)
//前进一页
history.go(1)
//可接收字符串，跳转到历史记录的最近位置
history.go("google.com")
//向前一页
history.forword()
//向后一页
history.back()
```

## 3 Location

该对象中封装了浏览器的地址栏的信息

属性：	

| [hash](http://www.runoob.com/jsref/prop-loc-hash.html)       | 返回一个URL的锚部分           |
| ------------------------------------------------------------ | ----------------------------- |
| [host](http://www.runoob.com/jsref/prop-loc-host.html)       | 返回一个URL的主机名和端口     |
| [hostname](http://www.runoob.com/jsref/prop-loc-hostname.html) | 返回URL的主机名               |
| [href](http://www.runoob.com/jsref/prop-loc-href.html)       | 返回完整的URL                 |
| [pathname](http://www.runoob.com/jsref/prop-loc-pathname.html) | 返回的URL路径名。             |
| [port](http://www.runoob.com/jsref/prop-loc-port.html)       | 返回一个URL服务器使用的端口号 |
| [protocol](http://www.runoob.com/jsref/prop-loc-protocol.html) | 返回一个URL协议               |
| [search](http://www.runoob.com/jsref/prop-loc-search.html)   | 返回一个URL的查询部分         |

```
详情查看javascript高级程序设计207页
```

方法：

assign(网址)

reload(网址)

replace(网址)	

```javascript
var btn = document.getElementById("btn");
				
				btn.onclick = function(){
					
					//如果直接打印location，则可以获取到地址栏的信息（当前页面的完整路径）
					//alert(location);
					
					
					 // * 如果直接将location属性修改为一个完整的路径，或相对路径
					 // * 	则我们页面会自动跳转到该路径，并且会生成相应的历史记录
					 
					//location = "http://www.baidu.com";
					//location = "01.BOM.html";
					
					/*
					 * assign()
					 * 	- 用来跳转到其他的页面，作用和直接修改location一样
					 */
					//location.assign("http://www.baidu.com");
                    //location.ref("http://www.baidu.com");
					
					/*
					 * reload()
					 * 	- 用于重新加载当前页面，作用和刷新按钮一样
					 * 	- 如果在方法中传递一个true，作为参数，则会强制清空缓存刷新页面
					 */
					//location.reload(true);从服务器中加载，不会加载缓存
					
					/*
					 * replace()
					 * 	- 可以使用一个新的页面替换当前页面，调用完毕也会跳转页面
					 * 		不会生成历史记录，不能使用回退按钮回退
					 */
					location.replace("01.BOM.html");
					
				};
```

## 4 screen

## 5 window

### 5定时器

并不是到了哪个时间就执行，**而是到了那个时间把任务加入到异步事件队列中**。

#### 5.1 setTimeout()

setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式

```
setTimeout(code, milliseconds, param1, param2, ...)
```

参数第一个为回调函数，第二个为时间，后面的参数为传入回调函数的参数

clearTimeout() 方法可取消由setTimeout()方法设置的定时操作。

clearTimeout() 方法的参数必须是由 setTimeout() 返回的 ID 值。

```javascript
var myVar;
 
function myFunction() {
    myVar = setTimeout(function(){ alert("Hello") }, 3000);
}
 
function myStopFunction() {
    clearTimeout(myVar);
}
```

#### 5.2 setInterval()

etInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式

setInterval() 方法会不停地调用函数，直到clearInterval()被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数

参数第一个为回调函数，第二个为时间,表示每隔多少时间执行一次，后面的参数为传入回调函数的参数

#### 5.3 对比

setTimeout() 只执行 code 一次。如果要多次调用，请使用 setInterval() 或者让 code 自身再次调用 setTimeout()

setTimeout执行时间不准确

```javascript
console.log('1')
setTimeout(function () {
  console.log('2')
  
}, 0)
console.log('3')
```

settimeout属于异步任务的宏任务，执行的时候要先等同步任务执行完毕之后再执行异步任务，异步任务又分为宏任务和微任务，微任务优先执行，执行完毕才会执行宏任务

#### 5.4 this

定时器中的this指向window