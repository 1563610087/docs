## 1 数据

### 1 数据类型分类

- 基本(值)类型
  - Number ----- 任意数值 -------- typeof
  - String ----- 任意字符串 ------ typeof
  - Boolean ---- true/false ----- typeof
  - undefined --- undefined ----- typeof/===
  - null -------- null ---------- ===
- 对象(引用)类型
  - Object ----- typeof/instanceof
  - Array ------ instanceof
  - Function ---- typeof
  - RegExp
- 思考
  1. undefined与null的区别?
     - undefined代表没有赋值
     - null代表赋值了, 只是值为null， null用来表示尚未存在的对象
  2. 什么时候给变量赋值为null呢?
     - var a = null //a将指向一个对象, 但对象此时还没有确定
     - a = null //让a指向的对象成为垃圾对

### 2 类型判断

JavaScript 有四种方法，可以确定一个值到底是什么类型。

1. “===”

	* "==="全等运算符

2. typeof运算符

```javascript
typeof

- 可以区别: 数值, 字符串, 布尔值, undefined, function
- 不能区别: null与对象, 一般对象与数组

    var a=[1,2]
    var b={
      a:1
    }   
    var c=null
    var d=function(){
      return 1
    }
    console.log(typeof a,typeof b,typeof c,typeof d)//object object object function
```

3. instanceof运算符

instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置。专门用来判断对象数据的类型: Object, Array与Function

```javascript
let a=[1,2]
console.log(a instanceof Object)//true
console.log(a instanceof Array)//true
console.log(a instanceof Function)//false
//====================
function b() {
  console.log(hah) 
}
console.log(b instanceof Object)//true
console.log(b instanceof Array)//false
console.log(b instanceof Function)//true
```

4. Object.prototype.toString方法

* 可以检查各种类型的数据

```javascript
console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));//[object Object]
```

toString为Object的原型方法，而`Array` ，function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串.....），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object上原型toString方法。

**判断**

数组：instanceOf  Object.prototype.toString  Array.isArray()

对象：instanceOf  Object.prototype.toString

函数：instanceOf  Object.prototype.toString

### 3 类型转换

#### 	转换为数字

- Number()

  **(1)原始类型值**

  ①字符串转数字

  Ⅰ 如果是纯数字的字符串，则直接将其转换为数字

  Ⅱ 如果字符串中有非数字的内容，则转换为NaN（NaN表示非数字的值）

  Ⅲ 如果字符串是一个空串或者是一个全是空格的字符串，则转换为0

  ```
  Number('324') // 324
  Number('324abc') // NaN
  Number('') // 0
  //注意:number这个有问题，当数字较大时，出bug，最大值为16位，2的53次方，超过则不精确
  var c='12630717197566440063'
  var d=Number(c)
  console.log(d)//12630717197566440000
  ```

  ②布尔值转数字:true转成1,false转成0

  ```
  Number(true) // 1
  Number(false) // 0
  ```

  ③undefined转数字:转成NaN

  ```
  Number(undefined) // NaN
  ```

  ④null转数字：转成0

  ```
  Number(null) // 0
  ```

  ⑤Number() 接受数值作为参数，此时它既能识别负的十六进制，也能识别0开头的八进制，返回值永远是十进制值

  ```
  Number(3.15);    //3.15
  Number(023);     //19
  Number(0x12);    //18
  Number(-0x12);   //-18
  ```

  **(2)对象**

  简单的规则是，Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组。

  ```
  Number({a: 1}) // NaN
  Number([1, 2, 3]) // NaN
  Number([5]) // 5
  ```

- parseInt()

  ```
  var num1 = parseInt("12.3abc");  // 返回12，如果第一个字符是数字会解析知道遇到非数字结束
  var num2 = parseInt("abc123");   // 返回NaN，如果第一个字符不是数字或者符号就返回NaN
  
  该方法可以进行二进制转十进制
  parseInt（二进制，2）
  ```

  ```javascript
  //十进制转其他进制
  var  x = 110;
  x.toString(2)//转为2进制
  x.toString(8)//转为8进制
  x.toString(16)//转为16进制
  //其他进制转十进制
  var x = "110"//这是一个二进制的字符串表示
  parseInt(x, 2)//把这个字符串当做二进制， 转为十进制
  
  var x = "70"//这是一个八进制的字符串表示
  parseInt(x, 8)//把这个字符串当做八进制， 转为十进制
  
  var x = "ff"//这是一个十六进制的字符串表示
  parseInt(x, 16)//把这个字符串当做十六进制， 转为十进制
  ```

  

- parseFloat()

  ```
  parseFloat()把字符串转换成浮点数
  console.log(parseInt('.21'));        //NaN
  console.log(parseInt("10.3"));        //10
  console.log(parseFloat('.21'));      //0.21
  console.log(parseFloat('.d1'));       //NaN
  console.log(parseFloat("10.11.33"));  //10.11
  console.log(parseFloat("4.3years"));  //4.3
  console.log(parseFloat("He40.3"));    //NaN
  ```

  ```
  parseInt逐个解析字符，而Number函数整体转换字符串的类型。
  另外，对空字符串的处理也不一样
  Number("   ");     //0    
  parseInt("   ");   //NaN
  ```

- +，-0等运算

  ```javascript
  var str = '500';
  console.log(+str);		// 取正
  console.log(-str);		// 取负
  console.log(str - 0);
  ```

#### 转换为字符串

- toString()

  ```javascript
  var num = 5;
  console.log(num.toString());
  //不能转null和undefined
  ```

  - 采用 Number 类型的 toString() 方法的基模式，可以用不同的基输出数字，例如二进制的基是 2，八进制的基是 8，十六进制的基是 16

  ```
  var iNum = 10;
  alert(iNum.toString(2));        //输出 "1010"
  alert(iNum.toString(8));        //输出 "12"
  alert(iNum.toString(16));       //输出 "A"
  ```

- String()

  ```
  String()函数存在的意义：有些值没有toString()，这个时候可以使用String()。比如：undefined和null
  ```

  - String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。

  ```shell
  String({a: 1}) // "[object Object]"
  String([1, 2, 3]) // "1,2,3"
  ```

- 拼接字符串方式

  num  +  ""，当 + 两边一个操作符是字符串类型，一个操作符是其它类型的时候，会先把其它类型转换成字符串再进行字符串拼接，返回字符串

#### 转换为boolean型

它的转换规则相对简单：**只有空字符串("")、null、undefined、+0、-0 和 NaN 转为布尔型是 false，其他的都是 true，空数组、空对象转换为布尔类型也是 true,甚至连false对应的布尔对象new Boolean(false)也是true**

```
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

### 4 数据类型---存储

JS内存空间分为**栈(stack)**、**堆(heap)**、**池(一般也会归类为栈中)**。 其中**栈**存放变量，**堆**存放复杂对象，**池**存放常量，所以也叫常量池。

- 基本类型：--> `栈`内存（不包含闭包中的变量）
- 引用类型：--> `堆`内存

**注意**闭包中的变量并不保存中栈内存中，而是保存在`堆内存`中，这也就解释了函数执行完之后为什么闭包还能引用到函数内的变量

### 5 数据类型---赋值

## 2 函数

### 1 函数的定义

- 函数声明

```javascript
function 函数名(){
  // 函数体
}
```

- 函数表达式

```javascript
var fn = function() {
  // 函数体
}
```

**备注**：函数声明的时候，函数体并不会执行，只要当函数被调用的时候才会执行。

### 2 函数声明与函数表达式的区别

- 函数声明必须有名字

- 函数声明会函数提升，在预解析阶段就已创建，声明前后都可以调用

- 函数表达式类似于变量赋值

- 函数表达式可以没有名字，例如匿名函数

- 函数表达式没有变量提升，在执行阶段创建，必须在表达式执行之后才可以调用

  ##### 预解析

**这里涉及到浏览器的预解析，浏览器解析代码之前，把变量的声明和函数的声明提前到作用域的最上面 **

* 尽量多用函数表达式，以免出错

```javascript
//变量的提升
console.log(a);//undefined
var a=10; 
//只是把变量的声明提前，赋值并未提前
//相当于以下代码 
var a; 
console.log(a);
a=10; 
//函数的声明提前了 
f1(); 
function f1(){ console.log("函数执行了")//函数执行了 } 
//浏览器的预解析会将变量或函数的声明提前，并不会将赋值提前
f2();
var f2=function() { 
    console.log("函数执行了")//报错
} 
//相当于 
var f2;
f2(); 
f2=function(){
    console.log("函数执行了")
}
```

### 3 this指向

this是面向对象语言中 this 表示当前对象的一个引用。

但在 JavaScript 中 this 不是固定不变的，它会随着执行环境的改变而改变。

函数的调用方式决定了 `this` 指向的不同：

| 调用方式         | 非严格模式     | 备注                         |
| ---------------- | -------------- | ---------------------------- |
| 普通函数调用     | window         | 严格模式下是 undefined       |
| 构造函数调用     | 实例对象       | 原型方法中 this 也是实例对象 |
| 对象方法调用     | 该方法所属对象 | 紧挨着的对象                 |
| 事件绑定方法     | 绑定事件对象   |                              |
| 定时器函数       | window         |                              |
| call apply bind  | 传入的对象     |                              |
| 箭头函数中的this | 定义时的对象   |                              |
| vue中的this      |                |                              |

**但是不管函数是按哪种方法来调用的，请记住一点：谁调用这个函数或方法,this关键字就指向谁 **

#### 普通函数

```javascript
function f1() {
         console.log(this);
       }
f1();//window
```

#### 构造函数+对象+原型

```javascript
    // 构造函数
       function Person() {
         console.log(this);
    // 对象的方法
         this.sayHi=function () {
           console.log(this);
         };
       }
    // 原型中的方法
       Person.prototype.eat=function () {
         console.log(this);
       };
       var per=new Person();
       console.log(per);//Person
       per.sayHi();//Person
       per.eat();//Person

```

#### 定时器中的this

```javascript
setInterval(function () {
         console.log(this);
       },1000);//window
```

#### 改变this指向

apply和call的使用方法

```javascript
   function Person(age) {
     this.age = age;
   }
   Person.prototype.sayHi = function (x, y) {
     console.log((x + y) + ":====>" + this.age);//是实例对象
   };

   function Student(age) {
     this.age = age;
   }
   var per = new Person(10);//实例对象
   var stu = new Student(100);//实例对象
   //sayHi方法是per实例对象的
   per.sayHi.apply(stu, [10, 20]);
   per.sayHi.call(stu, 10, 20);
```

****

apply的使用语法
* 函数名字.apply(对象,[参数1,参数2,...]);
* 方法名字.apply(对象,[参数1,参数2,...]);

call的使用语法
* 函数名字.call(对象,参数1,参数2,...);
* 方法名字.call(对象,参数1,参数2,...)

作用:将函数或着方法中的this指向当前传入的对象，下面的例子中，将b对象传入call方法，此时A中的this就指向了对象b，此时的b对象中的a属性就被改变成1

```
function A() {
            this.a = 1
        }
        var b={
            a:2
        }
        A.call(b)
        console.log(b.a)//1
```

不同的地方:参数传递的方式是不一样的,执行的性能不一样

只要是想使用别的对象的方法,并且希望这个方法是当前对象的,那么就可以使用apply或者是call的方法改变this的指向

**bind的使用**

bind不会立即调用，而是返回一个函数

```javascript
function a(b) {
            this.b = b
        }

        var c = {
            d: 2
        }

        a.bind(c, 1)
        a.bind(c, 1)()
//将对象c传入bind方法，对象c就有a的属性b
```



### 4 函数的调用

- 一般函数 : 直接调用

```javascript
// 声明函数
function sayHi() {
  console.log("吃了没？");
}
// 调用函数
sayHi();
```

- 构造函数 : 通过new调用，实例化对象时就通过new调用函数

    function F1() {
      console.log("我是构造函数,我骄傲");
    }
    var f=new F1();
- 对象 : 通过.调用内部的属性/方法

    function Person() {
      this.play=function () {
        console.log("玩代码");
      };
    }
    var per=new Person();
    per.play();
- call/apply调用//可以让一个函数成为任意对象的方法调用

### 5 函数的成员

* 函数中有一个name属性----->函数的名字,name属性是只读的,不能修改
* 函数中有一个arguments属性--->实参的个数
* 函数中有一个length属性---->函数定义的时候形参的个数
* 函数中有一个caller属性---->调用(f1函数在f2函数中调用的,所以,此时调用者就是f2)

    function f1(x,y) {
          console.log(f1.name);
          console.log(f1.arguments.length);
          console.log(f1.length);
          console.log(f1.caller);//调用者
        }
        function f2() {
          console.log("f2函数的代码");
          f1(1,2);
        }
        f2();
### 6 自调用函数

```
(function(w, obj){
  //实现代码
})(window, obj)
```

- 专业术语为: IIFE (Immediately Invoked Function Expression) 立即调用函数表达式

- 作用：

  —隐藏内部实现

  —不污染外部命名空间	

  —用它编写js模块

### 7 回调函数

- 什么函数才是回调函数?

  - 你定义的
  - 你没有调用
  - 但它最终执行了(在一定条件下或某个时刻)

- 常用的回调函数

  - dom事件回调函数

  ```javascript
    //1. DOM事件函数
    var btn = document.getElementById('btn')
    btn.onclick = function () {
      alert(this.innerHTML)
    }
  ```

  - 定时器回调函数

  ```javascript
   //2. 定时器函数
    setInterval(function () {
      alert('到点啦!')
    }, 2000)
  ```

  - ajax请求回调函数(后面讲解)
  - 生命周期回调函数(后面讲解)

## 3 对象

### 1 定义

**(1) 对象是单个事物的抽象。**

一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

**(2) 对象是一个容器，封装了属性（property）和方法（method）。**

属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为animal对象，使用“属性”记录具体是那一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

在实际开发中，对象是一个抽象的概念，可以将其简单理解为：**数据集或功能集**。

ECMAScript-262 把对象定义为：**无序属性的集合，其属性可以包含基本值、对象或者函数**。
严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都
映射到一个值。

### 2 对象的类型

内建对象

宿主对象

自定义对象

### 3 创建对象的方式

####Object构造函数模式

```
var obj = {};
obj.name = 'Tom'
obj.setName = function(name){this.name=name}
```

####`new Object()` 创建

```javascript
var person = new Object()
person.name = 'Jack'
person.age = 18

person.sayName = function () {
  console.log(this.name)
}
```

####对象字面量模式

```
var obj = {
  name : 'Tom',
  setName : function(name){this.name = name}
}
```

####工厂模式

```javascript
//工厂模式创建对象
function createObject(name,age) {
      var obj=new Object();
      obj.name=name;
      obj.age=age;
      obj.sayHi=function () {
        console.log("您好");
      };
      return obj;
    }
var per2=createObject("小明",20);
```

这样封装确实爽多了，通过工厂模式我们解决了创建多个相似对象代码冗余的问题，
但却没有解决对象识别的问题（即怎样知道一个对象的类型）

####构造函数模式

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
  this.sayName = function () {
    console.log(this.name)
  }
}
var p1 = new Person('Jack', 18)
p1.sayName() // => Jack

var p2 = new Person('Mike', 23)
p2.sayName() // => Mike

new一个对象的过程
1.声明一个中间对象
2.将该中间对象的proto指向构造函数的原型
3.将构造函数的this通过apply指向中间对象
4.返回该中间对象,也就是返回了实例对象
```

**备注工厂模式和自定义构造函数模式的异同**

/*
    * 共同点:都是函数,都可以创建对象,都可以传入参数
    * 区别
    * 工厂模式:
    * 函数名是小写
    * 有new,
    * 有返回值
    * new之后的对象是当前的对象
    * 直接调用函数就可以创建对象
    *
    * 自定义构造函数:
    * 函数名是大写(首字母)
    * 没有new
    * 没有返回值
    * this是当前的对象
    * 通过new的方式来创建对象
    * */

####构造函数+原型的组合模式

```
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.setName = function(name){this.name=name;};
new Person('tom', 12);
```

### 4  new 关键字

new关键字会调用创建的构造函数

```
var obj  = {};
obj.__proto__ = F.prototype;
F.call(obj);
返回新的对象
```

第一行，我们创建了一个空对象obj;

第二行，我们将这个空对象的__proto__成员指向了F函数对象prototype成员对象;

第三行，我们将F函数对象的this指针替换成obj，然后再调用F函数.

我们可以这么理解: 以 new 操作符调用构造函数的时候，函数内部实际上发生以下变化：

1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。

2、属性和方法被加入到 this 引用的对象中。

3、新创建的对象由 this 所引用，并且最后隐式的返回 this.

作者：路易斯

链接：https://juejin.im/post/58f94c9bb123db411953691b

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### 5 遍历对象的属性

> 通过for..in语法可以遍历一个对象

```javascript
var obj = {};
for (var i = 0; i < 10; i++) {
  obj[i] = i * 2;
}
for(var key in obj) {
  console.log(key + "==" + obj[key]);
}
```

### 6 删除对象的属性

```javascript
function fun() { 
  this.name = 'mm';
}
var obj = new fun(); 
console.log(obj.name); // mm 
delete obj.name;
console.log(obj.name); // undefined
```

## 4 原型

Javascript 规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象。
这个对象的所有属性和方法，都会被构造函数的实例继承。

这也就意味着，我们可以把所有对象实例需要共享的属性和方法直接定义在 `prototype` 对象上。

- 所有函数都有一个特别的属性:
  - `prototype` : 显式原型属性
- 所有实例对象都有一个特别的属性:
  - `__proto__` : 隐式原型属性

### 1 原型的作用

原型可以共享数据，节省内存空间

* 什么样子的数据是需要写在原型中?
  * 需要共享的数据就可以写原型中
  * 原型的作用之一:数据共享
* 属性需要共享,方法也需要共享
  * 不需要共享的数据写在构造函数中,需要共享的数据写在原型中  

### 2 构造函数--实例对象--原型对象   之间的关系

构造函数可以实例化对象

* 构造函数中有一个属性叫prototype,是构造函数的原型对象
* 构造函数的原型对象(prototype)中有一个constructor构造器,这个构造器指向的就是自己所在的原型对象所在的构造函数
* 实例对象的原型对象(__proto__)指向的是该构造函数的原型对象
* 构造函数的原型对象(prototype)中的方法是可以被实例对象直接访问的

![三者之间的关系](J:\前端资料\技术文件\javascript笔记\我的笔记\picture\三者之间的关系.png)

### 3 原型中的方法可以相互调用

```javascript
    function Animal(name,age) {
      this.name=name;
      this.age=age;
    }
    //原型中添加方法
    Animal.prototype.eat=function () {
      console.log("动物吃东西");
      this.play();
    };
    Animal.prototype.play=function () {
      console.log("玩球");
      this.sleep();
    };
    Animal.prototype.sleep=function () {
      console.log("睡觉了");
    };

    var dog=new Animal("小苏",20);
    dog.eat();

    //原型对象中的方法,可以相互调用
```

### 4 原型对象指向可以改变

```javascript
    //人的构造函数
    function Person(age) {
      this.age=10;
    }
    //人的原型对象方法
    Person.prototype.eat=function () {
      console.log("人的吃");
    };
    //学生的构造函数
    function Student() {

    }
    Student.prototype.sayHi=function () {
      console.log("嗨,小苏你好帅哦");
    };
    //学生的原型,指向了一个人的实例对象
    Student.prototype=new Person(10);
    var stu=new Student();
    stu.eat();
    stu.sayHi();
```

![原型链指向改变](J:\前端资料\视频教程\javascript-第二阶段\05-javascript高级\3\01教学资料\原型链指向改变.png)







### 5 原型链

**原型链:是一种关系,实例对象和原型对象之间的关系,关系是通过原型(__proto__)来联系的**

每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性

- 搜索首先从对象实例本身开始
- 如果在实例中找到了具有给定名字的属性，则返回该属性的值
- 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
- 如果在原型对象中找到了这个属性，则返回该属性的值

**原型链的最终指向**

```javascript
    function Person() {

    }
    Person.prototype.eat=function () {
      console.log("吃东西");
    };

    var per=new Person();
    console.dir(per);
    console.dir(Person);

    //实例对象中有__proto__原型
    //构造函数中有prototype原型
    //prototype是对象
    //所以,prototype这个对象中也有__proto__,那么指向了哪里
    //实例对象中的__proto__指向的是构造函数的prototype
    //所以,prototype这个对象中__proto__指向的应该是某个构造函数的原型prototype

    //Person的prototype中的__proto__的指向
    //console.log(Person.prototype.__proto__);

    //per实例对象的__proto__------->Person.prototype的__proto__---->Object.prototype的__proto__是null

    console.log(per.__proto__==Person.prototype);
    console.log(per.__proto__.__proto__==Person.prototype.__proto__);
    console.log(Person.prototype.__proto__==Object.prototype);
    console.log(Object.prototype.__proto__);
```

![原型最终的指向](J:\前端资料\技术文件\javascript笔记\我的笔记\picture\原型最终的指向.png)

## 5 继承

面向对象编程思想:根据需求,分析对象,找到对象有什么特征和行为,通过代码的方式来实现需求,要想实现这个需求,就要创建对象,要想创建对象,就应该显示有构造函数,然后通过构造函数来创建对象.,通过对象调用属性和方法来实现相应的功能及需求,即可

* 首先JS不是一门面向对象的语言,JS是一门基于对象的语言,那么为什么学习js还要学习面向对象,因为面向对象的思想适合于人的想法,编程起来会更加的方便,及后期的维护....
* 面向对象的编程语言中有类(class)的概念(也是一种特殊的数据类型),但是JS不是面向对象的语言,所以,JS中没有类(class),但是JS可以模拟面向对象的思想编程,JS中会通过构造函数来模拟类的概念(class)

    * 面向对象的特性:封装,继承,多态
    *
    * 封装:就是包装
    * 一个值存储在一个变量中--封装
    * 一坨重复代码放在一个函数中--封装
    * 一系列的属性放在一个对象中--封装
    * 一些功能类似的函数(方法)放在一个对象中--封装
    * 好多相类似的对象放在一个js文件中---封装
    *
    * 继承: 首先继承是一种关系,类(class)与类之间的关系,JS中没有类,但是可以通过构造函数模拟类,然后通过原型来实现继承
    * 继承也是为了数据共享,js中的继承也是为了实现数据共享
    *
    * 原型作用之一:数据共享,节省内存空间
    * 原型作用之二:为了实现继承
    *
    * 继承是一种关系:
    *
    * 父类级别与类级别的关系
### 1 通过原型继承

```javascript
 function Person(age, name) {
            this.age = age
            this.name = name
            this.eat = function () {
                console.log('吃饭')

            }
        }
        Person.prototype.drink = function () {
            console.log('喝水')

        }
        function Student(study) {
            this.study = study
            this.habby = function () {
                console.log('打球')
            }
        }
        Student.prototype.action = function () {
            console.log('学习')
        }
        Student.prototype = new Person(11, 12)
        var s1 = new Student('语文')
        var s2 = new Student('数学')
        console.log(s1, s2)![1553092656449]()
```
![原型继承](F:\技术文件\javascript笔记\我的笔记\picture\原型继承.png)

这种方式实现的本质是通过将子类的原型指向了父类的实例，所以**子类的实例就可以通过__proto__访问到 Student.prototype 也就是Person的实例，这样就可以访问到父类的私有方法，然后再通过__proto__指向父类的prototype就可以获得到父类原型上的方法**。于是做到了将父类的私有、公有方法和属性都当做子类的公有属性

**优点**

- 父类新增原型方法/原型属性，子类都能访问到
- 简单，易于实现

**缺点**

- 无法实现多继承
- 来自原型对象的所有属性被所有实例共享
- 创建子类实例时，无法向父类构造函数传参
- 要想为子类新增属性和方法，必须要在`Student.prototype = new Person()` 之后执行，不能放到构造器中

### 2 借用构造函数

这种方式关键在于:**在子类型构造函数中通用call()调用父类型构造函数**

```
  function Person(name, age) {
    this.name = name,
    this.age = age,
    this.setName = function () {}
  }
  Person.prototype.setAge = function () {}
  function Student(name, age, price) {
    Person.call(this, name, age)  // 相当于: this.Person(name, age)
    /*this.name = name
    this.age = age*/
    this.price = price
  }
  var s1 = new Student('Tom', 20, 15000)
```

[![img](https://camo.githubusercontent.com/f14aa910b41e399bf08bf24df6e691daa5f89a48/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346461656634633164353262333f773d3130303126683d31333226663d706e6726733d3238323234)](https://camo.githubusercontent.com/f14aa910b41e399bf08bf24df6e691daa5f89a48/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346461656634633164353262333f773d3130303126683d31333226663d706e6726733d3238323234)
这种方式只是实现部分的继承，如果父类的原型还有方法和属性，子类是拿不到这些方法和属性的。

```
console.log(s1.setAge())//Uncaught TypeError: s1.setAge is not a function
```

**特点**：

- 解决了原型链继承中子类实例共享父类引用属性的问题
- 创建子类实例时，可以向父类传递参数
- 可以实现多继承(call多个父类对象)

**缺点**：

- 实例并不是父类的实例，只是子类的实例
- 只能继承父类的实例属性和方法，不能继承原型属性和方法
- 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

### 3 组合继承

这种方式关键在于:**通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。**

```
function Person (name, age) {
  this.name = name,
  this.age = age,
  this.setAge = function () { }
}
Person.prototype.setAge = function () {
  console.log("111")
}
function Student (name, age, price) {
  Person.call(this, name, age)//第二次调用父类构造函数
  this.price = price
  this.setScore = function () { }
}
Student.prototype = new Person()//第一次调用父类构造函数
Student.prototype.constructor = Student//组合继承也是需要修复构造函数指向的
Student.prototype.sayHello = function () { }
var s1 = new Student('Tom', 20, 15000)
var s2 = new Student('Jack', 22, 14000)
console.log(s1)
console.log(s1.constructor) //Student
console.log(p1.constructor) //Person       
```

[![img](https://camo.githubusercontent.com/bf4bb04dd685f54b7bb4495d9a29aa0a993bb14b/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346536633062666336373238313f773d39383926683d33303926663d706e6726733d3334323338)](https://camo.githubusercontent.com/bf4bb04dd685f54b7bb4495d9a29aa0a993bb14b/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346536633062666336373238313f773d39383926683d33303926663d706e6726733d3334323338)
这种方式融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。不过也存在缺点就是无论在什么情况下，都会调用两次构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数的内部，子类型最终会包含父类型对象的全部实例属性，但我们不得不在调用子类构造函数时重写这些属性。

**优点**：

- 可以继承实例属性/方法，也可以继承原型属性/方法
- 不存在引用属性共享问题
- 可传参
- 函数可复用

**缺点**：

- 调用了两次父类构造函数，生成了两份实例

### 4 

**这种方式通过父类原型和子类原型指向同一对象，子类可以继承到父类的公有方法当做自己的公有方法，而且不会初始化两次实例方法/属性，避免的组合继承的缺点**。

```
function Person (name, age) {
  this.name = name,
  this.age = age,
  this.setAge = function () { }
}
Person.prototype.setAge = function () {
  console.log("111")
}
function Student (name, age, price) {
  Person.call(this, name, age)
  this.price = price
  this.setScore = function () { }
}
Student.prototype = Person.prototype
Student.prototype.sayHello = function () { }
var s1 = new Student('Tom', 20, 15000)
console.log(s1)       
```

[![img](https://camo.githubusercontent.com/1662d8f5f75d7ce06bb000869747e3f401e5d6ba/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353330393737643039643331633f773d37323626683d32323326663d706e6726733d3233343538)](https://camo.githubusercontent.com/1662d8f5f75d7ce06bb000869747e3f401e5d6ba/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353330393737643039643331633f773d37323626683d32323326663d706e6726733d3233343538)
但这种方式没办法辨别是对象是子类还是父类实例化

```
console.log(s1 instanceof Student, s1 instanceof Person)//true true
console.log(s1.constructor)//Person
```

**优点**：

- 不会初始化两次实例方法/属性，避免的组合继承的缺点

**缺点**：

- 没办法辨别是实例是子类还是父类创造的，子类和父类的构造函数指向是同一个。

### 5 寄生组合式继承

**借助原型可以基于已有的对象来创建对象，var B = Object.create(A)以A对象为原型，生成了B对象。B继承了A的所有属性和方法。**使用`Object.create()`进行一次浅拷贝，将父类原型上的方法拷贝后赋给Student.prototype，这样子类上就能拥有了父类的共有方法，而且少了一次调用父类的构造函数。

```
function Person (name, age) {
  this.name = name,
  this.age = age
}
Person.prototype.setAge = function () {
  console.log("111")
}
function Student (name, age, price) {
  Person.call(this, name, age)
  this.price = price
  this.setScore = function () { }
}
Student.prototype = Object.create(Person.prototype)//核心代码
Student.prototype.constructor = Student//核心代码
var s1 = new Student('Tom', 20, 15000)
console.log(s1 instanceof Student, s1 instanceof Person) // true true
console.log(s1.constructor) //Student
console.log(s1)       
```

同样的，Student继承了所有的Person原型对象的属性和方法。目前来说，最完美的继承方法！
[![img](https://camo.githubusercontent.com/d208000899c75a204a397d0fad7826fcd3eec98d/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f31312f313636363066616365333034306463363f773d36363826683d31383726663d706e6726733d3230333134)](https://camo.githubusercontent.com/d208000899c75a204a397d0fad7826fcd3eec98d/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f31312f313636363066616365333034306463363f773d36363826683d31383726663d706e6726733d3230333134)

### 6 Es6继承

ES6中引入了class关键字，class可以通过extends关键字实现继承，还可以通过static关键字定义类的静态方法,这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

**需要注意的是，class关键字只是原型的语法糖，JavaScript继承仍然是基于原型实现的**。

```
class Person {
  //调用类的构造方法
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  //定义一般的方法
  showName () {
    console.log("调用父类的方法")
    console.log(this.name, this.age);
  }
}
let p1 = new Person('kobe', 39)
console.log(p1)
//定义一个子类
class Student extends Person {
  constructor(name, age, salary) {
    super(name, age)//通过super调用父类的构造方法
    this.salary = salary
  }
  showName () {//在子类自身定义方法
    console.log("调用子类的方法")
    console.log(this.name, this.age, this.salary);
  }
}
let s1 = new Student('wade', 38, 1000000000)
console.log(s1)
s1.showName()     
```

[![img](https://camo.githubusercontent.com/b523c13dfd9ef012d9f74df994105ebd9e866238/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353337653636323733636264373f773d38353126683d33353926663d706e6726733d3434353439)](https://camo.githubusercontent.com/b523c13dfd9ef012d9f74df994105ebd9e866238/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353337653636323733636264373f773d38353126683d33353926663d706e6726733d3434353439)
**优点**：

- 语法简单易懂,操作更方便

**缺点**：

- 并不是所有的浏览器都支持class关键字

### 7 继承对比

- class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。

- class 声明内部会启用严格模式。

- class 的所有方法（包括静态方法和实例方法）都是不可枚举的。

- class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。

- 必须使用 new 调用 class。

- class 内部无法重写类名。

- ES5:

  继承：ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）

  

  ES6:

  继承：

  1.子类没有自己的this对象，因此必须在construct中通过super继承父类的this对象，然后再用子类的构造函数修改this。不调用super，没有this对象，会报错


## 6 执行上下文

### 1 执行上下文的类型

执行上下文总共有三种类型

- **全局执行上下文**：
  - 只有一个，在执行全局代码前将window确定为全局执行上下文
  - 对全局数据进行预处理
    - var定义的全局变量==>undefined, 添加为window的属性
    - function声明的全局函数==>赋值(fun), 添加为window的方法
    - this==>赋值(window)
  - 开始执行全局代码
- **函数执行上下文**：
  - 存在无数个，在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象
  - 对局部数据进行预处理
    - 形参变量==>赋值(实参)==>添加为执行上下文的属性
    - arguments==>赋值(实参列表), 添加为执行上下文的属性
    - var定义的局部变量==>undefined, 添加为执行上下文的属性
    - function声明的函数 ==>赋值(fun), 添加为执行上下文的方法
    - this==>赋值(调用函数的对象)
  - 开始执行函数体代码
- **Eval 函数执行上下文**： 指的是运行在 `eval` 函数中的代码，很少用而且不建议使用。

### 2 执行栈

因为JS引擎创建了很多的执行上下文，所以JS引擎创建了执行上下文**栈**（Execution context stack，ECS）来**管理**执行上下文。

当 JavaScript 初始化的时候会向执行上下文栈压入一个**全局**执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，执行栈才会被清空，所以程序结束之前， 执行栈最底部永远有个 globalContext。

**练习**

1. 依次输出什么?
2. 整个过程中产生了几个执行上下文?

```javascript
  console.log('global begin: '+ i)
  var i = 1
  foo(1);
  function foo(i) {
    if (i == 4) {
      return;
    }
    console.log('foo() begin:' + i);
    foo(i + 1);
    console.log('foo() end:' + i);
  }
  console.log('global end: ' + i)

```

![1553179699291](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553179699291.png)

### 3 变量提升-函数提升

例子一：**变量提升**

```
foo;  // undefined
var foo = function () {
    console.log('foo1');
}

foo();  // foo1，foo赋值

var foo = function () {
    console.log('foo2');
}

foo(); // foo2，foo重新赋值
```

**注意**

使用var声明的变量会有提升，但是使用let和const声明的变量不会有提升

```javascript
console.log(a);//undefined
console.log(b);//报错
console.log(c);//报错
var a=3;
let b=4;
const c=5;
```

例子二：**函数提升**

```
foo();  // foo2
function foo() {
    console.log('foo1');
}

foo();  // foo2

function foo() {
    console.log('foo2');
}

foo(); // foo2
```

例子三：声明优先级，**函数 > 变量**

```
foo();  // foo2
var foo = function() {
    console.log('foo1');
}

foo();  // foo1，foo重新赋值

function foo() {
    console.log('foo2');
}

foo(); // foo1
```

**函数提升优先级比变量提升要高，且不会被变量声明覆盖，但是会被变量赋值覆盖**

例子如下：

```javascript
function foo(){
    console.log("a");
}
var foo;
console.log(foo);// a  
foo = "b";
console.log(foo);// b
```

## 7 作用域

1. 理解
  * 就是一块"地盘", 一个代码段所在的区域
  * 它是静态的(相对于上下文对象), 在编写代码时就确定了
2. 分类
  * 全局作用域
  * 函数作用域
  * 没有块作用域(ES6有了)
3. 作用
  * 隔离变量，不同作用域下同名变量不会有冲突

###作用域链

1. 理解
  * 多个上下级关系的作用域形成的链, 它的方向是从下向上的(从内到外)
  * 查找变量时就是沿着作用域链来查找的
2. 查找一个变量的查找规则
  * 在当前作用域下的执行上下文中查找对应的属性, 如果有直接返回, 否则进入2
  * 在上一级作用域的执行上下文中查找对应的属性, 如果有直接返回, 否则进入3
  * 再次执行2的相同操作, 直到全局作用域, 如果还找不到就抛出找不到的异常

```javascript
  var a = 2;
  function fn1() {
    var b = 3;
    function fn2() {
      var c = 4;
      console.log(c);
      console.log(b);
      console.log(a);
      console.log(d);
    }

    fn2();
  }
  fn1();
```

**思考**

```javascript
  var x = 10;
  function fn() {
    console.log(x);
  }
  function show(f) {
    var x = 20;
    f();
  }
  show(fn);//10
```

作用域在写代码时就确立了，不会改变

## 8 闭包

### 1 闭包的概念

1. 如何产生闭包?
  * 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包
2. 闭包到底是什么?
  * 使用chrome调试查看
  * 理解一: 闭包是嵌套的内部函数(绝大部分人)
  * 理解二: 包含被引用变量(函数)的对象(极少数人)
  * 注意: 闭包存在于嵌套的内部函数中
3. 产生闭包的条件?
  * 函数嵌套
  * 内部函数引用了外部函数的数据(变量/函数)

### 2 闭包的模式

 * 函数模式

   ```javascript
   function f1(){
       var num=10;
       function f2(){
           console.log(num)
       }
       f2();
   } 
   f1()
   ```

 * 对象模式

   ```javascript
       function f3() {
         var num=10;
        var obj={
           age:num
         };
         console.log(obj.age);//10
       }
       f3();
   ```

### 3 闭包的生命周期

* 产生: 在嵌套内部函数定义执行完时就产生了(不是在调用)

* 死亡: 在嵌套的内部函数成为垃圾对象时

```javascript
  function fun1() {
    //此处闭包已经产生
    var a = 3;
    function fun2() {
      a++;
      console.log(a);
    }
    return fun2;
  }
  var f = fun1();
  f();
  f();
  f = null //此时闭包对象死亡
```

* 在上面的这段代码中，在函数fun1中，由于函数声明的提升，在函数定义时就产生闭包，不需要调用函数。此时会将a变量数据缓存在闭包中，当fun1函数执行完之后，fun2函数对象不会消失，这是因为变量f指向fun2对象。所以当f=null之后，这个指向关系断开，fun2成为垃圾对象，会被浏览器的垃圾回收机制回收。

  **断点调试---代码执行过程**

* ![1553243719774](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553243719774.png)

![1553244218022](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1553244218022.png)

### 4 闭包的作用

1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)

2. 可以定义js模块，设计私有的方法和变量,不会污染全局变量，将所有的数据和功能都封装在一个函数内部(私有的)，只向外暴露一个包含n个方法的对象或函数，只需要通过模块暴露的对象调用方法来实现对应的功能，jquery大量使用了闭包

     ```
     function module() {
     	var arr = [];
     	function add(val) {
     		if (typeof val == 'number') {
     			arr.push(val);
     		}
     	}
     	function get(index) {
     		if (index < arr.length) {
     			return arr[index]
     		} else {
     			return null;
     		}
     	}
     	return {
     		add: add,
     		get: get
     	}
     }
     var mod1 = module();
     mod1.add(1);
     mod1.add(2);
     mod1.add('xxx');
     console.log(mod1.get(2));
     ```

### 5 闭包的优缺点

* 优点：不会污染全局环境，实现属性私有化，方便模块化开发，减少形参的个数，延长形参的生命周期

* 缺点：变量不会被清除，会被缓存下来，此时的变量是保存在堆中，大量使用闭包会造成内存泄露，在退出函数之前，将不使用的变量全部删除。

### 6 闭包思的this指向

this指向调用时所处的环境，闭包中的this指向window

思考题 1：

```javascript
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  }
};
console.log(object.getNameFunc()())//The window
//这个题没有闭包，有函数嵌套，但是内部函数没有访问外部函数的变量。当object.getNameFunc()执行完后返回的是一个函数，当调用这个函数的时候，此时的this是window
```

思考题 2：

```javascript
var name = "The Window";　　
var object = {　　　　
  name: "My Object",
  getNameFunc: function () {
    var that = this;
    return function () {
      return that.name;
    };
  }
};
console.log(object.getNameFunc()())// my object
//产生闭包，object.getNameFunc()调用的时候，此时的this是指向object对象，将object对象赋值给that，此时that指向object，当调用返回后的函数时，此时指向的是that.name，即object的name属性
```

思考题3：

```javascript
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();  // 3
data[1]();  // 3
data[2]();  // 3
//如何输出123
方法1：立即执行函数
for (var i = 0; i < 3; i++) {
    (function(num) {
        setTimeout(function() {
            console.log(num);
        }, 1000);
    })(i);
}
// 0
// 1
// 2
方法2：返回一个匿名函数赋值
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (num) {
      return function(){
          console.log(num);
      }
  })(i);
}

data[0]();	// 0
data[1]();	// 1
data[2]();	// 2
无论是立即执行函数还是返回一个匿名函数赋值，原理上都是因为变量的按值传递，所以会将变量i的值复制给实参num，在匿名函数的内部又创建了一个用于访问num的匿名函数，这样每个函数都有了一个num的副本，互不影响了。

方法3：使用ES6中的let
var data = [];

for (let i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
解释下原理：

var data = [];// 创建一个数组data;

// 进入第一次循环
{ 
	let i = 0; // 注意：因为使用let使得for循环为块级作用域
	           // 此次 let i = 0 在这个块级作用域中，而不是在全局环境中
    data[0] = function() {
    	console.log(i);
	};
}
循环时，let声明i,所以整个块是块级作用域，那么data[0]这个函数就成了一个闭包。这里用｛｝表达并不符合语法，只是希望通过它来说明let存在时，这个for循环块是块级作用域，而不是全局作用域。

上面的块级作用域，就像函数作用域一样，函数执行完毕，其中的变量会被销毁，但是因为这个代码块中存在一个闭包，闭包的作用域链中引用着块级作用域，所以在闭包被调用之前，这个块级作用域内部的变量不会被销毁。

// 进入第二次循环
{ 
	let i = 1; // 因为 let i = 1 和上面的 let i = 0     
	           // 在不同的作用域中，所以不会相互影响
	data[1] = function(){
         console.log(i);
	}; 
}
当执行data[1]()时，进入下面的执行环境。

{ 
     let i = 1; 
     data[1] = function(){
          console.log(i);
     }; 
}
在上面这个执行环境中，它会首先寻找该执行环境中是否存在i，没有找到，就沿着作用域链继续向上到了其所在的块作用域执行环境，找到了i = 1,于是输出了1。
```



## 9 内存溢出-内存泄露

### 1 内存溢出

- 一种程序运行出现的错误
- 当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误

###2 内存泄露

- 占用的内存没有及时释放
- 内存泄露积累多了就容易导致内存溢出
- 常见的内存泄露:
  - 意外的全局变量
    * 变量声明时忘记写var
  - 没有及时清理的计时器或回调函数
  - 闭包

### 3 垃圾回收机制

JavaScript有自动垃圾收集机制，垃圾收集器会每隔一段时间就执行一次释放操作，找出那些不再继续使用的值，然后释放其占用的内存。

- 局部变量和全局变量的销毁
  - **局部变量**：局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。
  - **全局变量**：全局变量什么时候需要自动释放内存空间则很难判断，所以在开发中尽量**避免**使用全局变量。
- 以Google的V8引擎为例，V8引擎中所有的JS对象都是通过堆来进行内存分配的
  - **初始分配**：当声明变量并赋值时，V8引擎就会在堆内存中分配给这个变量。
  - **继续申请**：当已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止。
- V8引擎对堆内存中的JS对象进行分代管理
  - **新生代**：存活周期较短的JS对象，如临时变量、字符串等。
  - **老生代**：经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等

#### 垃圾回收算法

对垃圾回收算法来说，核心思想就是如何判断内存已经不再使用，常用垃圾回收算法有下面两种。

- 引用计数（现代浏览器不再使用）
- 标记清除（常用）

##### 引用计数

引用计数算法定义“内存不再使用”的标准很简单，就是看一个对象是否有指向它的**引用**。如果没有其他对象指向它了，说明该对象已经不再需要了。

```
// 创建一个对象person，他有两个指向属性age和name的引用
var person = {
    age: 12,
    name: 'aaaa'
};

person.name = null; // 虽然name设置为null，但因为person对象还有指向name的引用，因此name不会回收

var p = person; 
person = 1;         //原来的person对象被赋值为1，但因为有新引用p指向原person对象，因此它不会被回收

p = null;           //原person对象已经没有引用，很快会被回收
```

引用计数有一个致命的问题，那就是**循环引用**

如果两个对象相互引用，尽管他们已不再使用，但是垃圾回收器不会进行回收，最终可能会导致内存泄露。

```
function cycle() {
    var o1 = {};
    var o2 = {};
    o1.a = o2;
    o2.a = o1; 

    return "cycle reference!"
}

cycle();
```

`cycle`函数执行完成之后，对象`o1`和`o2`实际上已经不再需要了，但根据引用计数的原则，他们之间的相互引用依然存在，因此这部分内存不会被回收。所以现代浏览器**不再使用**这个算法。

但是IE依旧使用。

```
var div = document.createElement("div");
div.onclick = function() {
    console.log("click");
};
```

上面的写法很常见，但是上面的例子就是一个循环引用。

变量div有事件处理函数的引用，同时事件处理函数也有div的引用，因为div变量可在函数内被访问，所以循环引用就出现了。

##### 标记清除（常用）

标记清除算法将“不再使用的对象”定义为“**无法到达的对象**”。即从根部（在JS中就是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，**保留**。那些从根部出发无法触及到的对象被标记为**不再使用**，稍后进行回收。

无法触及的对象包含了没有引用的对象这个概念，但反之未必成立。

所以上面的例子就可以正确被垃圾回收处理了。

所以现在对于主流浏览器来说，只需要切断需要回收的对象与根部的联系。最常见的内存泄露一般都与DOM元素绑定有关：

```
email.message = document.createElement(“div”);
displayList.appendChild(email.message);

// 稍后从displayList中清除DOM元素
displayList.removeAllChildren();
```

上面代码中，`div`元素已经从DOM树中清除，但是该`div`元素还绑定在email对象中，所以如果email对象存在，那么该`div`元素就会一直保存在内存中。

#### 内存泄漏

对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。 对于不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）

#### 内存泄漏识别方法

##### 浏览器方法

1. 打开开发者工具，选择 Memory
2. 在右侧的Select profiling type字段里面勾选 timeline
3. 点击左上角的录制按钮。
4. 在页面上进行各种操作，模拟用户的使用情况。
5. 一段时间后，点击左上角的 stop 按钮，面板上就会显示这段时间的内存占用情况。

##### 命令行方法

使用 `Node` 提供的 `process.memoryUsage` 方法。

```
console.log(process.memoryUsage());

// 输出
{ 
  rss: 27709440,		// resident set size，所有内存占用，包括指令区和堆栈
  heapTotal: 5685248,   // "堆"占用的内存，包括用到的和没用到的
  heapUsed: 3449392,	// 用到的堆的部分
  external: 8772 		// V8 引擎内部的 C++ 对象占用的内存
}
```

判断内存泄漏，以`heapUsed`字段为准。

### 4 常见的内存泄露的场景

- 缓存
- 作用域未释放（闭包）
- 没有必要的全局变量
- 无效的DOM引用
- 定时器未清除
- 事件监听为空白

**内存泄露优化**

1. 在业务不需要的用到的内部函数，可以重构到函数外，实现解除闭包。
2. 避免创建过多的生命周期较长的对象，或者将对象分解成多个子对象。
3. 避免过多使用闭包。
4. 注意清除定时器和事件监听器。
5. nodejs中使用stream或buffer来操作大文件，不会受nodejs内存限制

## 10 js运行机制

### 1 浏览器中的运行机制

JavaScript是单线程，**同一个时间只能做一件事**。
JavaScript的单线程，主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

#### **1.1 任务队列**

avaScript所有任务分成两种，**一种是同步任务（synchronous），另一种是异步任务（asynchronous）**。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。**异步任务包括宏任务和微任务**

![js运行机制](J:\前端资料\技术文件\javascript笔记\我的笔记\picture\js运行机制.jpg)

#### 1.2 理解Event Loop

**异步执行的运行机制如下：**

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

**主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制**。这个过程会循环反复。

#### 1.3 异步任务队列及放入时机

一般来说，有以下四种会放入异步任务队列：

1. setTimeout和setlnterval
2. DOM事件
3. ES6中的Promise
4. Ajax异步请求

**javascript 代码运行分两个阶段**：

* 预解析---把所有的函数定义提前，所有的变量声明提前，变量的赋值不提前

* 执行---从上到下执行（按照js运行机制）

至于放入异步任务队列的时机，我们通过 setTimeout的例子

```
例题1
for (var i = 0; i < 5; i++) {
setTimeout(function() {  
 console.log(i);  
  }, 1000);
}
请问最后的输出结果是什么？
```

for循环一次碰到一个 setTimeout()，**并不是马上把setTimeout()拿到异步队列中，而要等到一秒后，才将其放到任务队列里面**，一旦"执行栈"中的所有同步任务执行完毕（即for循环结束，此时i已经为5），系统就会读取已经存放"任务队列"的setTimeout()（有五个），于是答案是输出5个5。

上面也提到，**在到达指定时间时，定时器就会将相应回调函数插入“任务队列”尾部。这就是“定时器（timer）”功能**。

#### **1.4 微任务与宏任务**

我们上面提到异步任务分为宏任务和微任务，**宏任务队列可以有多个，微任务队列只有一个**。

- 宏任务包括：**script(全局任务)**, setTimeout, setInterval, setImmediate, I/O, UI rendering。
- 微任务包括: new Promise().then(回调), process.nextTick, Object.observe(已废弃), MutationObserver(html5新特性)

**当执行栈中的所有同步任务执行完毕时，是先执行宏任务还是微任务呢？**

- 由于执行代码入口都是全局任务 script，而全局任务属于宏任务，所以当栈为空，同步任务任务执行完毕时，会先执行微任务队列里的任务。
- 微任务队列里的任务全部执行完毕后，会读取宏任务队列中拍最前的任务。
- 执行宏任务的过程中，遇到微任务，依次加入微任务队列。
- 栈空后，再次读取微任务队列里的任务，依次类推。

![事件循环](J:\前端资料\技术文件\浏览器考点\image\事件循环.png)

一句话概括上面的流程图：**当某个宏任务队列的中的任务全部执行完以后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，就查看是否有其他宏任务队列**。

接下来我们看两道例子来介绍上面流程：

```
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)
```

最后输出结果是Promise1，setTimeout1，Promise2，setTimeout2

- 一开始执行栈的同步任务执行完毕，会去查看是否有微任务队列，上题中存在(有且只有一个)，然后执行微任务队列中的所有任务输出Promise1，同时会生成一个宏任务 setTimeout2
- 然后去查看宏任务队列，宏任务 setTimeout1 在 setTimeout2 之前，先执行宏任务 setTimeout1，输出 setTimeout1
- 在执行宏任务setTimeout1时会生成微任务Promise2 ，放入微任务队列中，接着先去清空微任务队列中的所有任务，输出 Promise2
- 清空完微任务队列中的所有任务后，就又会去宏任务队列取一个，这回执行的是 setTimeout2

```
console.log('----------------- start -----------------');
setTimeout(() => {
  console.log('setTimeout');
}, 0)
new Promise((resolve, reject) =>{
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  resolve();  // 修改promise实例对象的状态为成功的状态
}).then(() => {
  console.log('promise实例成功回调执行');
})
console.log('----------------- end -----------------');
```

![1554297002197](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1554297002197.png)

**注意**：promise实例创建后会立即执行里面的函数，new Promise应该是同步任务，执行then（）才是异步

#### 1.5面试题考察

```javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```



第一轮事件循环流程分析如下：

- 整体script作为第一个宏任务进入主线程，遇到`console.log`，输出1。
- 遇到`setTimeout`，其回调函数被分发到宏任务Event Queue中。我们暂且记为`setTimeout1`。
- 遇到`process.nextTick()`，其回调函数被分发到微任务Event Queue中。我们记为`process1`。
- 遇到`Promise`，`new Promise`直接执行，输出7。`then`被分发到微任务Event Queue中。我们记为`then1`。
- 又遇到了`setTimeout`，其回调函数被分发到宏任务Event Queue中，我们记为`setTimeout2`。

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
| setTimeout1       | process1          |
| setTimeout2       | then1             |

- 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
- 我们发现了`process1`和`then1`两个微任务。
- 执行`process1`,输出6。
- 执行`then1`，输出8。

好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。那么第二轮时间循环从`setTimeout1`宏任务开始：

- 首先输出2。接下来遇到了`process.nextTick()`，同样将其分发到微任务Event Queue中，记为`process2`。`new Promise`立即执行输出4，`then`也分发到微任务Event Queue中，记为`then2`。

| 宏任务Event Queue | 微任务Event Queue |
| :---------------- | ----------------- |
| setTimeout2       | process2          |
|                   | then2             |

- 第二轮事件循环宏任务结束，我们发现有`process2`和`then2`两个微任务可以执行。
- 输出3。
- 输出5。
- 第二轮事件循环结束，第二轮输出2，4，3，5。
- 第三轮事件循环开始，此时只剩setTimeout2了，执行。
- 直接输出9。
- 将`process.nextTick()`分发到微任务Event Queue中。记为`process3`。
- 直接执行`new Promise`，输出11。
- 将`then`分发到微任务Event Queue中，记为`then3`。

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
|                   | process3          |
|                   | then3             |

- 第三轮事件循环宏任务执行结束，执行两个微任务`process3`和`then3`。
- 输出10。
- 输出12。
- 第三轮事件循环结束，第三轮输出9，11，10，12。

整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。

### 2 node.js中的Event Loop

js的运行机制上面已讲述，在事件循环的时候，node与浏览器有所不同

## 11 javascript设计模式

### 11.1 观察着模式



### 11.2 构造函数模式

```javascript
/**
 * 构造一个动物的函数 
 */
function Animal(name, color){
    this.name = name;
    this.color = color;
    this.getName = function(){
        return this.name;
    }
}
// 实例一个对象
var cat = new Animal('猫', '白色');
console.log( cat.getName() );
```

### 11.3 工厂模式

```javascript
/**
 * 工厂模式
 */
function Animal(opts){
    var obj = new Object();
    obj.name = opts.name;
    obj.color = opts.color;
    obj.getInfo = function(){
        return '名称：'+obj.name +'， 颜色：'+ obj.color;
    }
    return obj;
}
var cat = Animal({name: '波斯猫', color: '白色'});
cat.getInfo();
```

### 11.4 单例模式

```javascript
/**
 * 在执行当前 Single 只获得唯一一个对象
 */
var Single = (function(){
    var instance;
    function init() {
        //define private methods and properties
        //do something
        return {
            //define public methods and properties
        };
    }

    return {
        // 获取实例
        getInstance:function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    }
})();

var obj1 = Single.getInstance();
var obj2 = Single.getInstance();

console.log(obj1 === obj2);
```

### 11.5 混合模式

```javascript
/**
 * 混合模式 = 原型模式 + 构造函数模式
 */
function Animal(name, color){
    this.name = name;
    this.color = color;

    console.log( this.name  +  this.color)
}
Animal.prototype.getInfo = function(){
    console.log('名称：'+ this.name);
}

function largeCat(name, color){
    Animal.call(null, name, color);

    this.color = color;
}

largeCat.prototype = create(Animal.prototype);
function create (parentObj){
    function F(){}
    F.prototype = parentObj;
    return new F();
};

largeCat.prototype.getColor = function(){
    return this.color;
}
var cat = new largeCat("Persian", "白色");
console.log( cat )
```

## 12 js实现多线程

### 12.1 概述

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

Web Worker 有以下几个使用注意点。

（1）**同源限制**

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）**DOM 限制**

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以`navigator`对象和`location`对象。

（3）**通信联系**

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（4）**脚本限制**

Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（5）**文件限制**

Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。

### 12.2 用法

#### 1 主线程

主线程采用`new`命令，调用`Worker()`构造函数，新建一个 Worker 线程。

> ```javascript
> var worker = new Worker('work.js');
> ```

`Worker()`构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。

然后，主线程调用`worker.postMessage()`方法，向 Worker 发消息。

> ```javascript
> worker.postMessage('Hello World');
> worker.postMessage({method: 'echo', args: ['Work']});
> ```

`worker.postMessage()`方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。

接着，主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。

> ```javascript
> worker.onmessage = function (event) {
>   console.log('Received message ' + event.data);
>   doSomething();
> }
> 
> function doSomething() {
>   // 执行任务
>   worker.postMessage('Work done!');
> }
> ```

上面代码中，事件对象的`data`属性可以获取 Worker 发来的数据。

Worker 完成任务以后，主线程就可以把它关掉。

> ```javascript
> worker.terminate();
> ```



#### 2 worker线程

Worker 线程内部需要有一个监听函数，监听`message`事件。

> ```javascript
> self.addEventListener('message', function (e) {
>   self.postMessage('You said: ' + e.data);
> }, false);
> ```

上面代码中，`self`代表子线程自身，即子线程的全局对象。因此，等同于下面两种写法。

> ```javascript
> // 写法一
> this.addEventListener('message', function (e) {
>   this.postMessage('You said: ' + e.data);
> }, false);
> 
> // 写法二
> addEventListener('message', function (e) {
>   postMessage('You said: ' + e.data);
> }, false);
> ```

除了使用`self.addEventListener()`指定监听函数，也可以使用`self.onmessage`指定。监听函数的参数是一个事件对象，它的`data`属性包含主线程发来的数据。`self.postMessage()`方法用来向主线程发送消息。

根据主线程发来的数据，Worker 线程可以调用不同的方法，下面是一个例子。

> ```javascript
> self.addEventListener('message', function (e) {
>   var data = e.data;
>   switch (data.cmd) {
>     case 'start':
>       self.postMessage('WORKER STARTED: ' + data.msg);
>       break;
>     case 'stop':
>       self.postMessage('WORKER STOPPED: ' + data.msg);
>       self.close(); // Terminates the worker.
>       break;
>     default:
>       self.postMessage('Unknown command: ' + data.msg);
>   };
> }, false);
> ```

上面代码中，`self.close()`用于在 Worker 内部关闭自身。

#### 3 worker加载脚本

Worker 内部如果要加载其他脚本，有一个专门的方法`importScripts()`。

> ```javascript
> importScripts('script1.js');
> ```

该方法可以同时加载多个脚本。

> ```javascript
> importScripts('script1.js', 'script2.js');
> ```

#### 4 错误处理

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的`error`事件。

> ```javascript
> worker.onerror(function (event) {
>   console.log([
>     'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
>   ].join(''));
> });
> 
> // 或者
> worker.addEventListener('error', function (event) {
>   // ...
> });
> ```

Worker 内部也可以监听`error`事件。

#### 5 关闭worker

使用完毕，为了节省系统资源，必须关闭 Worker。

> ```javascript
> // 主线程
> worker.terminate();
> 
> // Worker 线程
> self.close();
> ```

### 12.3 数据通信

前面说过，主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型，也可以在线程之间发送。下面是一个例子。

> ```javascript
> // 主线程
> var uInt8Array = new Uint8Array(new ArrayBuffer(10));
> for (var i = 0; i < uInt8Array.length; ++i) {
>   uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
> }
> worker.postMessage(uInt8Array);
> 
> // Worker 线程
> self.onmessage = function (e) {
>   var uInt8Array = e.data;
>   postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString());
>   postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength);
> };
> ```

但是，拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做[Transferable Objects](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects)。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。

如果要直接转移数据的控制权，就要使用下面的写法。

> ```javascript
> // Transferable Objects 格式
> worker.postMessage(arrayBuffer, [arrayBuffer]);
> 
> // 例子
> var ab = new ArrayBuffer(1);
> worker.postMessage(ab, [ab]);
> ```

### 12.4 同页面的 Web Worker

通常情况下，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

> ```markup
> <!DOCTYPE html>
>   <body>
>     <script id="worker" type="app/worker">
>       addEventListener('message', function () {
>         postMessage('some message');
>       }, false);
>     </script>
>   </body>
> </html>
> ```

上面是一段嵌入网页的脚本，注意必须指定`<script>`标签的`type`属性是一个浏览器不认识的值，上例是`app/worker`。

然后，读取这一段嵌入页面的脚本，用 Worker 来处理。

> ```javascript
> var blob = new Blob([document.querySelector('#worker').textContent]);
> var url = window.URL.createObjectURL(blob);
> var worker = new Worker(url);
> 
> worker.onmessage = function (e) {
>   // e.data === 'some message'
> };
> ```

上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。

### 12.5实例：Worker 线程完成轮询

有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。

> ```javascript
> function createWorker(f) {
>   var blob = new Blob(['(' + f.toString() +')()']);
>   var url = window.URL.createObjectURL(blob);
>   var worker = new Worker(url);
>   return worker;
> }
> 
> var pollingWorker = createWorker(function (e) {
>   var cache;
> 
>   function compare(new, old) { ... };
> 
>   setInterval(function () {
>     fetch('/my-api-endpoint').then(function (res) {
>       var data = res.json();
> 
>       if (!compare(data, cache)) {
>         cache = data;
>         self.postMessage(data);
>       }
>     })
>   }, 1000)
> });
> 
> pollingWorker.onmessage = function () {
>   // render data
> }
> 
> pollingWorker.postMessage('init');
> ```

上面代码中，Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。

### 12.6实例： Worker 新建 Worker

Worker 线程内部还能再新建 Worker 线程（目前只有 Firefox 浏览器支持）。下面的例子是将一个计算密集的任务，分配到10个 Worker。

主线程代码如下。

> ```javascript
> var worker = new Worker('worker.js');
> worker.onmessage = function (event) {
>   document.getElementById('result').textContent = event.data;
> };
> ```

Worker 线程代码如下。

> ```javascript
> // worker.js
> 
> // settings
> var num_workers = 10;
> var items_per_worker = 1000000;
> 
> // start the workers
> var result = 0;
> var pending_workers = num_workers;
> for (var i = 0; i < num_workers; i += 1) {
>   var worker = new Worker('core.js');
>   worker.postMessage(i * items_per_worker);
>   worker.postMessage((i + 1) * items_per_worker);
>   worker.onmessage = storeResult;
> }
> 
> // handle the results
> function storeResult(event) {
>   result += event.data;
>   pending_workers -= 1;
>   if (pending_workers <= 0)
>     postMessage(result); // finished!
> }
> ```

上面代码中，Worker 线程内部新建了10个 Worker 线程，并且依次向这10个 Worker 发送消息，告知了计算的起点和终点。计算任务脚本的代码如下。

> ```javascript
> // core.js
> var start;
> onmessage = getStart;
> function getStart(event) {
>   start = event.data;
>   onmessage = getEnd;
> }
> 
> var end;
> function getEnd(event) {
>   end = event.data;
>   onmessage = null;
>   work();
> }
> 
> function work() {
>   var result = 0;
>   for (var i = start; i < end; i += 1) {
>     // perform some complex calculation here
>     result += 1;
>   }
>   postMessage(result);
>   close();
> }
> ```

### 12.7API

#### 1 主线程

浏览器原生提供`Worker()`构造函数，用来供主线程生成 Worker 线程。

> ```javascript
> var myWorker = new Worker(jsUrl, options);
> ```

`Worker()`构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。

> ```javascript
> // 主线程
> var myWorker = new Worker('worker.js', { name : 'myWorker' });
> 
> // Worker 线程
> self.name // myWorker
> ```

`Worker()`构造函数返回一个 Worker 线程对象，用来供主线程操作 Worker。Worker 线程对象的属性和方法如下。

> - Worker.onerror：指定 error 事件的监听函数。
> - Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在`Event.data`属性中。
> - Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
> - Worker.postMessage()：向 Worker 线程发送消息。
> - Worker.terminate()：立即终止 Worker 线程。

#### 2  Worker 线程

Web Worker 有自己的全局对象，不是主线程的`window`，而是一个专门为 Worker 定制的全局对象。因此定义在`window`上面的对象和方法不是全部都可以使用。

Worker 线程有一些自己的全局属性和方法。

> - self.name： Worker 的名字。该属性只读，由构造函数指定。
> - self.onmessage：指定`message`事件的监听函数。
> - self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
> - self.close()：关闭 Worker 线程。
> - self.postMessage()：向产生这个 Worker 线程发送消息。
> - self.importScripts()：加载 JS 脚本。

## 13 深浅拷贝

### 13.1 浅拷贝

1.Object.assign()

Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象 

2.Array.prototype.concat()

3.Array.prototype.slice()

### 13.2 深拷贝

1.JSON.parse(JSON.stringify())

原理： 用JSON.stringify将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

**这种方法虽然可以实现数组或对象深拷贝,但不能处理函数**

```
let arr = [1, 3, {
    username: ' kobe'
},function(){}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)
```

[![img](https://camo.githubusercontent.com/cd2a62ed3493b2a43f1524ae8dc14a6c4ef18360/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f372f33302f313634653664616131346131663862653f773d34333826683d31313826663d706e6726733d3132313535)](https://camo.githubusercontent.com/cd2a62ed3493b2a43f1524ae8dc14a6c4ef18360/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f372f33302f313634653664616131346131663862653f773d34333826683d31313826663d706e6726733d3132313535)
这是因为JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串，不能接受函数

2 递归方法实现深度克隆原理：**遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝**

```javascript
//定义检测数据类型的功能函数
function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}
//实现深度克隆---对象/数组
function clone(target) {
  //判断拷贝的数据类型
  //初始化变量result 成为最终克隆的数据
  let result,
    targetType = checkedType(target)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return target
  }
  //遍历目标数据
  for (let i in target) {
    //获取遍历数据结构的每一项值。
    let value = target[i]
    //判断目标结构里的每一值是否存在对象/数组
    if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
      //对象/数组里嵌套了对象/数组
      //继续遍历获取到value值
      result[i] = clone(value)
    } else {
      //获取到value值是基本的数据类型或者是函数。
      result[i] = value
    }
  }
  return result
}
```

3.函数库lodash

该函数库也有提供_.cloneDeep用来做 Deep Copy

```
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
// false
```

## 14  call apply bind

### 14.1 call()

call()方法用于改变this指向

```javascript
var value = 2;
var foo = {
    value: 1
};

function bar(val) {
    console.log(this.value,val);
}

bar.call(foo,5); // 1
```

通过上面的介绍我们知道，`call()`主要有以下两点

- 1、`call()`改变了this的指向
- 2、函数 `bar` 执行了

实现方式

* 1、要先原型上即 Function.prototype上编程

- 2、将函数设置为对象的属性：`foo.fn = bar`
- 3、执行函数：`foo.fn()`
- 4、删除函数：`delete foo.fn`
- 5、返回执行结果

```javascript
Function.prototype.call = function (context) {
  context = context || window; 
  context.fn = this;

  let args = [...arguments].slice(1);
  let result = context.fn(...args);

  delete context.fn
  return result;
}
```

### 14.2 apply

apply(obj,arr)

```javascript
Function.prototype.apply = function (context, arr) {
    context = context || window; 
    context.fn = this;
  
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr);
    }
      
    delete context.fn
    return result;
}
```

### 14.3 bind()

`bind` 方法与 `call / apply` 最大的不同就是bind返回一个绑定上下文的**函数**，而后两者是**直接执行**了函数

```javascript
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};

bar.call(foo, "Jack", 20); // 直接执行了函数
// {value: 1, name: "Jack", age: 20}

var bindFoo1 = bar.bind(foo, "Jack", 20); // 返回一个函数
bindFoo1();
// {value: 1, name: "Jack", age: 20}

var bindFoo2 = bar.bind(foo, "Jack"); // 返回一个函数
bindFoo2(20);
// {value: 1, name: "Jack", age: 20}

```

通过上述代码可以看出bind 有如下特性：

1、可以指定this
2、返回一个函数
3、可以传入参数
4、柯里化

代码实现

```javascript
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

