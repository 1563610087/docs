# css基础

## 1 样式继承

### 1.1能继承

**1.字体系列属性：font-family，font-size**

**2.文本系列属性：text-indent，line-height，color**

**3.元素可见性：visibility**

**4.表格布局属性：border-style**

**5.列表布局属性：list-style list-style-type**

**6.生成内容属性：quotes**

**7.光标属性：cursor**

**8.声音属性：speak**

### 1.2 不能继承

**1.宽高:height，width**

**2.最小最大宽高：max-height,min-height,max-width,min-width**

**3.dispaly**

**4.文本阴影：text-shadow**

**5.背景属性：background**

**6.浮动属性：float**

**7.生成内容：content**

**8.层级属性：z-index**

**9.定位属性：position，left，right，top，bottom**

**10：盒模型属性：margin,padding,border**

## 2 长度单位 

###  2.1 像素 px

​    \- 像素是我们在网页中使用的最多的一个单位，

​      一个像素就相当于我们屏幕中的一个小点，

​      我们的屏幕实际上就是由这些像素点构成的

​      但是这些像素点，是不能直接看见。

​    \- 不同显示器一个像素的大小也不相同，

​      显示效果越好越清晰，像素就越小，反之像素越大。

###  2.2 百分比 %

​    \- 也可以将单位设置为一个百分比的形式，

​      这样浏览器将会根据其父元素的样式来计算该值

​    \- 使用百分比的好处是，当父元素的属性值发生变化时，

​      子元素也会按照比例发生改变

​    \- 在我们创建一个自适应的页面时，经常使用百分比作为单位

### 2.3 em

​    \- em和百分比类似，它是相对于当前元素的字体大小来计算的

​    \- 1em = 1font-size

​    \- 使用em时，当字体大小发生改变时，em也会随之改变

​    \- 当设置字体相关的样式时，经常会使用em

```html
//当前元素的大小未设置，继承的父级大小，字体就为1em=50px
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
        font-size: 50px;
    }

    .son {
        font-size: 1.2em;
    }
</style>

<body>
    <div class="father">
        <div class="son">好人</div>
    </div>
</body>

</html>
```

### 2.4 rem

CSS3新增的一个相对单位，使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。

## 3 盒子模型

### 3.1 w3c的盒子模型

padding和border不被包含在定义的width和height之内。对象的实际宽度等于设置的width值和border、padding之和，即 ( Element width = width + border + padding ) 此属性表现为标准模式下的盒模型。

![1555489108163](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1555489108163.png)

### 3.2 IE的盒子模型

padding和border被包含在定义的width和height之内。对象的实际宽度就等于设置的width值，即使定义有border和padding也不会改变对象的实际宽度，即 ( Element width = width ) 。

## 4 overflow

当子元素超过父元素时

- visible，默认值，不会对溢出内容做处理，元素会在父元素以外的位置显示
- hidden, 溢出的内容，会被修剪，不会显示
- scroll, 会为父元素添加滚动条，通过拖动滚动条来查看完整内容
   该属性不论内容是否溢出，都会添加水平和垂直双方向的滚动条
- auto，会根据需求自动添加滚动条，需要水平就添加水平，需要垂直就添加垂直，都不需要就都不加

## 5 文档流

### 5.1文档流

文档流
				文档流处在网页的最底层，它表示的是一个页面中的位置，
				 我们所创建的元素默认都处在文档流中
				 

			元素在文档流中的特点
				块元素
					1.块元素在文档流中会独占一行，块元素会自上向下排列。
					2.块元素在文档流中默认宽度是父元素的100%
					3.块元素在文档流中的高度默认被内容撑开
				内联元素
					1.内联元素在文档流中只占自身的大小，会默认从左向右排列，
						如果一行中不足以容纳所有的内联元素，则换到下一行，
						继续自左向右。
					2.在文档流中，内联元素的宽度和高度默认都被内容撑开	
### 5.1 float

				 * 块元素在文档流中默认垂直排列，所以这个三个div自上至下依次排开，
				 * 	如果希望块元素在页面中水平排列，可以使块元素脱离文档流
				 * 使用float来使元素浮动，从而脱离文档流
				 * 	可选值：
				 * 		none，默认值，元素默认在文档流中排列
				 * 		left，元素会立即脱离文档流，向页面的左侧浮动
				 * 		right，元素会立即脱离文档流，向页面的右侧浮动
				 * 
				 * 当为一个元素设置浮动以后（float属性是一个非none的值），
				 * 	元素会立即脱离文档流，元素脱离文档流以后，它下边的元素会立即向上移动
				 * 	元素浮动以后，会尽量向页面的左上或这是右上漂浮，
				 * 	直到遇到父元素的边框或者其他的浮动元素
				 * 	如果浮动元素上边是一个没有浮动的块元素，则浮动元素不会超过块元素
				 * 	浮动的元素不会超过他上边的兄弟元素，最多最多一边齐
### 5.2 清除浮动

1. clear
   清除其他元素浮动对元素的影响

   * none，默认值，不清除浮动
   * left，清除左侧浮动元素对当前元素的影响
   * right，清除右侧浮动元素对当前元素的影响
   * both，清除两侧浮动元素对当前元素的影响，清除对他影响最大的那个元素的浮动

2. 伪类方式

   ```
   .clearfix:after{
       content:'';
       display:block;
       clear:both;
   }
   //ie 6 不支持,ie6中写法如下
   .clearfix{
       zoom:1
   }
   ```

3. 开启BFC

   开启BFC的4种方式

4. overflow: hidden

   子元素浮动了，那么给父元素设置属性overflow: hidden，浮动就清除了，这个方法唯一的缺点就是超出父元素的会被隐藏

5. 增加额外标签，然后添加属性clear: both

   在这个使用了浮动之后增加一个div标签，这个标签添加属性clear: both

6. 父元素设置高度

## 6 Formatting context

Box:css布局的基本单位

box是css布局的对象和基本单位，直观点来说，就是一个页面由很多个box组成

元素的类型和display属性，决定了box的类型。不同的box，会参与不同的formatting Context(一个决定如何渲染文档的容器)，因此box内的元素会以不同的方式渲染。

display：block 生成block-level box     inline生成inline-level box

Formatting context

formatting context 是w3c css2.1规范中的概念

它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用

最常见的是Formatting context有block formatting context（简称BFC）inline formatting context（简称IFC）

### 6.1 BFC

BFC(Block Formatting Contexts)直译为"块级格式化上下文"。Block Formatting Contexts就是页面上的一个独立的渲染区域，容器里面的子元素不会在布局上影响到外面的元素，相互不干扰。

使用场景：子元素浮动导致父元素高度坍陷

BFC规则：

* 内部的box在垂直方向，一个一个放置
* BFC的区域不会与float box重叠
* 内部的box垂直方向的距离由margin决定。属于同一个BFC的两个相邻box的margin会发生重叠
* 计算BFC的高度，浮动元素与参与计算
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

**开启BFC**

1. float的值不为none。

   使用这种方式开启，虽然可以撑开父元素，但是会导致父元素的宽度丢失
   而且使用这种方式也会导致下边的元素上移，不能解决问题

2. overflow的值不为visible。 

3. position的值为absolute或fixed。

4. display的值为table-cell, table-caption, inline-block中的任何一个。 

   可以解决问题，但是会导致宽度丢失，不推荐使用这种方式

### 6.2 IFC

IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)
IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同。 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。
那么IFC一般有什么用呢？
水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

### 6.3GFC

GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。 
那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

### 6.4 FFC

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。
Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。
伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

## 7 定位

### 7.1 relative

				 * 当元素的position属性设置为relative时，则开启了元素的相对定位
				 * 	1.当开启了元素的相对定位以后，而不设置偏移量时，元素不会发生任何变化
				 *  2.相对定位是相对于元素在文档流中原来的位置进行定位
				 * 	3.相对定位的元素不会脱离文档流
				 * 	4.相对定位会使元素提升一个层级
				 * 	5.相对定位不会改变元素的性质，块还是块，内联还是内联
### 7.2 absolute

				 * 绝对定位：
				 * 	1.开启绝对定位，会使元素脱离文档流
				 * 	2.开启绝对定位以后，如果不设置偏移量，则元素的位置不会发生变化
				 * 	3.绝对定位是相对于离他最近的开启了定位的祖先元素进行定位的
				 * 	如果所有的祖先元素都没有开启定位，则会相对于浏览器窗口进行定位
				 * 	4.绝对定位会使元素提升一个层级
				 * 	5.绝对定位会改变元素的性质，
				 * 		内联元素变成块元素，
				 * 		块元素的宽度和高度默认都被内容撑开
				 通常是子绝父相
### 7.3 fixed

				 * 当元素的position属性设置fixed时，则开启了元素的固定定位
				 * 	固定定位也是一种绝对定位，它的大部分特点都和绝对定位一样
				 * 不同的是：
				 * 		固定定位永远都会相对于浏览器窗口进行定位
				 * 		固定定位会固定在浏览器窗口某个位置，不会随滚动条滚动
				 * 
				 * IE6不支持固定定位
### 7.4 static

HTML 元素的默认值，即没有定位，遵循正常的文档流对象。

静态定位的元素不会受到 top, bottom, left, right影响

### 7.5 sticky 

基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。

它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;**，它会固定在目标位置。

元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
<style>
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 5px;
  background-color: #cae8ca;
  border: 2px solid #4CAF50;
}
</style>
</head>
<body>

<p>尝试滚动页面。</p>
<p>注意: IE/Edge 15 及更早 IE 版本不支持 sticky 属性。</p>

<div class="sticky">我是粘性定位!</div>

<div style="padding-bottom:2000px">
  <p>滚动我</p>
  <p>来回滚动我</p>
  <p>滚动我</p>
  <p>来回滚动我</p>
  <p>滚动我</p>
  <p>来回滚动我</p>
</div>
```



## 8 选择器

### 8.1 选择器基本类型

- 标签选择器
- 类选择器
- id选择器
- *通配

### 8.2 选择器分组

- **并集选择器**

通过选择器分组可以同时选中多个选择器对应的元素

语法：选择器1,选择器2,选择器N{}

```css
#p1 , .p2 , h1{
				background-color: yellow;
			}
```

- **交集选择器**

可以选中同时满足多个选择器的元素
 语法：选择器1选择器2选择器N{}---中间没有空格之类的符号

```
.hah.heh{
    
}
```

- **后代元素选择器**

选中指定元素的指定后代元素
语法：祖先元素 后代元素{}

```
.ha .ha {

}
```



​	

- **子代选择器**

父元素>子元素
div>span

### 8.3 伪类选择器

有四个伪类可以让你根据访问者与该链接的交互方式，将链接设置成4种不同的状态。

```
• 正常链接
– a:link
• 访问过的链接
– a:visited（只能定义字体颜色）
• 鼠标滑过的链接
– a:hover
• 正在点击的链接
– a:active 

hover和active可以给其他元素绑定
这四个优先级一样，当四个同时用的时候，写的顺序不能改变，因为有可能同时触发样式，后面的会覆盖前面的
```



**focus**

文本框获取焦点以后，修改背景颜色为黄色

```css
input:focus{
				background-color: yellow;
			}
```

• 指定元素前
– :before
• 指定元素后
– :after

 **::selection** 

为鼠标选中的元素设置样式

注意：这个伪类在火狐中需要采用另一种方式编写::-moz-selection

```css
//火狐
p::-moz-selection{
				background-color: orange;
			}
//其他浏览器
p::selection{
				background-color: orange;
			}			
```

### 8.4 伪元素

:first-letter 第一个字符

:first-line 第一行

:before 元素的前面

```
一般结合content使用
p:before{
    content:'haha';
    color:red
}
```

:after 元素的后面

### 8.5 属性选择器

选取元素的属性来选取指定的元素

- 语法：[属性名] 选取含有指定属性的元素
- [属性=属性值] 选取指定属性值的元素
- [属性^='a'] 选取属性值以a开头的元素
- [属性$='a' ]选择属性以a结尾的元素
- [属性*=‘属性值’]选取属性值以包含指定内容的元素

```
p[title]{
    background-color:red
}

```

### 8.6 子元素选择器

:first-child 所有类型第一个子元素

:last-child 所有类型最后一个子元素

:nth-child(n)选中第n个子元素

```
:nth-child(even)选择偶数子元素
:nth-child(odd)选择奇数子元素
```

:first-of-type当前类型的子元素的排列

:last-of-type当前类型的子元素的排列

### 8.7 兄弟选择器

- span+p

语法：前一个标签+后一个标签紧挨着的兄弟元素

- span~p

选择span后面所有的p标签

### 8.8 否定伪类

：not(选择器)

可以从已选择的元素中提出某些元素

p:not(.he)

选择所有p，排除class为he的元素

### 8.9 选择器的优先级

选择同一个元素设置同一个样式，采用选择器优先级高的显示

优先级：

!important最高优先级

内联样式：1000

id选择器：100

类和伪类：10

标签选择器：1

通配*：0

优先级一样则选择后面的样式

并集选择器的标签单独计算

## 9 hack

条件hack，只对ie浏览器有效，其他浏览器识别为注释，ie10 以上不支持

<!--[if IE]>jdfkjkfhjsdhfjdsjf<![endif]-->

属性hack

尚硅谷视频

## 10 布局

三列布局

1.两边固定  当中自适应
2.当中列要完整显示
3.当中列要优先加载

### 9.1 圣杯布局

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<!--
			1.两边固定  当中自适应
			2.当中列要完整显示
			3.当中列要优先加载
		-->
		
		<!--
			浮动:	搭建完整的布局框架
			margin 为赋值:调整旁边两列的位置(使三列布局到一行上)
			使用相对定位:调整旁边两列的位置（使两列位置调整到两头）
		-->
		
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			body{
				min-width: 600px;
			}
			#content{
				padding: 0 200px;

			}
			#header,#footer{
				height: 20px;
				text-align: center;
				border: 1px solid  deeppink;
				background: gray;
			}
			#content .middle{
				float: left;
				height: 500px;
				width: 100%;
				background: pink;
				/*padding: 0 200px;*/
			}
			#content .left{
				height: 500px;
				position: relative;
				left: -200px;
				margin-left: -100%;
				float: left;
				width: 200px;
				background: #ff3333;
			}
			#content .right{
				height: 500px;
				position: relative;
				right: -200px;
				margin-left: -200px;
				float: left;
				width: 200px;
				background: #ff3333;
			}
			.clearfix{
				*zoom: 1;
			}
			.clearfix:after{
				content: "";
				display: block;
				clear: both;
			}
		</style>
	</head>
	<body>
		<div id="header">header</div>
		<div id="content" class="clearfix">
			<div class="middle">
				<h4>middle</h4>
			</div>
			<div class="left">left</div>
			<div class="right">right</div>
		</div>
		<div id="footer">footer</div>
	</body>
</html>

```

### 10.2 伪等高布局



### 10.2 双飞翼布局

## 11  垂直居中

### 11.1 已知高宽

方法1：

采用定位，父盒子相对定位，子盒子绝对定位，子盒子的left和right为50%，再用margin-left和margin-right移动自身的一半

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<!--已知高度的元素水平垂直居中方案-->
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			#wrap{
				position: relative;
				width: 400px;
				height: 600px;
				background: pink;
				margin: 0 auto;
			}
			
			#inner{
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -50px;
				margin-top: -50px;
				width: 100px;
				height: 100px;
				background: deeppink;
			}
		</style>
	</head>
	<body>
		<div id="wrap">
			<div id="inner">
					test
			</div>
		</div>
	</body>
</html>
```

方法2：

采用定位，父盒子相对定位，子盒子绝对定位，子盒子四个位置设为0，margin设为auto，盒子必须有高宽

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<!--已知高度的元素水平垂直居中方案-->
		
		<!--
		绝对定位盒子的特性
			高宽有内容撑开
			水平方向上：   left + right + width + padding + margin = 包含块padding区域的尺寸
						 0        0       100        0                0            400
			垂直方向上：   top + bottom + height + padding + margin = 包含块padding区域的尺寸
			       		  0        0       100        0                0			600
		-->
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			#wrap{
				position: relative;
				width: 400px;
				height: 600px;
				background: pink;
				margin: 0 auto;
			}
			
			#inner{
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 100px;
				height: 100px;
				background: deeppink;
			}
		</style>
	</head>
	<body>
		<div id="wrap">
			<div id="inner">
					test<br />
					test<br />
					test<br />
					test<br />
			</div>
		</div>
	</body>
</html>

```

### 11.2 未知宽高

采用方法1的方法，在移动自身的位置时，采用transform

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<!--未知高度的元素水平垂直居中方案-->
		
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			#wrap{
				position: relative;
				width: 400px;
				height: 600px;
				background: pink;
				margin: 0 auto;
			}
			
			#inner{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate3d(-50%,-50%,0);
				background: deeppink;
			}
		</style>
	</head>
	<body>
		<div id="wrap">
			<div id="inner">
					testtesttesttesttesttesttest<br />
					testtesttesttesttesttesttest<br />
					testtesttesttesttesttesttest<br />
					testtesttesttesttesttesttest<br />
					testtesttesttesttesttesttest<br />
					testtesttesttesttesttesttest<br />
			</div>
		</div>
	</body>
</html>
```



## 12  stickyfooter

经典的粘连footer布局

我们有一块内容，满足以下两个需求

当main元素比较短的时候（比如小于屏幕的高度），footer粘连在屏幕的底部

* 设置body高度100%，wrap最小高度100%，此时footer被挤到下面去了
* footer设置margin-top为负值，值为footer的高度，此时footer出现在底部https://www.nowcoder.com/project/recommend

当main的高度足够长的时候，footer紧跟在main元素的后面

* 给main中的元素设置padding-top，大小为footer的高度，此时main的元素就不会和footer重合

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
		<title></title>
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			html,body{
				height: 100%;
			}
			#wrap{
				min-height: 100%;
				background: pink;
				text-align: center;
				overflow: hidden;
			}
			#wrap .main{
				padding-bottom:50px ;
			}
			#footer{
				height: 50px;
				line-height: 50px;
				background: deeppink;
				text-align: center;
				margin-top: -50px;
			}
		</style>
	</head>
	<body>
		<div id="wrap" >
			<div class="main">
				main <br />
				main <br />
				main <br />
			</div>
		</div>
		<div id="footer">
			footer
		</div>
	</body>
</html>

```

## 13 兼容性问题

<https://caniuse.com/>采用can i use这个网站，能够查询css及html的各大浏览器的支持情况

## 14 transition

众所周知，css效率极高，其变化的过程往往都是在一瞬间完成，速度极快。

css transition提供了一种在更改css属性时控制动画速度的方法。其可以让属性变化为一个持续一段时间的过程，而不是立即生效。比如将一个元素从白色改为黑色，通常这个改变是立即生效的，使用css transition后该元素的颜色逐渐从白色变为黑色，按照一定的曲线速率变化。这个过程可以自定义

### 属性

	transition-property 
		指定过渡动画的属性（并不是所有的属性都可以动画）
	transition-duration
		指定过渡动画的时间（0也要带单位）
	transition-timing-function
		指定过渡动画的形式（贝塞尔）
	transition-delay
		指定过渡动画的延迟
	transition
		第一个可以被解析成时间的值会赋给transition-duration
	transtionend事件（DOM2）
		在每个属性完成过渡时都会触发这个事件
	当属性值的列表长度不一致时
		跟时间有关的重复列表
		transition-timing-function使用默认值
## 15 flex布局

### 15.1原理

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性

任何一个容器都可以指定为Flex布局。行内元素和块级元素都可以进行flex布局

开启flex布局：

display:flex /inline-flex

 flex和inline-flex区别在于，inline-flex容器为inline特性，因此可以和图片文字一行显示；flex容器保持块状特性，宽度默认100%，不和内联元素一行显示

| 作用在flex容器上 | 作用在flex子项 |
| ---------------- | -------------- |
| flex-direction   | order          |
| flex-wrap        | flex-grow      |
| flex-flow        | flex-shrink    |
| justify-content  | flex-basis     |
| align-item       | flex           |
| align-content    | align-self     |

无论作用在flex容器上，还是作用在flex子项，都是控制的flex子项的呈现，只是前者控制的是整体，后者控制的是个体。

**基础用法**

```HTML
<div class="father">
      <div class="son">1</div>
      <div class="son">1</div>
      <div class="son">1</div>
      <div class="son">1</div>
</div>
```

```css
.father {
  width: 300px;
  display:flex;
}
.son {
  width: 100px;
}
```

上面这种在父级元素设置flex之后，里面的div会自动横向排列，并且变为弹性布局，由于父级元素的宽度是300px小于子元素所有的宽度400px，这时的子元素宽度会自动缩小，不会变成设置的100px，只有当父级元素的宽度大于子元素才会按照设置的显示。

### 15.2 flex容器上的CSS属性

#### 1. flex-direction

flex-direction用来控制子项整体布局方向，是从左往右还是从右往左，是从上往下还是从下往上。

flex-direction: row | row-reverse | column | column-reverse;

其中：

- **row**

  默认值，显示为行。方向为当前文档水平流方向，默认情况下是从左往右。如果当前水平文档流方向是rtl（如设置direction:rtl），则从右往左。

- **row-reverse**

  显示为行。但方向和row属性值是反的。

- **column**

  显示为列。

- **column-reverse**

  显示为列。但方向和column属性值是反的。

#### 2. flex-wrap

flex-wrap用来控制子项整体单行显示还是换行显示，如果换行，则下面一行是否反方向显示。这个属性比较好记忆，在CSS世界中，只要看到单词wrap一定是与换行显示相关的，word-wrap属性或者white-space:nowrap或者pre-wrap之类。

语法如下：

flex-wrap: nowrap | wrap | wrap-reverse;

其中：

- **nowrap**

  默认值，表示单行显示，不换行。于是很容易出现宽度溢出的场景

- **wrap**

  宽度不足换行显示。

- **wrap-reverse**

  宽度不足换行显示，但是是从下往上开始，也就是原本换行在下面的子项现在跑到上面。

#### 3. flex-flow

flex-flow属性是flex-direction和flex-wrap的缩写，表示flex布局的flow流动特性，语法如下：

flex-flow: <‘flex-direction’> || <‘flex-wrap’>

当多属性同时使用的时候，使用空格分隔。

举个例子，容器元素如下设置：

.container {

display: flex;

flex-flow: row-reverse wrap-reverse;

}

#### 4. justify-content

justify-content属性决定了水平方向子项的对齐和分布方式。CSS text-align有个属性值为justify，可实现[两端对齐](https://www.zhangxinxu.com/wordpress/2015/08/chinese-english-same-padding-text-justify/)，所以，当我们想要控制flex元素的水平对齐方式的时候，记住justify这个单词，justify-content属性也就记住了。

justify-content可以看成是text-align的远房亲戚，不过前者控制flex元素的水平对齐外加分布，后者控制内联元素的水平对齐。

语法如下：

justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;

其中：

- **flex-start**

  默认值。逻辑CSS属性值，与文档流方向相关。默认表现为左对齐。

- **flex-end**

  逻辑CSS属性值，与文档流方向相关。默认表现为右对齐。

- **center**

  表现为居中对齐。

- **space-between**

  表现为两端对齐。between是中间的意思，意思是多余的空白间距只在元素中间区域分配。使用抽象图形示意如下：

  ![img](https://image.zhangxinxu.com/image/blog/201810/space-between.svg)

- **space-around**

  around是环绕的意思，意思是每个flex子项两侧都环绕互不干扰的等宽的空白间距，最终视觉上边缘两侧的空白只有中间空白宽度一半。使用抽象图形示意如下：

  ![img](https://image.zhangxinxu.com/image/blog/201810/space-around.svg)

- **space-evenly**

  evenly是匀称、平等的意思。也就是视觉上，每个flex子项两侧空白间距完全相等。使用抽象图形示意如下：

  ![img](https://image.zhangxinxu.com/image/blog/201810/space-evenly.svg)

#### 5. align-items

align-items中的items指的就是flex子项们，因此align-items指的就是flex子项们相对于flex容器在垂直方向上的对齐方式，大家是一起顶部对齐呢，底部对齐呢，还是拉伸对齐呢，类似这样。

语法如下：

align-items: stretch | flex-start | flex-end | center | baseline;

其中：

- **stretch**

  默认值。flex子项拉伸。在演示中我们可以看到白蓝径向渐变背景区域是上下贯穿flex容器的，就是因为flex子项的高度拉伸到容器高度导致。如果flex子项设置了高度，则按照设置的高度值渲染，而非拉伸。

- **flex-start**

  逻辑CSS属性值，与文档流方向相关。默认表现为容器顶部对齐。

- **flex-end**

  逻辑CSS属性值，与文档流方向相关。默认表现为容器底部对齐。

- **center**

  表现为垂直居中对齐。

- **baseline**

  表现为所有flex子项都相对于flex容器的基线（[字母x的下边缘](https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/)）对齐。

#### 6. align-content

align-content可以看成和justify-content是相似且对立的属性，justify-content指明水平方向flex子项的对齐和分布方式，而align-content则是指明垂直方向每一行flex元素的对齐和分布方式。如果所有flex子项只有一行，则align-content属性是没有任何效果的。

语法如下：

align-content: stretch | flex-start | flex-end | center | space-between | space-around | space-evenly;

每种属性和justify-content相似，只是在于垂直方向上

### 15.3 flex子项上的CSS属性

#### 1 order属性

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```
.item {
  order: <integer>;
}
```

#### 2 flex-grow

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```
.item {
  flex-grow: <number>; /* default 0 */
}
```

#### 3 flex-shrink

flex-shrink主要处理当flex容器空间不足时候，单个元素的收缩比例，属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```
.item {
  flex-shrink: <number>; /* default 1 */
}
```

#### 4 flex-basis

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。默认值是auto，就是自动。有设置width则占据空间就是width，没有设置就按内容宽度来。

如果同时设置width和flex-basis，就渲染表现来看，会忽略width。flex顾名思义就是弹性的意思，因此，实际上不建议对flex子项使用width属性，因为不够弹性。

当剩余空间不足的时候，flex子项的实际宽度并通常不是设置的flex-basis尺寸，因为flex布局剩余空间不足的时候默认会收缩

```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

#### 5 flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

#### 6 align-self属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了auto，表示继承自flex容器的align-items属性值，其他都与align-items属性完全一致

### 15.4 注意

在Flex布局中，flex子元素的设置`float`，`clear`以及`vertical-align`属性都是没有用的

**align-content和align-items的区别**

* align-content

设置所有行作为一个整体在垂直方向排列方式。

必须对父元素设置自由盒属性display:flex;并且设置换行，flex-wrap:wrap;这样这个属性的设置才会起作用

* align-items

给每一行的flex元素设置对齐方式

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<style>
    div {
        height: 400px;
        width: 400px;
        border: 1px solid blue;
        display: flex;
        flex-wrap: wrap;
        /* flex-direction: row; */
        justify-content: center;
        /* align-content: flex-start; */
        /* align-items: center; */
    }

    div span {
        display: inline-block;
        width: 150px;
        height: 150px;
        border: 1px solid red;
    }
</style>

<body>
    <div id="div1">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</body>

</html>
```

### 15.5 特殊写法

| 属性       | 作用           | 说明                        |
| ---------- | -------------- | --------------------------- |
| flex:auto  | flex:1 1 auto  | 等比缩放                    |
| flex:none  | flex:0 0 auto  | 不许缩放，宽度为设置的width |
| flex：0%   | flex：1 1 0%   |                             |
| flex:100px | flex:1 1 100px |                             |
| flex:1     | flex:1 1 0%    | 等比缩放                    |

## 16 css颜色模式

常用的三种模式

| 颜色 HEX | 颜色 RGB   | 颜色rgba          |
| :------- | :--------- | ----------------- |
| #fff000  | rgb(0,0,0) | rgba(1,23,33,0.5) |

#### 16.3 rgba

rgba语法:
R：红色值。正整数 | 百分数
G：绿色值。正整数 | 百分数
B：蓝色值。正整数| 百分数
A：透明度。alpha 参数是介于 0.0（完全透明）与 1.0（完全不透明）的数字

rgba和opacity的区别

rgba只作用于元素本身，内部的元素不受影响

opacity作用与元素本身和内部的元素

```html
 <style type="text/css">
        /* div {
            background-color: rgba(111, 222, 12, 0.5)
        } */
        div {
            background-color: green;
            opacity: 0.5;
        }
    </style>
</head>

<body>
    <div>hah</div>
```

## 17 inline-block

inline-block的缺点：两个元素并排中间会有空隙

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    div {
      display: inline-block;
      border:1px solid red;
    }
  </style>
</head>
<body>
  <div>1</div>
  <div>2</div>
</body>
</html>
```

解决方式：

1 代码写成一行，缺点：可读性和维护性不好

2 设置父元素font-size 为0   缺点：子元素的字体都需要重新设置字体大小，否则会继承父元素字体