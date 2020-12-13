# html基础

软件的架构：

C/S，客户端/服务端

B/S，浏览器/服务器

## 1 浏览器内核             

```
浏览器内核又可以分成两部分：渲染引擎(layout engineer 或者 Rendering Engine)和 JS 引擎。
渲染引擎 它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
JS 引擎 则是解析 Javascript 语言，执行 javascript语言来实现网页的动态效果。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。有一个网页标准计划小组制作了一个 ACID 来测试引擎的兼容性和性能。内核的种类很多，如加上没什么人使用的非商业的免费内核，可能会有10多种，但是常见的浏览器内核可以分这四种：Trident、Gecko、Blink、Webkit。
```

（1）Trident(IE内核) 

国内很多的双核浏览器的其中一核便是 Trident，美其名曰 "兼容模式"。

代表： IE、傲游、世界之窗浏览器、Avant、腾讯TT、猎豹安全浏览器、360极速浏览器、百度浏览器等。

Window10 发布后，IE 将其内置浏览器命名为 Edge，Edge 最显著的特点就是新内核 EdgeHTML。

（2）Gecko(firefox) 

Gecko(Firefox 内核)： Mozilla FireFox(火狐浏览器) 采用该内核，Gecko 的特点是代码完全公开，因此，其可开发程度很高，全世界的程序员都可以为其编写代码，增加功能。 可惜这几年已经没落了， 比如 打开速度慢、升级频繁、猪一样的队友flash、神一样的对手chrome。

（3） webkit(Safari)  

 Safari 是苹果公司开发的浏览器，所用浏览器内核的名称是大名鼎鼎的 WebKit。

 现在很多人错误地把 webkit 叫做 chrome内核（即使 chrome内核已经是 blink 了），苹果感觉像被别人抢了媳妇，都哭晕再厕所里面了。

 代表浏览器：傲游浏览器3、 Apple Safari (Win/Mac/iPhone/iPad)、Symbian手机浏览器、Android 默认浏览器，

（4） Chromium/Blink(chrome) 

   在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。 

​     大部分国产浏览器最新版都采用Blink内核。二次开发

（5） Presto(Opera) 

  Presto（已经废弃） 是挪威产浏览器 opera 的 "前任" 内核，为何说是 "前任"，因为最新的 opera 浏览器早已将之抛弃从而投入到了谷歌怀抱了。  

```
了解一点：
```

移动端的浏览器内核主要说的是系统内置浏览器的内核。

Android手机而言，使用率最高的就是Webkit内核，大部分国产浏览器宣称的自己的内核，基本上也是属于webkit二次开发。

iOS以及WP7平台上，由于系统原因，系统大部分自带浏览器内核，一般是Safari或者IE内核Trident的浏览器内核（理解）             

```
浏览器内核又可以分成两部分：渲染引擎(layout engineer 或者 Rendering Engine)和 JS 引擎。
渲染引擎 它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
JS 引擎 则是解析 Javascript 语言，执行 javascript语言来实现网页的动态效果。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。有一个网页标准计划小组制作了一个 ACID 来测试引擎的兼容性和性能。内核的种类很多，如加上没什么人使用的非商业的免费内核，可能会有10多种，但是常见的浏览器内核可以分这四种：Trident、Gecko、Blink、Webkit。
```

（1）Trident(IE内核) 

国内很多的双核浏览器的其中一核便是 Trident，美其名曰 "兼容模式"。

代表： IE、傲游、世界之窗浏览器、Avant、腾讯TT、猎豹安全浏览器、360极速浏览器、百度浏览器等。

Window10 发布后，IE 将其内置浏览器命名为 Edge，Edge 最显著的特点就是新内核 EdgeHTML。

（2）Gecko(firefox) 

Gecko(Firefox 内核)： Mozilla FireFox(火狐浏览器) 采用该内核，Gecko 的特点是代码完全公开，因此，其可开发程度很高，全世界的程序员都可以为其编写代码，增加功能。 可惜这几年已经没落了， 比如 打开速度慢、升级频繁、猪一样的队友flash、神一样的对手chrome。

（3） webkit(Safari)  

 Safari 是苹果公司开发的浏览器，所用浏览器内核的名称是大名鼎鼎的 WebKit。

 现在很多人错误地把 webkit 叫做 chrome内核（即使 chrome内核已经是 blink 了），苹果感觉像被别人抢了媳妇，都哭晕再厕所里面了。

 代表浏览器：傲游浏览器3、 Apple Safari (Win/Mac/iPhone/iPad)、Symbian手机浏览器、Android 默认浏览器，

（4） Chromium/Blink(chrome) 

   在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。 

​     大部分国产浏览器最新版都采用Blink内核。二次开发

（5） Presto(Opera) 

  Presto（已经废弃） 是挪威产浏览器 opera 的 "前任" 内核，为何说是 "前任"，因为最新的 opera 浏览器早已将之抛弃从而投入到了谷歌怀抱了。  

```
了解一点：
```

移动端的浏览器内核主要说的是系统内置浏览器的内核。

Android手机而言，使用率最高的就是Webkit内核，大部分国产浏览器宣称的自己的内核，基本上也是属于webkit二次开发。

iOS以及WP7平台上，由于系统原因，系统大部分自带浏览器内核，一般是Safari或者IE内核Trident的

## 2 Doctype

doctype是网页文档生命

HTML有多个版本，而且这其中至少有三个版本在广泛使用，那么浏览器怎么知道我们在使用哪个版本呢 

* 1993年6月：HTML第一个版本发布。
* 1995年11月：HTML2.0
* 1997年1月：HTML3.2（W3C推荐）
* 1999年12月：HTML4.01（W3C推荐）
*  2000年底：XHTML1.0（W3C推荐）
* 2014年10月：HTML5（W3C推荐） 

为了让浏览器知道我们使用的HTML版本我们还需要在网页的最上边添加一个doctype声明，来告诉浏览器网页的版本。 

浏览器有两种呈现模式

* standards
  标准模式（也是严格模式）用于呈现遵循最新标准的网页
* quirks
  怪异模式（也就是兼容模式）用于呈现传统浏览器设计的网页

没有文档类型声明则进入quirks模式

## 3 特殊字符

浏览器中的>< 符号不能直接用，需要使用一些特殊的符号来表示这些特殊字符，这些特殊字符我们称为实体（转义字符串）

实体的名字：

`<  &lt``

``> &gt`

空格 &nbsp

版权符号 &copy

* 其他实体查找w3c文档实体

## 4 meta

```html
设置关键字
<meta name="keywords" content="HTML5,JavaScript,前端,Java" />
设置网页描述
<meta name="description" content="发布h5、js等前端相关的信息" />
设置请求重定向
<meta http-equiv="refresh" content="秒数";url=http://www.baidu.com" />
```

## 5 iframe

内联框架，可以引入一个外部的页面，内联框架中的内容不会被搜索引擎使用

属性：src  height width name

## 6 块级元素和内联元素（行内元素）

## 7 文本标签

```tiddlywiki
<em>和strong
这两个标签都表示一个强调的内容，
em主要表示语气上的强调,em在浏览器中默认使用斜体显示
strong表示强调的内容，比em更强烈，默认使用粗体显示

i标签中的内容会以斜体显示
b标签中的内容会以加粗显示
h5规范中规定，对于不需要着重的内容而是单纯的加粗或者是斜体，就可以使用b和i标签

small标签中的内容会比他的父元素中的文字要小一些
在h5中使用small标签来表示一些细则一类的内容
比如：合同中小字，网站的版权声明都可以放到small

q标签表示一个短的引用（行内引用）
q标签引用的内容，浏览器会默认加上引号

blockquote标签表示一个长引用（块级引用）

使用sup标签来设置一个上标
sub标签用来表示一个下标

del标签中的内容，会自动添加删除线

ins中的的内容，会自动添加下划线

pre是一个预格式标签，会将代码中的格式保存，不会忽略多个空格

code专门用来表示代码
我们一般结合使用pre和code来表示一段代码
```

## 8 列表标签

### 8.1 ul有序

### 8.2 ol无序

### 8.3 dl定义列表

定义列表用来对一些词汇或内容进行定义
使用dl来创建一个定义列表
dl中有两个子标签

* dt ： 被定义的内容

* dd ： 对定义内容的描述

同样dl和ul和ol之间都可以互相嵌套

## 9 表单

表单的作用就是用来将用户信息提交给服务器的
比如：百度的搜索框 注册 登录这些操作都需要填写表单

### 9.1 form

使用form标签创建一个表单
form标签中必须指定一个action属性，该属性指向的是一个服务器的地址
当我们提交表单时将会提交到action属性对应的地址

### 9.2 输入框

### 9.3 文本框

### 9.4 按钮

### 9.5 单选按钮

### 9.6 多选按钮

### 9.7 下拉按钮

### 9.8 提交按钮 

```html
<form action="提交的地址">			
			<!-- 
				在表单中可以使用fieldset来为表单项进行分组，
				可以将表单项中的同一组放到一个fieldset中
			-->
			<fieldset>				
				<!-- 在fieldset可以使用legend子标签，来指定组名 -->
				<legend>用户信息</legend>			
				<!-- 
					使用input来创建一个文本框，它的type属性是text
						如果希望表单项中的数据会提交到服务器中，还必须给表单项指定一个name属性
						name表示提交内容的名字		
					用户填写的信息会附在url地址的后边以查询字符串的形式发送给服务器
						url地址?查询字符串
					格式：
						属性名=属性值&属性名=属性值&属性名=属性值&属性名=属性值
					在文本框中也可以指定value属性值，该值将会作为文本框的默认值显示	
				-->
				<!-- 
					在html中还为我们提供了一个标签，专门用来选中表单中的提示文字的
					label标签
					该标签可以指定一个for属性，该属性的值需要指定一个表单项的id值
				-->
				<label for="um">用户名</label>
				<input id="um" type="text" name="username"  /> <br /><br />
				
				<!--
					密码框
						- 使用input创建一个密码框，它的type属性值是password
				-->
				<label for="pwd">密码 </label>
				<input id="pwd" type="password" name="password" /> <br /><br />
			</fieldset>
			
			<fieldset >
				
				<legend>用户爱好</legend>
			
			<!--
				单选按钮
					- 使用input来创建一个单选按钮，它的type属性使用radio
					- 单选按钮通过name属性进行分组，name属性相同是一组按钮
					- 像这种需要用户选择但是不需要用户直接填写内容的表单项，
						还必须指定一个value属性，这样被选中的表单项的value属性值将会最终提交给服务器
						
					如果希望在单选按钮或者是多选框中指定默认选中的选项，
						则可以在希望选中的项中添加checked="checked"属性
			-->
			性别  <input type="radio" name="gender" value="male" id="male" /><label for="male">男</label>
				<input type="radio" name="gender" value="female" checked="checked" id="female" /><label for="female">女</label> 
				<br /><br />
			
			<!-- 
				多选框
					- 使用input创建一个多选框，它的type属性使用checkbox
			-->
			爱好 	<input type="checkbox" name="hobby" value="zq" />足球
				<input type="checkbox" name="hobby" value="lq" />篮球
				<input type="checkbox" name="hobby" value="ymq" checked="checked" />羽毛球
				<input type="checkbox" name="hobby" value="ppq" checked="checked"/>乒乓球
			<br /><br />
			
			</fieldset>
			
			<!-- 
				下拉列表
					- 使用select来创建一个下拉列表
					下拉列表的name属性需要指定给select，而value属性需要指定给option
					可以通过在option中添加selected="selected"来将选项设置为默认选中
					
					当为select添加一个multiple="multiple"，则下拉列表变为一个多选的下拉列表
			-->
			你喜欢的明星 
				<select name="star">
					
					<!-- 
						在select中可以使用optgroup对选项进行分组
							同一个optgroup中的选项是一组
						可以通过label属性来指定分组的名字	
					-->
					<optgroup label="女明星">
						<!-- 在下拉列表中使用option标签来创建一个一个列表项 -->
						<option value="fbb">范冰冰</option>
						<option value="lxr">林心如</option>
						<option value="zw">赵薇</option>
					</optgroup>
					
					<optgroup label="男明星">
						<option value="zbs" selected="selected">赵本山</option>
						<option value="ldh">刘德华</option>
						<option value="pcj">潘长江</option>
					</optgroup>
					
				</select>
			
			<br /><br />
			
			<!--
				使用textarea创建一个文本域
			-->
			自我介绍  <textarea name="info"></textarea>
			
			<br /><br />
			
			<!-- 
				提交按钮可以将表单中的信息提交给服务器
				使用input创建一个提交按钮,它的type属性值是submit
				在提交按钮中可以通过value属性来指定按钮上的文字
			-->
			<input type="submit" value="注册" />
			
			<!--
				<input type="reset" />可以创建一个重置按钮，
					点击重置按钮以后表单中内容将会恢复为默认值
			-->
			<input type="reset" />
			
			<!-- 
				使用input type=button可以用来创建一个单纯的按钮，
					这个按钮没有任何功能，只能被点击
			-->
			<input type="button" value="按钮" />
			
			<!--
				除了使用input，也可以使用button标签来创建按钮
				这种方式和使用input类似，只不过由于它是成对出现的标签
					使用起来更加的灵活
			-->
			<br /><br />
			<button type="submit">提交</button>
			<button type="reset">重置</button>
			<button type="button">按钮</button>
			
		</form>
```

