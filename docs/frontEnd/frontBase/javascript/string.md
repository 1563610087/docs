# 字符串操作

字符串所有的方法，都不会修改字符串本身(字符串是不可变的)，操作完成会返回一个新的字符串

##  1 字符串对象

```
var str=new String
console.dir(str)
//可以查看字符串对象的方法
```

通常定义的字符串所调用的方法都是String对象的原型方法

### 1 slice(start,end)

slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分

* 提取字符的起始位置，第一个字符为0
* 结束位置的下标，未指定，则直接到结尾，为负数，则从尾部算位置

```javascript
var str='eferew3434234'
var b=str.slice(2,4)
console.log(b)//er
```

### 2 match(regexp)

match() 方法可在字符串内检索一个或多个正则表达式的匹配。

该方法和正则表达式结合使用

```javascript
var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/gi);//ain,AIN,ain,ain
console.log(n instanceof Array)//match返回的是一个数组
```

### 3 repeat(count)

将一个字符串重复指定次数输出

### 4 startsWith(str,start)

查找字符串是否是以指定的字符串str开头，结果返回boolean，true、false

### 5 split()

讲一个字符串按照指定的参数拆分，结果返回新的数组，不会改变原字符串

```javascript
var str="How are you doing today?";
var n=str.split(" ");
console.log(n)
//["How", "are", "you", "doing", "today?"]
```

### 6 includes(str,start)

includes() 方法用于判断字符串是否包含指定的子字符串。

如果找到匹配的字符串则返回 true，否则返回 false

```javascript
var str = "Hello world, welcome to the Runoob。";
console.log(str.includes("world"));//true
```

### 7 charAt(index)

可以返回字符串中指定位置的字符

根据索引获取指定的字符

```javascript
var str='343fef233'
var a=str.charAt(6);
console.log(a)
```

### 8 charCodeAt(index)

获取指定位置的字符unicode编码

```javascript
var str='343fef233'
var a=str.charCodeAt(6);
console.log(a)//50
```

### 9 fromCharCode(编码)

可以根据字符编码去获取字符

```javascript
result=String.fromCharCode(50)
console.log(result)//2
```

### 10 concat(str1,str2,,,str3)

连接两个或多个字符串，不改变原字符串

### 11 indexOf(str,start)

该方法检索一个字符串是否含有指定的内容

### 12 lastIndexOf(str,start)

从最后开始往前进行查找检索是否含有指定的内容

### 13 subString(start,end)

和slice()功能一样

区别：不同传负值

​	    如果第二个参数小于第一个参数，则自动交换位置

```javascript
var str='143'
console.log(str.subString(1,0))//
```

### 14 toUpperCase()

将字符串转换为大写

### 15 toLowerCase()

将字符串转换为小写

```javascript
var str='efERERErew3434234'
var b=str.toUpperCase()
console.log(b)//EFEREREREW3434234
console.log(str.toLowerCase())//eferererew3434234
```

### 16 trim()

去掉字符串头部和尾部的空格

```javascript
var str = "       Runoob        ";
alert(str.trim());
```

