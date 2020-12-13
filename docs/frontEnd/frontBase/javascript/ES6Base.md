# ES6基础入门

## 1 let 与 const

### 1.1 let

####基本用法

* ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效

#### 特征

1. 有块级作用域
   * let声明的变量有块级作用域，只在块级作用域中有效

```javascript
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
//for循环每次循环都声明一个变量i,每个变量i在不同的作用域
```

2. 没有变量提升

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

3. 不能重复声明变量

`let`不允许在相同作用域内，重复声明同一个变量

```javascript
let a = 1;
let a = 2;
console.log(a)//SyntaxError: Identifier 'a' has already been declared
//======================
let a = 1;
{
    let a = 2;
    console.log(a)//2
}
//在不同作用域即可重复声明
```

**注意**：在node中运行报错，在浏览器中依旧执行，浏览器应该是考虑兼容性问题

4 暂时性死区

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错

### 1.2 const

####基本用法

`const`声明一个只读的常量。一旦声明，常量的值就不能改变

#### 特征

1. const声明的常量不得修改

```javascript
const PI = 3.1415;
PI // 3.1415
PI = 3;
// TypeError: Assignment to constant variable.
```

`const`声明的变量不得改变值，这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值

```javascript
const a ;
a = 2;
console.log(a)//Uncaught SyntaxError: Missing initializer in const declaration
```

2. const含有作用域，没有变量提升

   与let指令相同

3. 不能重复声明

#### 本质

`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心

```javascript
const a={
  name:'hah',
  age:'18'
}
console.log(a)//{name: "hah", age: "18"}
a.name='heh';
a.age='20';
console.log(a)//{name: "heh", age: "20"}
const a={
  name:'xiaozhu'
}
console.log(a)//SyntaxError: Identifier 'a' has already been declared
```

| 相同点 | 相同点         | 不同点                                |
| ------ | -------------- | ------------------------------------- |
|        | 有块级作用域   | let声明的是变量                       |
|        | 没有变量提升   | const声明常量且不允许修改，声明即赋值 |
|        | 不允许重复声明 |                                       |
|        | 有暂时性死区   |                                       |

### 1.3 特性作用

**块级作用域**

第一种场景，内层变量可能会覆盖外层变量。

```javascript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

上面代码的原意是，`if`代码块的外部使用外层的`tmp`变量，内部使用内层的`tmp`变量。但是，函数`f`执行后，输出结果为`undefined`，原因在于变量提升，导致内层的`tmp`变量覆盖了外层的`tmp`变量。

第二种场景，用来计数的循环变量泄露为全局变量。

```javascript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

上面代码中，变量`i`只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

**变量不允许重复声明**

在维护别人的代码时，自己声明一个变量和代码原有的变量重名，可能会导致代码的逻辑出错

### 1.4 全局属性

顶层对象的属性

顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```javascript
window.a = 1;
a // 1

a = 2;
window.a // 2
```

上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

上面代码中，全局变量`a`由`var`命令声明，所以它是顶层对象的属性；全局变量`b`由`let`命令声明，所以它不是顶层对象的属性，返回`undefined`

### 1.5 let和const

在`let`和`const`之间，建议优先使用`const`，尤其是在全局环境，不应该设置变量，只应设置常量

const好处

1 `const`可以提醒阅读程序的人，这个变量不应该改变；

2 `const`比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；

3  JavaScript 编译器会对`const`进行优化，所以多使用`const`，有利于提高程序的运行效率

## 2 解构赋值

### 2.1 数组解构赋值

#### 数组赋值

```javascript
let [a, b, c] = [1, 2, 3];
console.log(a,b,c)//1,2,3
```

#### 嵌套赋值

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3
```

#### 省略赋值

```javascript
//只需要给数组第一项和第三项赋值
let [x, , y] = [1, 2, 3];
x // 1
y // 3
```

#### 不定参数赋值

```javascript
let [x, y] = [1, 2, 3];
x // 1
y // 2
let [x,y,z]=[1,2]
console.log(x,y,z)//1,2,undefined
let [x,y,...z]=[1,2,3,4,5,6,7]
console.log(x,y,z)//1 2 [ 3, 4, 5, 6, 7 ]
```

#### 默认值

* 解构赋值允许指定默认值。

```javascript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
```

**备注**

如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

### 2.2 对象赋值

#### 对象

* 变量和属性名一致

```javascript
let { foo, bar } = { foo: "aaa", bar: "bbb" };
console.log(foo,bar)
```

* 变量和属性名不一致

```javascript
let {foo:a,bar:b} = {foo:"hah",bar:"hehe"}
console.log(a,b)//hah hehe
```

对象的结构赋值就是下面形式的简写：

```javascript
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
//foo:foo属性和变量名相同时，就简写成foo
```

#### 对象数组嵌套

```javascript
let obj = {a1:[1,2,3],a2:"haha"};
let {a2,a1:[x,y]} = obj;
console.log(a2,x,y)//haha,1,2
```

#### 默认值

对象的属性是undefined，默认值生效

```javascript
let {m:n=4}={};//m:undefined
console.log(n);//4

let {a:cc=22}={a:12};
console.log(cc);//12
```

#### 特殊情况

赋值不是一个对象，则默认将其转换为对象

```javascript
var {a, b} = 1;
console.log(a,b);//undefined,undefined

let {length} = [1,2,3];
console.log(length);//3
```

如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```javascript
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```javascript
// 正确的写法
let x;
({x} = {x: 1});
```

上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。

### 2.3 字符串

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
console.log(a,b,c,d,e)//h,e,l,l,o
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

### 2.4 函数

### 2.5 圆括号问题

### 2.6 用途

1 提取对象的值，例如JSON 对象中的数据

2 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰

### 2.7 浅拷贝

解构赋值属于浅拷贝

```javascript
var a = {
  b: {
    c: 1,
  },
  g:2
}
const {g}=a
console.log(g)
a.g = 1
console.log(g,a.g)
```

### 2.8 总结

能进行解构赋值的对象

数组，对象，字符串，函数的参数

## 3 字符串扩展

### 3.1 includes(), startsWith(), endsWith() 

传统上，JavaScript 只有`indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

上面代码表示，使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。

### 3.2 repeat()

`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

参数如果是小数，会被取整。

```javascript
'na'.repeat(2.9) // "nana",取整为2
```

如果`repeat`的参数是负数或者`Infinity`，会报错。

```javascript
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError
```

但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于`-0`，`repeat`视同为 0。

```javascript
'na'.repeat(-0.9) // ""
```

参数`NaN`等同于 0。

```javascript
'na'.repeat(NaN) // ""
```

如果`repeat`的参数是字符串，则会先转换成数字。

```javascript
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```

### 3.3 模板字符串

解决字符串拼接麻烦的问题，采用``包裹字符串，变量采用${}，可以实现换行操作，保留空格和换行

```javascript
let a = 2;
console.log("'我是'+a+'娃'")

//es6
console.log(`我是${a}娃`)
console.log(`笨蛋
傻瓜
笨猪`)
//笨蛋
//傻瓜
//笨猪
```

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

```javascript
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"
```

模板字符串之中还能调用函数。

```javascript
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```

如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的`toString`方法。

### 3.4 字符串的遍历

```javascript
S6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。

for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

## 4 数组的扩展

### 4.1 扩展运算符

扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

该运算符主要用于函数调用。

```javascript
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

上面代码中，`array.push(...items)`和`add(...numbers)`这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。

#### 应用

1. 替代函数的apply方法由于扩展运算符可以展开数组，所以不再需要`apply`方法，将数组转为函数的参数了。

   ```javascript
   // ES5 的写法
   function f(x, y, z) {
     // ...
   }
   var args = [0, 1, 2];
   f.apply(null, args);
   
   // ES6的写法
   function f(x, y, z) {
     // ...
   }
   let args = [0, 1, 2];
   f(...args);
   ```

2. 复制数组
   数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。

   ```javascript
   //es5
   const a1 = [1, 2];
   const a2 = a1.concat();
   
   a2[0] = 2;
   a1 // [1, 2]
   //===========================
   //es6
   const a1 = [1, 2];
   // 写法一
   const a2 = [...a1];
   // 写法二
   const [...a2] = a1;
   ```

3. 合并数组
   以下两种方法属于浅拷贝

   ```javascript
   const arr1 = ['a', 'b'];
   const arr2 = ['c'];
   const arr3 = ['d', 'e'];
   
   // ES5 的合并数组
   arr1.concat(arr2, arr3);
   // [ 'a', 'b', 'c', 'd', 'e' ]
   
   // ES6 的合并数组
   [...arr1, ...arr2, ...arr3]
   // [ 'a', 'b', 'c', 'd', 'e' ]
   ```

4. 与解构赋值结合

   ```javascript
   const [first, ...rest] = [1, 2, 3, 4, 5];
   first // 1
   rest  // [2, 3, 4, 5]
   ```

   如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

   ```javascript
   const [...butLast, last] = [1, 2, 3, 4, 5];
   // 报错
   
   const [first, ...middle, last] = [1, 2, 3, 4, 5];
   // 报错
   ```

5. 字符串

   ```javascript
   var a='123'
   console.log([...a])//es6
   console.log(a.split(''))//es5
   //[1,2,3]
   ```

6. 实现了 Iterator 接口的对象

   任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。

   ```javascript
   let nodeList = document.querySelectorAll('div');
   let array = [...nodeList];
   ```

### 4.2 Array.from()

​	`Array.from`方法用于将两类对象转为真正的数组：**类似数组的对象**（array-like object）和**可遍历（iterable）的对象**（包括 ES6 新增的数据结构 Set 和 Map）.**所谓类似数组的对象，本质特征只有一点，即必须有`length`属性。**

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

`Array.from`还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

### 4.3 Array.of

`Array.of`方法用于将一组值，转换为数组。

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。

```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

### 4.4 copyWithin()

数组实例的`copyWithin`方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

它接受三个参数。

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

这三个参数都应该是数值，如果不是，会自动转为数值。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。

### 4.5 find()

数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

### 4.6 findIndex()

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。

```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

```javascript
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

上面的代码中，`find`函数接收了第二个参数`person`对象，回调函数中的`this`对象指向`person`对象。

另外，这两个方法都可以发现`NaN`，弥补了数组的`indexOf`方法的不足。

```javascript
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

上面代码中，`indexOf`方法无法识别数组的`NaN`成员，但是`findIndex`方法可以借助`Object.is`方法做到。

### 4.7 数组的遍历

ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

## 5 函数的扩展

### 5.1 函数参数的默认值

ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。

```javascript
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```

* 形参作用域

  ```javascript
  let x=10;
  function fn(x=1,y=x){
      console.log(y);//1
  }
  fn()
  ```

  形参所在的小括号是一个单独的作用域，遇到变量先看自己作用域下有没有，没有网上一级找，不是在函数里面找

### 5.2 函数的rest参数

ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

### 5.3 箭头函数

ES6 允许使用“箭头”（`=>`）定义函数。

```javascript
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

箭头函数有几个使用注意点。

（1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

上面四点中，第一点尤其值得注意。`this`对象的指向是可变的，但是在箭头函数中，它是固定的。

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

## 6 对象的扩展

### 6.1 Object.assign（target, source_1, ···）

合并两个对象，会改变原有的对象。该方法属于浅拷贝

```javascript
let obj1={a:'1'}, obj2={b:'2'};
console.log(Object.assign(obj1,obj2))//{a:'1,b:'2}
console.log(obj1)//{a:'1',b:'2'}
obj1.a=2
console.log(obj1)//{a:'2',b:'2'}浅拷贝
```

- **如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性**。
- 如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回。

```javascript
Object.assign(3);         // Number {3}
数组的处理
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
Object.assign把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1
```

###6.2 Object.is(value1, value2)

用来比较两个值是否严格相等，与（===）基本类似。

**基本用法**

**基本用法**

```javascript
Object.is("q","q");      // true
Object.is(1,1);          // true
Object.is([1],[1]);      // false
Object.is({q:1},{q:1});  // false
```

### 6.3 扩展运算符

对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```javascript
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

扩展运算符可以用于合并两个对象。

```javascript
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

### 6.4 属性的可枚举性和遍历

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。

```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

描述对象的`enumerable`属性，称为“可枚举性”，如果该属性为`false`，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略`enumerable`为`false`的属性。

- `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。

#### 1  属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

**（1）for...in**

`for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

```javascript
var a = {
  a: 1,
  b: 2,
  v: 'c'
}
var b = {
  d: 3,
  ha: function () {
    console.log('hah')
    
  }
}
Object.setPrototypeOf(a,b)
for (let item in a) {
  console.log(item)
  
}
//a b v d ha
```

**（2）Object.keys(obj)**

`Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

**（3）Object.getOwnPropertyNames(obj)**

`Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

**（4）Object.getOwnPropertySymbols(obj)**

`Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

**（5）Reflect.ownKeys(obj)**

`Reflect.ownKeys`返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```javascript
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

上面代码中，`Reflect.ownKeys`方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性`2`和`10`，其次是字符串属性`b`和`a`，最后是 Symbol 属性。

```
for in 和for of区别
https://juejin.im/post/5aea83c86fb9a07aae15013b
```

### 6.5 对象的原型

* Object.setPrototypeOf()

`Object.setPrototypeOf`方法的作用与`__proto__`相同，用来设置一个对象的`prototype`对象，返回参数对象本身

* Object.getPrototypeOf()

  该方法与`Object.setPrototypeOf`方法配套，用于读取一个对象的原型对象

```javascript
var a = {
  b:1
}
var c = {
  d:2
}
console.log(c.b)//undefined
Object.setPrototypeOf(c, a)
console.log(c.b)//1
console.log(Object.getPrototypeOf(c))//{ b: 1 }
```

### 6.6 super关键字

`super`这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

**第一种情况**，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错

```javascript
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

**第二种情况**，`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

我们知道，`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象。

```javascript
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
//Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
obj.find() // "hello"

在obj对象中，他的_proto_为proto，super指向了原型对象
```

上面代码中，对象`obj.find()`方法之中，通过`super.foo`引用了原型对象`proto`的`foo`属性。

注意，`super`关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

### 6.7 Object.keys()，Object.values()，Object.entries()

只遍历自身的（不含继承的）所有可遍历（enumerable）属性

```
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

## 7 symbol

## 8 set和map数据结构

### 8.1 map

javaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

### 8.2 set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值

`Set`本身是一个构造函数，用来生成 Set 数据结构

`Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```javascript
const set = new Set([1, 2, 3, 4, 4]);
[...set]//[1, 2, 3, 4]


// 去除数组的重复成员
[...new Set(array)]
```

## 9 proxy

## 15 promise

异步编程的解决方案，解决回调函数的多层嵌套。promise是一个对象，提供了异步操作的api。

promise对象特点：

（1）对象的状态不受外界影响。只有异步操作的结果，可以决定当前是哪一种状态

Promise对象代表一个异步操作，有三种状态： 

pending（进行中）

fulfilled（已成功）

rejected（已失败）

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：

从pending变为fulfilled

从pending变为rejected

promise的缺点：

1 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消

2 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部

3 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

### 15.1 基本用法

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

resolve，reject为两个内置的函数，resolve是将`Promise`对象的状态从“未完成”变为“成功”，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。reject，将`Promise`对象的状态从“未完成”变为“失败”，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

### 15.2 方法

#### 1 then()

then方法为构造函数Promise原型对象上的方法，作用是为**Promise实例添加状态改变时的回调函数**

第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数

then方法返回的是promise实例

```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
```

#### 2 catch（)

`Promise.prototype.catch`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数，catch执行完之后返回的是一个promise对象，后面的then方法还是会执行

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获

```javascript
//采用catch和then方法第二个参数的对比
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

第二种写法要好于第一种写法，理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议总是使用`catch`方法，而不使用`then`方法的第二个参数

#### 3 finally

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

`inally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果

#### 4 promise.all()

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

```
const p = Promise.all([p1, p2, p3]);
```

`Promise.all`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例

p的状态

* 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数
* 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数

#### 5 promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

#### 6 Promise.resolve()

将现有对象转为 Promise 对象，状态为fullfilled

#### 7 Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`

### 15.3 promise的事件机制

```javascript
console.log(1)
new Promise(function (resolve,reject) {
  console.log(2)
  resolve()
  
}).then(function () {
  console.log(3)
  
})
setTimeout(function () {
  console.log(5)
  
}, 0)
console.log(6)
// 12635
```

promise实例化时为同步操作，会调用里面的函数，promise.then（)为异步任务的微任务，settimeout为异步任务的宏任务

### 15.4 应用场景

1 axios和 fetch基于promise的创建的 

### 15.5 串行和并行

**串行**

，有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。要串行执行这样的异步任务，不用Promise需要写一层一层的嵌套代码。

有了Promise，我们只需要简单地写`job1.then(job2).then(job3).catch(handleError);`
其中job1、job2和job3都是Promise对象。

比如我们想实现第一个图片加载完成后，再加载第二个图片，如果其中有一个执行失败，就执行错误函数：

```
var src1 = 'https://www.imooc.com/static/img/index/logo_new.png'
var result1 = loadImg(src1) //result1是Promise对象
var src2 = 'https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg'
var result2 = loadImg(src2) //result2是Promise对象
result1.then(function (img1) {
  console.log('第一个图片加载完成', img1.width)
  return result2  // 链式操作
}).then(function (img2) {
  console.log('第二个图片加载完成', img2.width)
}).catch(function (ex) {
  console.log(ex)
})     
```

这里需注意的是：**then 方法可以被同一个 promise 调用多次，then 方法必须返回一个 promise 对象**。上例中result1.then如果没有明文返回Promise实例，就默认为本身Promise实例即result1，result1.then返回了result2实例，后面再执行.then实际上执行的是result2.then

**并行**

试想一个页面聊天系统，我们需要从两个不同的URL分别获得用户的个人信息和好友列表，这两个任务是可以并行执行的，用Promise.all()实现如下：

```
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});
```

有些时候，多个异步任务是为了容错。比如，同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。这种情况下，用Promise.race()实现：

```
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
});
```

由于p1执行较快，Promise的then()将获得结果'P1'。p2仍在继续执行，但执行结果将被丢弃。

**总结：Promise.all接受一个promise对象的数组，待全部完成之后，统一执行success**;

**Promise.race接受一个包含多个promise对象的数组，只要有一个完成，就执行success**

接下来我们对上面的例子做下修改，加深对这两者的理解：

```
var src1 = 'https://www.imooc.com/static/img/index/logo_new.png'
var result1 = loadImg(src1)
var src2 = 'https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg'
var result2 = loadImg(src2)
Promise.all([result1, result2]).then(function(datas) {
  console.log('all', datas[0]) //<img src="https://www.imooc.com/static/img/index/logo_new.png">
  console.log('all', datas[1]) //<img src="https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg">
})
Promise.race([result1, result2]).then(function(data) {
  console.log('race', data) //<img src="https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg">
})  
```

如果我们组合使用Promise，就可以把很多异步任务以并行和串行的方式组合起来执行

## 16 async   await

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。async 函数是 Generator 函数的语法糖

```javascript
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
上面代码的函数gen可以写成async函数，就是下面这样。

const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已

### 16.1 async改进

（1）内置执行器。

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。也就是说，`async`函数的执行，与普通函数一模一样，只要一行。

```javascript
asyncReadFile();
```

上面的代码调用了`asyncReadFile`函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用`next`方法，或者用`co`模块，才能真正执行，得到最后结果。

（2）更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。`**async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。**

（3）更广的适用性。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

（4）返回值是 Promise。

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作

### 16.2 async实现原理

```javascript
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

### 16.3 并行和串行

异步操作发送多个请求时，多个请求同时执行，就为并行

上一个执行完毕之后再执行下一个，称为串行

* await实现串行

```
let foo = await getFoo();
let bar = await getBar(foo);
```

串行的使用场景是多个异步操作之间有依赖关系，后面的异步操作依赖于前一个异步操作的结果

* await实现并行

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

并行的操作用于异步操作相互独立，互补影响

### 16.4 await的错误处理

await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。**try..catch错误处理也比较符合我们平常编写同步代码时候处理的逻辑**。

```
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
```

### 16.5 应用场景

### 16.6 async和promise的对比

### 1. 简洁

使用Async/Await明显节约了不少代码。我们不需要写.then，不需要写匿名函数处理Promise的resolve值，也不需要定义多余的data变量，还避免了嵌套代码。

### 2. 中间值

你很可能遇到过这样的场景，调用promise1，使用promise1返回的结果去调用promise2，然后使用两者的结果去调用promise3。你的代码很可能是这样的:

```
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      return promise2(value1)
        .then(value2 => {        
          return promise3(value1, value2)
        })
    })
}
```

使用async/await的话，代码会变得异常简单和直观

```
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}
```

### 3.条件语句

下面示例中，需要获取数据，然后根据返回数据决定是直接返回，还是继续获取更多的数据。

```
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
```

代码嵌套（6层）可读性较差，它们传达的意思只是需要将最终结果传递到最外层的Promise。使用async/await编写可以大大地提高可读性:

```
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
```



## 17 iterator和for 0f循环

### 17.1 iterator

遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作

**作用：**

* 一是为各种数据结构，提供一个统一的、简便的访问接口；

* 二是使得数据结构的成员能够按某种次序排列；

* 三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费

**Iterator 遍历过程**

这个和generator的方法一样

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

**默认Iterator 接口**

一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）

ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

注意对象没有Iterator 接口

### 17.2 for  of和for in

**1 遍历数组**

for in遍历数组，返回的是键名，要想获取值，还需要读取一次，并且会遍历到数组的属性

`for...in`循环有几个缺点。

- 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
- `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in`循环会以任意顺序遍历键名

for  of直接返回元素值，只返回具有数字索引的属性

* 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用

```javascript
var a = ['a', 'b', 'c']
a.h=2
for ( let  j in a) {
  console.log(j)// 0 1 2 h
  //要返回元素需要这样
  console.log(a[j])//a b c 2
  
}

for ( let  j of a) {
  console.log(j)// a b c
}
```

**2** 遍历对象

对象不具有iterate，不能直接进行遍历，可以通过Object.keys，Object. values ，Object.entries来遍历

```javascript
var a = {
  b: 1,
  c:2
}
for (let b in a) {
  console.log(b)//b c
  
}
for (let b of Object.values(a)) {
  console.log(b)// 1 2
}
```

**3 总结**

**遍历对象采用for in ，遍历数组用for of**

## 18 Generator

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同

### 18.1 语法

```javascript
function* helloWorldGenerator() {
            yield 'hello';
            yield 'world';
            return 'ending';
        }
hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }
```

Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象。这个遍历器对指向内部状态，通过调用next()方法使得指针向下一个状态，每次调用next（）方法就会从上一个 停下来的地方开始执行，知道遇到下一个yield表达式，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行

### 18.2 next()

next（)方法返回一个有着`value`和`done`两个属性的对象。`value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。

**1 next方法的运行逻辑**

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`

Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数

`yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。

**2 next传参**

`yield`表达式本身没有返回值，或者说总是返回`undefined`

`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

### 18.3 遍历

对generator函数进行遍历，遇到return就终止遍历，且不会返回return后面的值

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

### 18.4 原型上的方法

```javascript
function* a() {
            yield '1'
            yield '2'
            return '2'
        }

        var b = a()
        console.log(b.__proto__)
```

generator返回的对象的原型对象是Generator，Generator的原型对象上有四个方法

* next（）

* throw（）
  可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

* return（）
  可以返回给定的值，并且终结遍历 Generator 函数。如果`return`方法调用时，不提供参数，则返回值的`value`属性为`undefined`

  ```javascript
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  var g = gen();
  
  g.next()        // { value: 1, done: false }
  g.return('foo') // { value: "foo", done: true }
  g.next()        // { value: undefined, done: true }
  ```

### 18.5 this

```javascript
function* g() {
  this.a = 11;
}

let obj = g();
obj.next();
obj.a // undefined
```

上面代码中，Generator 函数`g`在`this`对象上面添加了一个属性`a`，但是`obj`对象拿不到这个属性。

Generator 函数也不能跟`new`命令一起用，会报错。

```javascript
function* F() {
  yield this.x = 2;
  yield this.y = 3;
}

new F()
// TypeError: F is not a constructor
```

### 18.6 异步编程

异步编程传统方法

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

协程

传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务

- 第一步，协程`A`开始执行。
- 第二步，协程`A`执行到一半，进入暂停，执行权转移到协程`B`。
- 第三步，（一段时间后）协程`B`交还执行权。
- 第四步，协程`A`恢复执行。

Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制

### 18.7 使用场景



## 20 class的基本用法

ES5生成实例对象的传统方法是通过构造函数，在ES6中采用class声明一个类

### 20.1 实例代码

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
//es6
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

### 2.2 construtor

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法

一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加

`constructor`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象

### 2.3 类的特点

1 代码逻辑简洁清晰

2 内部为严格模式，不存在变量提升

3 通过static封装静态方法

4 实现继承采用extends

5 子类继承需要调用super方法

7 super作为对象使用时，在普通方法中指向父类的原型对象，在静态方法中指向父类

### 2.4 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
```

父类的静态方法，可以被子类继承

### 2.5 类的继承

```javascript
class Point {
}

class ColorPoint extends Point {
}
上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法
```

子类可以继承父类的静态方法

## 21 module 语法

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性

### 21.1 加载方式

1 运行时加载

例如common.js

```javascript
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

2 静态加载

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载

优点：ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高



 **module和commonjs差异**



*  module应用于浏览器端，commonjs应用与服务端

*  CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。

编译时加载: ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，`import`时采用静态命令的形式。即在`import`时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”

### 21.2 严格模式

ES6 的模块**自动**采用严格模式，不管你有没有在模块头部加上`"use strict";`。

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

上面这些限制，模块都必须遵守。由于严格模式是 ES5 引入的，不属于 ES6，所以请参阅相关 ES5 书籍，本书不再详细介绍了。

**其中，尤其需要注意`this`的限制。ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。**

### 21.3 export

```javascript
//写法
方式1
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

方式2
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export { firstName, lastName, year };
```

注意：

```
// 报错
export 1;

// 报错
var m = 1;
export m;

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

**export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值**

```javascript
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量`foo`，值为`bar`，500 毫秒之后变成`baz`。

### 21.4 import

`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称**相同**。

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

```javascript
import { lastName as surname } from './profile.js';
```

加载方式

* 逐个加载

```javascript
import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

* 整体加载

```javascript
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

采用as关键字将导出的模块加载在circle对象上

### 21.5 export default

使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

下面比较一下默认输出和正常输出。

```javascript
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```

上面代码的两组写法，第一组是使用`export default`时，对应的`import`语句不需要使用大括号；第二组是不使用`export default`时，对应的`import`语句需要使用大括号。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。



### 21.7 异步加载

`defer`或`async`

`defer`要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；`async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

一句话，`defer`是“渲染完再执行”，`async`是“下载完就执行”

## 22 babel

Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行

### 22.1 安装配置

下面的命令在项目目录中，安装 Babel。

```bash
$ npm install --save-dev @babel/core
```

Babel 的配置文件是`.babelrc`，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。

该文件用来设置转码规则和插件，基本格式如下。

```javascript
{
  "presets": [],
  "plugins": []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```bash
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react
```

然后，将这些规则加入`.babelrc`。

```javascript
  {
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
  }
```

注意，以下所有 Babel 工具和模块的使用，都必须先写好`.babelrc`

### 22.2 @babel/polyfill

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。

举例来说，ES6 在`Array`对象上新增了`Array.from`方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片

安装命令如下。

```bash
$ npm install --save-dev @babel/polyfill
```

然后，在脚本头部，加入如下一行代码。

```javascript
import '@babel/polyfill';
// 或者
require('@babel/polyfill');
```

Babel 默认不转码的 API 非常多，详细清单可以查看`babel-plugin-transform-runtime`模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。
