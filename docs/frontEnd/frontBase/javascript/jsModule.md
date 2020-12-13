# javascript模块机制

## 1 commomJS

1.获取依赖模块用同步加载方式，适合服务器端，在浏览器使用会出现浏览器假死的情况

 原因：在服务器端，所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。

 2.模块可以多次加载（多次使用require加载），但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。

##### 使用

```js
/*定义模块*/
//example.js
var n = 1;
function sayHello( name ){
    var name = name || "Tom";
    return "Hello~"+name
}
function addFn(val){
    var val = val.x+val.y;
    return val
}
/*使用module.exports的方法*/
module.exports ={
    n:n,
    sayHello:sayHello,
    addFn:addFn
}
/*
    使用exports的方法
    exports.n=n;
    exports.sayHello=sayHello
    exports.addFn=addFn

/*
    两种输出方式是等价的
*/
/*使用模块*/
//main.js
var example = require('./example.js');/*同步执行*/
var addNum = {
    "x":10,
    "y":5
}
console.log( example )//查看example输出的对外模块接口；
console.log( example.n )//1;
console.log( example.sayHello("Jack") )// "Hello~ Jack";
console.log( example.addFn(addNum) ) //15;
```

## 2 AMD

##### 特点：

 1.获取依赖模块用异步加载方式，适合浏览器端

##### 使用：

```js
/*定义模块*/
/*
    define(id?, dependencies?, factory)
    id:字符串，模块名称(可选)
    dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式
    factory: 工厂方法，返回一个模块函数
*/
//example.js
/*在定义模块时，也使用了其他依赖模块*/
define(['Lib'], function(Lib){
　　　　function foo(){
　　　　　　Lib.doSomething();
　　　　}
　　　　return {
　　　　　　foo : foo
　　　　};
　　});
/*使用模块*/
/*
require( dependencies, factory)
    dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式
    factory: 在这里使用模块完成业务
*/
/*
    将依赖的模块全部加载执行以后执行回调
*/
require(['./a', './b'], function (m1,m2) {
　m1.add(2, 3);
  m2.add(2, 3);
});
```

## 3 CMD

##### 特点：

 1.延迟加载执行

##### 使用：

```js
define(function(require, exports, module) {
  // 模块代码
    var a = require('./a');
  //require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口。
  
    //异步加载一个模块，在加载完成时，执行回调
    require.async('./b', function(b) {
        b.doSomething();
    });
    
    //异步加载多个模块，在加载完成时，执行回调
    require.async(['./c', './d'], function(c, d) {
        c.doSomething();
        d.doSomething();
    });
    
    
    //模块输出
     return {
        foo: 'bar',
        doSomething: function() {}
     };
    
    // 对外提供 foo 属性
    exports.foo = 'bar';

    // 对外提供 doSomething 方法
    exports.doSomething = function() {};
    
    // 错误用法！！!
      exports = {
        foo: 'bar',
        doSomething: function() {}
      };
    // 正确写法
      module.exports = {
        foo: 'bar',
        doSomething: function() {}
      };
/*
    exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。
*/
});
```

## 4 ES6 Module

##### 特点：

 export指令导出接口，以import引入模块

 import的语法跟require不同，而且import必须放在文件的最开始，且前面不允许有其他逻 辑代码，这和其他所有编程语言风格一致。

##### 使用：

```js
export var m = 1;
// 等价于
var m = 1;
export { m }
export const student = {
  name: 'Megan',
  age: 18
}
// 等价于
const obj = {
  id: 1,
  value: 'lalala'
};
export { obj };
export function sun(a, b) {
  return a + b;
}
// 等价于
function sum(a, b){
  return a + b;
}
export { sum };
import { sum } from xxxx

export default function() {}
 
// 等效于：
function a() {};
export {a as default};

import  xxx  from xxxx //可以省去花括号{}。
// 等效于，或者说就是下面这种写法的简写，是同一个意思
import { default as xxx } from xxxx;
//一个文件即模块中只能存在一个export default语句，导出一个当前模块的默认对外接口
export default var i = 0;
//使用默认式
import variable from './exportDemo';
//同时使用命名式和默认式
import variable, { sum, boy } from './exportDemo';
//导入一个模块，但不进行任何绑定：
import "my-module";
//在同一个模块可以同时使用两种导出方式
export function sun(a, b) {
  return a + b;
}
export default {
  install,
  DottedTitle,
};
```

5 使用场景

![img](https://upload-images.jianshu.io/upload_images/6897582-e7dfd92d6c06e7f0.png?imageMogr2/auto-orient/strip|imageView2/2/w/340/format/webp)

CMD 推崇依赖就近;AMD 推崇依赖前置
CMD 是延迟执行;AMD 是提前执行
CMD性能好,因为只有用户需要的时候才执行;AMD用户体验好,因为没有延迟,依赖模块提前执行了



## AMD和CMD

AMD 是 RequireJS 在推广过程中对模块定义提出的概念。
CMD 是 SeaJS 在推广过程中对模块定义提出的概念。

RequireJS 和 Sea.js 都是模块加载器，倡导模块化开发理念，核心价值是让 JavaScript 的模块化开发变得简单自然。

## 不同之处

两者的主要区别如下：

1. **定位有差异**。RequireJS 想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器。Sea.js 则专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 环境中。
2. **遵循的规范不同**。RequireJS 遵循 AMD（异步模块定义）规范，Sea.js 遵循 CMD （通用模块定义）规范。规范的不同，导致了两者 API 不同。Sea.js 更贴近 CommonJS Modules/1.1 和 Node Modules 规范。
3. CMD 推崇**依赖就近**，AMD 推崇**依赖前置**。
4. **推广理念有差异**。RequireJS 在尝试让第三方类库修改自身来支持 RequireJS，目前只有少数社区采纳。Sea.js 不强推，采用自主封装的方式来“海纳百川”，目前已有较成熟的封装策略。
5. **对开发调试的支持有差异**。Sea.js 非常关注代码的开发调试，有 nocache、debug 等用于调试的插件。RequireJS 无这方面的明显支持。
6. **插件机制不同**。RequireJS 采取的是在源码中预留接口的形式，插件类型比较单一。Sea.js 采取的是通用事件机制，插件类型更丰富