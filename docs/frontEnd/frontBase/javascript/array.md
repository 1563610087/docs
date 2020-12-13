# 数组操作

## 1 数组方法

### 1.1 slice()

slice() 方法可从已有的数组中返回选定的元素。

slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

**注意：** slice() 方法不会改变原始数组,属于浅拷贝

*array*.slice(*start*, *end*)

参数 Values

| 参数    | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| *start* | 可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。 |
| *end*   | 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。 |

```javascript
//start包含起始位置 end不包含起始位置
var a=[2,3,7,'ha','fg']
var b=a.slice(2,4)
console.log(b)
console.log(a)
//[ 7, 'ha' ]
//[ 2, 3, 7, 'ha', 'fg' ]
```



### 1.2 split()

split() 方法用于把一个字符串分割成字符串数组

### 1.3 push()

语法：push（item1, *item2*, ..., itemx)

push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。

* 新元素将添加在数组的末尾。

* 此方法改变数组的长度。
* 将数组新的长度作为返回值返回

**提示：** 在数组起始位置添加元素请使用 [unshift()](http://www.runoob.com/jsref/jsref-unshift.html) 方法

```javascript
var a=[2,3]
var b=a.push(4,5)//[ 2, 3, 4, 5 ]
console.log(b)//4
```

### 1.4 pop()

没有参数，直接调用

该方法可以删除数组的最后一个元素，并返回删除的元素

改变了原数组的长度

```javascript
var a=[2,3,7]
var b=a.pop()
console.log(b)//7
console.log(a)//[2,3]
```

### 1.5 unshift()

语法：unshift(item1,item2,,,,itemx)

向数组的头部添加一个或多个元素，并返回新的数组长度
改变原数组

```javascript
var a=[2,3,7]
var b=a.unshift(1,0)
console.log(b)//5
console.log(a)//[1,0,2,3,7]
```

### 1.6 shift()

没有参数，直接调用

可以删除数组的第一个元素，并将被删除的元素作为返回值返回

```javascript
var a=[2,3,7]
var b=a.shift()
console.log(b)//2
console.log(a)//[3,7]
```



### 1.7 indexOf（string，start）

indexOf() 方法可返回数组中某个指定的元素位置。

该方法将从头到尾地检索数组，看它是否含有对应的元素。开始检索的位置在数组 start 处或数组的开头（没有指定 start 参数时）。如果找到一个 item，则返回 item 的第一次出现位置的索引。开始位置的索引为 0。

如果在数组中没找到指定元素则返回 -1

### 1.8 sort（function）

用于对数组元素进行排序，不生成副本，会改变原数组

排序顺序可以是字母或数字，并按升序或降序。

默认排序顺序为按字母升序

```javascript
//从小到大
var points = [40,100,1,5,25,10];
var b=points.sort(function(a,b){return a-b});
console.log(b)//[ 1, 5, 10, 25, 40, 100 ]
//===========
//从大到小
var points = [40,100,1,5,25,10];
var b=points.sort(function(a,b){return b-a});
console.log(b)//[ 100, 40, 25, 10, 5, 1 ]
```

### 1.9 splice（index,howmany,item）

splice() 方法用于添加或删除数组中的元素。

这个方法有返回值，返回的是要删除的元素数组

**注意：**这种方法会改变原始数组。

| *index*               | 必需。规定从何处添加/删除元素。 该参数是开始插入和（或）删除的数组元素的下标，必须是数字。 |
| --------------------- | ------------------------------------------------------------ |
| *howmany*             | 必需。规定应该删除多少元素。必须是数字，但可以是 "0"。 如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。 |
| *item1*, ..., *itemX* | 可选。要添加到数组的新元素                                   |

```javascript
var a=[1,2,3,4,5,5]
var b=a.splice(1,2,'hah')
console.log(b)//[ 2, 3 ]
console.log(a)//[ 1, 'hah', 4, 5, 5 ]
//================
var c=a.splice(2,0,'fa')
console.log(c)//[]
console.log(a)//[ 1, 2, 'fa', 3, 4, 5, 5 ]
```

### 1.10 includes(item)

判断一个数组是否包含指定的值

```javascript
let site = ['runoob', 'google', 'taobao'];
 
site.includes('runoob'); 
// true 
 
site.includes('baidu'); 
// false
```

### 1.11 reverse()

reverse() 方法用于颠倒数组中元素的顺序

该方法会改变原来的数组，而不会创建新的数组

### 1.12 join()

按照指定参数将数组拼接成字符串

### 1.13 concat(arr1,arr2,arr..)

concat() 方法用于连接两个或多个数组。

该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本

```javascript
var hege = ["Cecilie", "Lone"];
var stale = ["Emil", "Tobias", "Linus"];
var kai = ["Robin"];
var children = hege.concat(stale,kai);
```

concat可以实现数组的拷贝

**该方法是属于浅拷贝**

```javascript
var b=[1,2]
var a= [].concat(b)
```

## 2 数组的遍历

### 前言

本文主要介绍数组常见遍历方法：forEach、map、filter、find、every、some、reduce，它们有个共同点：不会改变原始数组。

### 2.1 forEach()

* **ie8不支持**
* 语法：forEach(item,index,arr)
  * item:当前元素
  * index：当前元素的索引值
  * arr：当前元素所属的数组

forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数

foreach()括号里面写回调函数

```javascript
var colors = ["red","blue","green"];
// ES5遍历数组方法
for(var i = 0; i < colors.length; i++){ 
 console.log(colors[i]);//red blue green
}
// ES6 forEach
colors.forEach(function(color){
 console.log(color);//red blue green
});
```

我们再来看个例子：遍历数组中的值,并计算总和

```javascript
var numbers = [1,2,3,4,5];
var sum = 0;
numbers.forEach(number=>sum+=number)
console.log(sum)//15
```

### 2.2 map()

**map通过指定函数处理数组的每个元素，并返回处理后新的数组，map 不会改变原始数组。**

**forEach和map的区别在于，forEach没有返回值。**
**map需要返回值，如果不给return，默认返回undefined**

**使用场景1**
假定有一个数值数组(A),将A数组中的值以双倍的形式放到B数组

```javascript
var numbers = [1,2,3];
var doubledNumbers = [];
// es5写法
for(var i = 0; i < numbers.length; i++){
 doubledNumbers.push(numbers[i] * 2);
}
console.log(doubledNumbers);//[2,4,6]
// es6 map方法
var doubled = numbers.map(function(number){
   return number * 2;
})
console.log(doubled);//[2,4,6]
```

**使用场景2** 假定有一个对象数组(A),将A数中对象某个属性的值存储到B数组中

```javascript
var cars = [
  {model:"Buick",price:"CHEAP"},
  {model:"BMW",price:"expensive"}
];
var prices = cars.map(function(car){
    return car.price;
})
console.log(prices);//["CHEAP", "expensive"]
```

### 2.3 filter()

**filter() 检测数值元素，并返回符合条件所有元素的数组。 filter() 不会改变原始数组。**

**使用场景1**：假定有一个对象数组(A),获取数组中指定类型的对象放到B数组中

```javascript
var porducts = [
  {name:"cucumber",type:"vegetable"},
  {name:"banana",type:"fruit"},
  {name:"celery",type:"vegetable"},
  {name:"orange",type:"fruit"}
];
// es5写法
var filteredProducts = [];
for(var i = 0; i < porducts.length; i++){
    if(porducts[i].type === "vegetable"){
      filteredProducts.push(porducts[i]);
    }
}
console.log(filteredProducts);//[{name: "cucumber", type: "vegetable"},
                                 {name: "celery", type: "vegetable"}]
// es6 filter
var filtered2 = porducts.filter(function(product){
  return product.type === "vegetable";
})
console.log(filtered2);
```

**使用场景2**：假定有一个对象数组(A),过滤掉不满足以下条件的对象
条件: 蔬菜 数量大于0,价格小于10

```
var products = [
  {name:"cucumber",type:"vegetable",quantity:0,price:1},
  {name:"banana",type:"fruit",quantity:10,price:16},
  {name:"celery",type:"vegetable",quantity:30,price:8},
  {name:"orange",type:"fruit",quantity:3,price:6}
];
products = products.filter(function(product){
    return product.type === "vegetable" 
    && product.quantity > 0 
    && product.price < 10
})
console.log(products);//[{name:"celery",type:"vegetable",quantity:30,price:8}]
```

**使用场景3**：假定有两个数组(A,B),根据A中id值,过滤掉B数组不符合的数据

```javascript
var post = {id:4,title:"Javascript"};
var comments = [
   {postId:4,content:"Angular4"},
   {postId:2,content:"Vue.js"},
   {postId:3,content:"Node.js"},
   {postId:4,content:"React.js"},
];
function commentsForPost(post,comments){
   return comments.filter(function(comment){
     return comment.postId === post.id;
   })
}
console.log(commentsForPost(post,comments));//[{postId:4,content:"Angular4"},{postId:4,content:"React.js"}]
```

### 2.4 find()

**它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。**
**使用场景1**
假定有一个对象数组(A),找到符合条件的对象

```javascript
 var users = [
  {name:"Jill"},
  {name:"Alex",id:2},
  {name:"Bill"},
  {name:"Alex"}
 ];
// es5方法
 var user;
 for(var i = 0; i < users.length; i++){
  if(users[i].name === "Alex"){
    user = users[i];
    break;//找到后就终止循环
  }
 }
 console.log(user);// {name:"Alex",id:2}
// es6 find
user = users.find(function(user){
  return user.name === "Alex";
})
console.log(user);// {name:"Alex",id:2}找到后就终止循环
```

**使用场景2**：假定有一个对象数组(A),根据指定对象的条件找到数组中符合条件的对象

```javascript
var posts = [
 {id:3,title:"Node.js"},
 {id:1,title:"React.js"}
];
var comment = {postId:1,content:"Hello World!"};
function postForComment(posts,comment){
 return posts.find(function(post){
   return post.id === comment.postId;
 })
}
console.log(postForComment(posts,comment));//{id: 1, title: "React.js"}
```

### 2.5 every&some()

**every：数组中是否每个元素都满足指定的条件**

every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。

every() 方法使用指定函数检测数组中的所有元素：

- 如果数组中检测到有一个元素不满足，则整个表达式返回 *false* ，且剩余的元素不会再进行检测。
- 如果所有元素都满足条件，则返回 true。

**注意：** every() 不会对空数组进行检测。

**注意：** every() 不会改变原始数组

**some:数组中是否有元素满足指定的条件**

**使用场景1**：计算对象数组中每个电脑操作系统是否可用，大于16位操作系统表示可用,否则不可用

```javascript
//ES5方法
var computers = [
 {name:"Apple",ram:16},
 {name:"IBM",ram:4},
 {name:"Acer",ram:32}
];
var everyComputersCanRunProgram = true;
var someComputersCanRunProgram = false;
for(var i = 0; i < computers.length; i++){
 var computer = computers[i];
 if(computer.ram < 16){
   everyComputersCanRunProgram = false;
 }else{
   someComputersCanRunProgram = true;
 }
}
console.log(everyComputersCanRunProgram);//false
console.log(someComputersCanRunProgram);//true
//ES6 some every 
var every = computers.every(function(computer){
  return computer.ram > 16;
})
console.log(every);//false
var some = computers.some(function(computer){
 return computer.ram > 16;
})
console.log(some);//true
```

**一言以蔽之：Some: 一真即真；Every: 一假即假**

**使用场景2**：假定有一个注册页面,判断所有input内容的长度是否大于0

```javascript
function Field(value){
  this.value = value;
}
Field.prototype.validate = function(){
  return this.value.length > 0;
}
//ES5方法
var username = new Field("henrywu");
var telephone = new Field("18888888888");
var password = new Field("my_password");
console.log(username.validate());//true
console.log(telephone.validate());//true
console.log(password.validate());//true
//ES6 some every
var fields = [username,telephone,password];
var formIsValid = fields.every(function(field){
 return field.validate();
})
console.log(formIsValid);//true
if(formIsValid){
 // 注册成功
}else{
  // 给用户一个友善的错误提醒
}
```

### 2.6 reduce()

**reduce() 方法接收一个方法作为累加器，数组中的每个值(从左至右) 开始合并，最终为一个值。**

语法：reduce（total，value，index，arr）

total：初始值或者返回值

value：当前元素

index：当前元素的索引

arr：当前元素的数组对象

reduce()方法首先接收两个参数，第一个为一个函数，第二个为初始值。reduce会遍历数组的每一个元素，然后依次调用回调函数。函数callback接收四个参数

```cpp
callback （执行数组中每个值的函数，包含四个参数）

    1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    2、currentValue （数组中当前被处理的元素）
    3、index （当前元素在数组中的索引）
    4、array （调用 reduce 的数组）

initialValue （作为第一次调用 callback 的第一个参数。）
```

**使用场景1**： 计算数组中所有值的总和

```javascript
 var numbers = [10,20,30];
 var sum = 0;
//es5 方法
for(var i = 0; i < numbers.length; i++){
  sum += numbers[i];
}
console.log(sum);
// es6 reduce
var sumValue = numbers.reduce(function(sum2,number2){
  console.log(sum2);//0 10 30 60
  return sum2 + number2;
},0);//sum2初始值为0
console.log(sumValue);
```

**使用场景2**：
将数组中对象的某个属性抽离到另外一个数组中

```javascript
 var primaryColors = [
   {color:"red"},
   {color:"yellow"},
   {color:"blue"}
 ];
 var colors = primaryColors.reduce(function(previous,primaryColor){
    previous.push(primaryColor.color);
    return previous;
 },[]);
 console.log(colors);//["red", "yellow", "blue"]
```

**使用场景3**：判断字符串中括号是否对称

```javascript
function balancedParens(string){
  return !string.split("").reduce(function(previous,char){
    if(previous < 0) { return previous;}
    if(char == "("){ return ++previous;}
    if(char == ")"){ return --previous;}
    return previous;
  },0);
}
console.log(balancedParens("((())))"));
```

## 3 数组的去重

### 3.1 for循环

```javascript
//创建一个数组			
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}]
			//去除数组中重复的数字
			//获取数组中的每一个元素
			for(var i=0 ; i<arr.length ; i++){
				//console.log(arr[i]);
				/*获取当前元素后的所有元素*/
				for(var j=i+1 ; j<arr.length ; j++){
					//console.log("---->"+arr[j]);
					//判断两个元素的值是否相等
					if(arr[i] == arr[j]){
						//如果相等则证明出现了重复的元素，则删除j对应的元素
						arr.splice(j,1);
						//当删除了当前j所在的元素以后，后边的元素会自动补位
						//此时将不会在比较这个元素吧，我需要在比较一次j所在位置的元素
						//使j自减
						j--;
					}
				}
			}		
console.log(arr);//[ 1, 'true', 15, false, undefined, NaN, NaN, 'NaN', 'a', {}, {} ]

```

缺点：NaN和{}没有去重，两个null直接消失了

### 3.2 ES6 set去重

```javascript
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}]
      
      var b=Array.from(new Set(arr))
      
      console.log(b);//[ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]
```

缺点：es6语法，有兼容性问题，无法去除{}

### 3.3 [...new Set(arr)]

采用扩展运算符和set数据结构去重

### 3.4  includes()

```javascript
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}]
      arr2=[]
      for (var i = 0; i < arr.length; i++) {
        if (!ar2r2.includes(arr[i])) {
          arr2.push(arr[i])
      }
      
      console.log(arr2);//[ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]
```

缺点：{}没有去重

### 3.5 sort()

```javascript
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}]
      arr.sort()
      var arr2=[arr[0]]
      for (var i = 1; i < arr.length; i++) {
        if (arr[i]!==arr[i-1]) {
          arr2.push(arr[i])
        }
      }
      console.log(arr2// [0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined]      
```

缺点：NaN、{}没有去重

### 3.6 indexOf()

```javascript
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}]
      var array = [];
      for (var i = 0; i < arr.length; i++) {
          if (array .indexOf(arr[i]) === -1) {
              array .push(arr[i])
          }
      }
      return array;
      console.log(arr2);//[1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重
```

### 3.7 filter()

```javascript
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}]
      arr.filter(function(item, index, arr) {
      //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
          return arr.indexOf(item, 0) === index;
      }
      console.log(arr2);//[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
```

### 3.8 map

```javascript
function arrayNonRepeatfy(arr) {
  let map = new Map();
  let array = new Array();  // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if(map .has(arr[i])) {  // 如果有该key值
      map .set(arr[i], true); 
    } else { 
      map .set(arr[i], false);   // 如果没有该key值
      array .push(arr[i]);
    }
  } 
  return array ;
}
 var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
```

创建一个空Map数据结构，遍历需要去重的数组，把数组的每一个元素作为key存到Map中。由于Map中不会出现相同的key值，所以最终得到的就是去重后的结果

### 3.9 递归去重

```javascript
function unique(arr) {
        var array= arr;
        var len = array.length;

    array.sort(function(a,b){   //排序后更加方便去重
        return a - b;
    })

    function loop(index){
        if(index >= 1){
            if(array[index] === array[index-1]){
                array.splice(index,1);
            }
            loop(index - 1);    //递归loop，然后数组去重
        }
    }
    loop(len-1);
    return array;
}
 var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
```



## 4 数组的检测方法

### 4.1 instanceof

instanceof 方法主要是检测变量的原型链是否指向Array构造函数的prototype原型上

```javascript
var arr = [4,67,23];
arr instanceof Array  //return true
//补充：但是instanceof不一定能保证检测的结果一定正确，因为只要是在原型链上的都会返回true ，arr instanceof Object 也返回true
```

### 4.2 constructor

```javascript
 var arr = [];
    arr.constructor === Array  ruturn true 
//但是constructor可以被重写，所以不能确保一定是数组
    var str = 'abc';
    str.constructor = Array;
    str.constructor === Array // return true
//而很明显str不是数组
```

### 4.3 Array.isArray()

```javascript
//ES5 在Array上新增了检测数组的方法，因为是新的方法，浏览器有一定的兼容问题
function myFunction() {
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
	console.log(Array.isArray(fruits));//true
}
```

### 4.4 Object.prototype.toString.call()

```javascript
//终极方法,可以确保方法能检测一定是数组
    var arr = [34,65,1];
    Object.prototype.toString.call(arr) === '[object Array]' //return true
```

## 5 数组的全排列

```javascript
//递归
var a=[1,2,3]
    console.log(perm(a))

    function perm(arr){
      if (arr.length == 1)
        return arr;
      else if (arr.length == 2)
        return [[arr[0],arr[1]],[arr[1],arr[0]]];
      else {
        var temp = [];
        for (var i = 0; i < arr.length; i++) {
          var save = arr[i];
          arr.splice(i, 1);//取出arr[i]
          var res = perm(arr);//递归排列arr[0],arr[1],...,arr[i-1],arr[i+1],...,arr[n]
          arr.splice(i, 0, save);//将arr[i]放入数组，保持原来的位置
          for (var j = 0; j < res.length; j++) {
            res[j].unshift(arr[i]);//将提取的数字放到第一位
            temp.push(res[j]);//将arr[j]组合起来
          }
        }
        return temp;
      }
    }
```

递归思想：

1 递归结束的条件

2 递归的重复操作的步奏

## 6 数组的扁平化

#### 6.1 递归

```javascript
function flatten(arr){
     var result = [];
     for(var i = 0, len = arr.length; i < len; i++){
         if(Array.isArray(arr[i])){
             result = result.concat(flatten(arr[i]));
         }else{
             result.push(arr[i]);
         }
     }
     return result;
 }

flatten(arr)   // [1,2,3,4]
```

## 7 数组编程

1 数组元素出现的次数并进行排序

```javascript
function (){
    var obj={}
for (let i in obj){
    if(obj[i]){
        obj[i]=obj[i]+1
    }else {
        obj[i]=1
    }
}
var arr=Object.keys.sort(function(a,b){
    return obj[a]-obj[b]
})
return arr
}
```

2  对象按照某一个值进行排序

```javascript
function  sortObj(obj) {
      const keys = Object.keys(obj).sort(function(a, b) {   return obj[a] - obj[b] })
      var newObj = {}
      for (var value of keys) {
        newObj[key] = obj[key]
      }
      return newObj
    }
```

