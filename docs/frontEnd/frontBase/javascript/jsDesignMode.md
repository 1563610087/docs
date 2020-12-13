# js设计模式

## 1 单例模式

### 1.1 定义

保证一个类仅有一个实例，并提供一个访问它的全局访问点

实现单例模式不复杂，用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

适用场景：一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次。

### 1.2 实现

代理模式实现

```javascript
function CreateUser(name) {
  this.name=name
}
// 代理实现单例模式
var ProxyMode = (function() {
  var instance = null;
  return function(name) {
      if(!instance) {
          instance = new CreateUser(name);
      }
      return instance;
  }
})();
var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
console.log(a === b);    //true
```

### 1.3 应用场景

1 vue中的vuex和react中的redux中的store

2 es6中的module加载

## 2 观察着模式

### 2.1 定义

定义对象间的一种一对多的依赖关系，以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动刷新，也被称为是发布订阅模式

### 2.2 实现

实现的核心：

1 需要一个数组来保存订阅者的方法

2 添加订阅

3 删除订阅

4 发布订阅

```javascript
var Weibo = {
  subscribers: {
    default: []
  },
  //添加订阅
  addSubscribe: function (type = 'default', fn) {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn); //将订阅方法保存在数组里
  },
  //退订
  delSubscribe: function (type = 'default', fn) {
    this.subscribers[type] =
      this.subscribers[type].filter(item => item !== fn) //将退订的方法从数组中移除
  },
  //发布订阅
  publish: function (type = 'default', ...args) {
    this.subscribers[type].forEach(function (item) {
      item(...args);	//根据不同的类型调用相应的方法
    });
  }
};
var User1 = {
  readNews: function (info) {
    console.log(info + '我是用户2');
  }
};

var User2 = {
  readNews: function (info) {
    console.log(info + '我是用户2')

  }
}

Weibo.addSubscribe('娱乐', User2.readNews)
Weibo.addSubscribe('娱乐', User1.readNews);
Weibo.addSubscribe('体育', User1.readNews);

//User1 退订娱乐新闻：
Weibo.delSubscribe('娱乐', User1.readNews);

//发布新报纸：
Weibo.publish('娱乐', 'S.H.E演唱会惊喜登台')
Weibo.publish('体育', '欧国联-意大利0-1客负葡萄牙');

```

### 2.3 应用场景

1 promise

2 vue的数据双向绑定

### 2.4 优缺点

优点：降低对象之间的耦合度

缺点：

* 如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间
* 如果在被观察者之间有循环依赖的话，被观察者会触发它们之间进行循环调用，导致系统崩溃

## 3 代理模式

### 3.1 定义

代理模式是为对象提供一个代用品或者占位符，以便控制对他的访问

代理模式的中文含义就是帮别人做事，javascript的解释为：把对一个对象的访问, 交给另一个代理对象来操作

### 3.2 实现

```javascript
var myImage = (function(){
    var imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return function(src){
        imgNode.src = src; 
    }
})();
// 代理模式
var ProxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        myImage(this.src);
    };
    return function(src) {
                // 占位图片loading
                myImage("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");
        img.src = src;
    }
})();
// 调用方式

ProxyImage("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png");
```

### 3.3 应用场景

1. 远程代理，为一个对象在不同的地址空间提供局部代表，这样就可以隐藏一个对象存在于不同地址空间的事实。
2. 虚拟代理，是根据需要创建开销很大的对象。通过它来存放实例化需要很长时间的真是对象。
3. 保护代理，用来控制真实对象访问时的权限。
4. 智能指引，是指当调用真是的对象时，代理处理另外的一些事情。

图片的懒加载，我们就可以运用这种技术。在图片未加载完成之前，给个loading图片，加载完成后再替换成实体路径

vue3.0的双向数据绑定采用ES6的proxy

```javascript
let star = {
  name: '菜徐坤',
  song: '~鸡你太美~',
  age: 40,
  phone: 13089898989
}
let agent = new Proxy(star, {
  get(target, key) {
    if (key == 'phone') {
      // 返回经济人自己的电话
      return 15667096303
    }
    if (key == 'price') {
      return 20000000000
    }
    return target[key]
  },
  set(target, key, val) {
    if (key === 'customPrice') {
      if (val < 100000000) {
        throw new Error('价格太低')
      }
      else {
        target[key] = value;
        return true
      }
    }
  }
})

// agent 对象会根据相应的代理规则，执行相应的操作：
agent.phone // 15667096303  
agent.price // 20000000000 

```

### 3.4 优缺点

缺点

1. 在客户端和目标对象增加一个代理对象，会造成请求处理速度变慢。
2. 增加了系统的复杂度。

## 4 适配器模式

### 4.1 定义

适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体可以一起工作

## 5 策略模式

### 5.1 定义

策略模式指的是定义一些列的算法，把他们一个个封装起来，目的就是将算法的使用与算法的实现分离开来。说白了就是以前要很多判断的写法，现在把判断里面的内容抽离开来，变成一个个小的个体。

### 5.2 实现

### 5.3 适用场景

1. 多个类有不同的表现形式，每种表现形式可以独立成单独的算法。
2. 需要再不同情况下使用不同的算法，以后算法可能还会增加。
3. 对用户隐藏算法逻辑。

实际应用：表单的内容验证

### 5.4 优缺点

优点

1. 每个算法单独封装，减少了算法和算法调用者的耦合。
2. 合理使用继承有助于提取出算法中的公共部分。
3. 简化了单元测试。

缺点

1. 策略模式只适用于客户端知道所有的算法或行为的情况。
2. 策略模式造成很多的策略类，每个具体策略类都会产生一个新类。不过可以使用享元模式来减少对象的数量。