# 算法与数据结构

## 1 栈

先进后出，类似于往箱子里面放书，先放的书籍在最下面。

## 2 队列

### 2.1队列

队列用于存储按顺序排列的数据，遵循 先进先出(FIFO，First-In-First-Out) 的原则，也是计算机常用的一种数据结构，别用于很多地方，比如提交给操作系统的一系列进程，打印池任务等

![](https://user-gold-cdn.xitu.io/2017/9/26/8b855443dd23c213682ed025c3eec65b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### ES5实现

```javascript
//创建一个类
function Queue(){
    this.queue=[]
    this.enqueue=enqueue//入队
    this.dequeue=dequeue//出队
    this.front=front//查看队首元素
    this.back=back//查看队尾元素
    this.toString=toString//显示所有队列元素
    this.clear=clear//清空所有元素
    this.empty=empty//判断队列是否为空
     
    //入队
    function enqueue(item){
        queue.push(item)
    }
    //出队
    function dequeue(item){
        return queue.shift(item)
    }
    //查看队首元素
    function front(){
        return queue[0]
    }
    //查看队尾元素
    function back(){
        //先判断队列是否为空
        if(this.empty()){
            return 'the queue is empty'
        }else{
           return queue[queue.length-1] 
        }   
    }
    //查看所有队列元素
    function toString(){
        return queue.join('\n')
    }
    //清空所有元素
    function clear(){
        queue=[]
    //判断队列是否为空
    function empty(){
        if(queue.length==0){
            return true
        }  else{
            false
        } 
    }
}
//实例化创建队列
let queue=new Queue()
console.log(queue.empty)
console.log('=============')
console.log(queue.queue)
console.log('=============')
console.log(queue.enqueue('xaingx'))
queue.enqueue('heh')
console.log('=============')
console.log(queue.toString())
console.log('=============')
console.log(queue.dequeue())
console.log('==============')
console.log(queue.front())
console.log('==============')
console.log(queue.back())
console.log('==============')
console.log(queue.clear())
console.log(queue.empty())

```

#### ES6实现

```javascript
let Queue =(function(){
    const arr=new WeakMap()
    class Queue {
        constructor(){
            arr.set(this.[])
        }
        enqueue(item){
            let q=arr.get(this)
            q.push(item)
        }
        dequeue(){
            let q=arr.get(this)
            let r=q.shift()
            return r
        }
        //其他方法
    }
    
    
    
    
    
    
})()
```



### 2.2 优先队列

### 2.3 循环队列

循环队列特征

固定容量为k

有头尾两个指针head,tail

head始终指向队列第一个元素

tail始终指向最后一个元素的下一个位置

设置默认值为-1

队列为空，头尾指针指到同一位置且值为-1

当队列满了，头尾指针也指向相同

```javascript
//循环队列
var MyCircularQueue = function(k) {
    //队列长度
    this.size = k
    //队首指针
    this.head = -1
    // 队尾指针
    this.tail = -1
    //创建数组
    this.data = []
};

MyCircularQueue.prototype.enQueue = function(value) {
    //检查队列是否满了
    if (this.isFull()) {
        return false
    }
    // 检查队列是否为空
    if (this.isEmpty()) {
        this.head = 0
    }
    this.tail = (this.tail + 1)%this.size
    this.data[this.tail] = value
    return true
};

MyCircularQueue.prototype.deQueue = function() {
    // 先判断是否为空
    if (!this.isEmpty()) {
      // 判断是不是满队列
        if (this.tail === this.head) {
            this.tail = -1
            this.head = -1
        } else {
          // 头指针向后移动一个
            this.head = (this.head + 1)%this.size
        }
        return true
    }
    return false
};

MyCircularQueue.prototype.Front = function() {
    return this.head === -1? -1 : this.data[this.head]
};


MyCircularQueue.prototype.Rear = function() {
    return this.tail === -1 ? -1 : this.data[this.tail]
};

MyCircularQueue.prototype.isEmpty = function() {
    return this.tail === -1 && this.head === -1
};

MyCircularQueue.prototype.isFull = function() {
    return (this.tail + 1)%this.size === this.head
};

MyCircularQueue.createNew = function(k) {
    return new MyCircularQueue(k)
};

```

## 3 链表

**链表和数组都是用于存储有序元素的集合**，但有几点大不相同

1. 链表不同于数组，链表中的元素在内存中并不是连续放置的
2. 链表添加或移除元素不需要移动其他元素
3. 数组可以直接访问任何一个位置的元素，链表必须从表头开始迭代到指定位置访问

### 3.1 单链表

下面是单链表的基本结构

![img](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mERNK74j59kgW4ZE0uuia8eyPCNicqDWbNykL0VjibE0farSkMFDgeyiaib7gibNBZLPLgJZnOlso7fXH1Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- 长度为3的单链表
- 每个元素由一个存储元素本身`data`的节点和一个指向下一个元素的引用`next`(也称指针或链接)组成
- 尾节点的引用`next`指向为`null`

链表的方法

- `append` 在链表尾部添加一个元素
- `insert` 在指定位置插入元素
- `removeAt` 在指定位置删除元素
- `getNode` 获取指定位置的元素
- `print` 打印整个链表
- `indexOf` 查找链表中是否有某个元素，有则返回索引，没有则返回-1
- `getHead` 获取链表头部
- `getTail` 获取链表尾部（有些并未实现尾部）
- `size` 返回链表包含的元素个数
- `clear` 清空链表

创建链表

```javascript
//创建节点类
//es6写法
class Node{
    constructor(data){
        this.data=data
        this.next=null
    }
}
//初始化链表
class LinkedList{
    constructor(){
        this.head=null
        this.tail=null
        this.length=0
 //==================================       
// 在链表尾端添加元素
append (data) {
  const newNode = new Node(data);
  if (this._length === 0) {
    this._head = newNode;
    this._tail = newNode;
  } else {
    this._tail.next = newNode;
    this._tail = newNode;
  }

  this._length += 1;
  return true;
}
 //================================
 // 获取指定位置元素
getNode (index) {
  let currNode = this._head;
  let currIndex = 0;
  while (currIndex < index) {
    currIndex += 1;
    currNode = currNode.next;
  }
  return currNode;
} 
        
 //================================       
// 在链表指定位置插入元素
insert(index, data) {
  // 不满足条件的索引值
  if (index < 0 || index > this._length) return false;
  // 插入尾部
  if (index === this._length) return this.append(data);

  const insertNode = new Node(data);
  if (index === 0) {
    // 插入首部
    insertNode.next = this._head;
    this._head = insertNode;
  } else {
    // 找到原有位置节点
    const prevTargetNode = this.getNode(index - 1);
    const targetNode = prevTargetNode.next;
    // 重塑节点连接
    prevTargetNode.next = insertNode;
    insertNode.next = targetNode;
  }

  this._length += 1;
  return true;
  }
   //=================================     
  removeAt(index) {
  if (index < 0 || index >= this._length) return false;

  if (index === 0) {
    this._head = this._head.next;
  } else {
    const prevNode = this.getNode(index - 1);
    const delNode = prevNode.next;
    const nextNode = delNode.next;
    // 若移除为最后一个元素
    if (!nextNode) this._tail = prevNode;
    prevNode.next = nextNode;
  }

  this._length -= 1;
  return true;
}
  //===========================================
 // 打印链表
print() {
  let ret = [];
  // 遍历需从链表头部开始
  let currNode = this._head;
  // 单链表最终指向null，作为结束标志
  while (currNode) {
    ret.push(currNode.data);
    // 轮询至下一节点
    currNode = currNode.next;
  }
  console.log(ret.join(' --> '));
}
        
 }    
    


```

- append 方法

在链表尾部添加一个新的元素可分为两种情况：

1. 原链表中无元素，添加元素后，`head`和`tail`均指向新元素
2. 原链表中有元素，更新`tail`元素（如下）

![img](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mERNK74j59kgW4ZE0uuia8eyKgAiaorB36mucsiboWFKULwfBaLsVTWTOKeHjOsvWHtaXTOq8aFMEVUA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

* getNode方法

获取指定索引位置的节点，依次遍历链表，直到指定位置返回

* insert 方法

插入元素，需要考虑三种情况

1. 插入尾部，相当于`append`
2. 插入首部，替代`head`并指向原有头部元素
3. 中间，需要断开原有链接并重新组合（如下)

![img](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mERNK74j59kgW4ZE0uuia8eyvPspUZDKqG44XMV8HrveqfORUIa8jV350LHHPLicD5nggrppj1WFarQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

* removeAt方法

在指定位置删除元素同添加元素类似

1. 首部：重新定义`_head`
2. 其他：找到目标位置的前后元素，重塑连接，如果目标位置为尾部，则重新定义`_tail`

![img](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mERNK74j59kgW4ZE0uuia8eyKic4uib4R4Zibc6f1lrEWun6zGEQSGyR5oy3r51vLkibDrshIuNMCTfkXA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

* print 方法



### 3.2 双向链表

双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素，如下图

![img](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mERNK74j59kgW4ZE0uuia8eylQCPibmJOxqP5YrEuNd1eS0LyBegtPhhIs6mqk19d0VMko37FLG70CA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

正是因为这种变化，使得链表相邻节点之间不仅只有单向关系，可以通过`prev`来访问当前节点的上一节点。相应的，双向循环链表的基类也有变化

```
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

```

继承单向链表后，最终的双向循环链表`DoublyLinkedList`如下【`prev`对应的更改为`NEW`】

```javascript
class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
  }

  append(data) {
    const newNode = new DoublyNode(data);

    if (this._length === 0) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      newNode.prev = this._tail; // NEW
      this._tail.next = newNode;
      this._tail = newNode;
    }

    this._length += 1;
    return true;
  }

  insert(index, data) {
    if (index < 0 || index > this._length) return false;
    if (index === this._length) return this.append(data);

    const insertNode = new DoublyNode(data);
    if (index === 0) {
      insertNode.prev = null; // NEW
      this._head.prev = insertNode; // NEW
      insertNode.next = this._head;
      this._head = insertNode;
    } else {
      // 找到原有位置节点
      const prevTargetNode = this.getNode(index - 1);
      const targetNode = prevTargetNode.next;
      // 重塑节点连接
      prevTargetNode.next = insertNode;
      insertNode.next = targetNode;
      insertNode.prev = prevTargetNode; // NEW
      targetNode.prev = insertNode; // NEW
    }

    this._length += 1;
    return true;
  }

  removeAt(index) {
    if (index < 0 || index > this._length) return false;

    let delNode;

    if (index === 0) {
      delNode = this._head;
      this._head = this._head.next;
      this._head.prev = null; // NEW
    } else {
      const prevNode = this.getNode(index - 1);
      delNode = prevNode.next;
      const nextNode = delNode.next;
      // 若移除为最后一个元素
      if (!nextNode) {
        this._tail = prevNode;
        this._tail.next = null; // NEW
      } else {
        prevNode.next = nextNode; // NEW
        nextNode.prev = prevNode; // NEW
      }
    }

    this._length -= 1;
    return delNode.data;
  }
}
```



### 3.3 循环链表

循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链 表之间唯一的区别在于，单向循环链表最后一个节点指向下一个节点的指针`tail.next`不是引用`null`， 而是指向第一个节点`head`，双向循环链表的第一个节点指向上一节点的指针`head.prev`不是引用`null`，而是指向最后一个节点`tail`

![img](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mERNK74j59kgW4ZE0uuia8eygKfYX6J2icho0CgteqsJC6ZKoK11h7TfrYolHhwOgcUlj5OJSzNq8qw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 3.4 链表的应用

基于链表实现栈

```javascript
class Stack {
  constructor() {
    this._link = new LinkedList();
  }
  push(item) {
    this._link.append(item);
  }
  pop() {
    const tailIndex = this._link - 1;
    return this._link.removeAt(tailIndex);
  }
  peek() {
    if (this._link.size() === 0) return undefined;
    return this._link.getTail().data;
  }
  size() {
    return this._link.size();
  }
  isEmpty() {
    return this._link.isEmpty();
  }
  clear() {
    this._link.clear()
  }
}
```

基于链表实现队列

```javascript
class Queue {
  constructor() {
    this._link = new LinkedList();
  }
  enqueue(item) {
    this._link.append(item);
  }
  dequeue() {
    return this._link.removeAt(0);
  }
  head() {
    if (this._link.size() === 0) return undefined;
    return this._link.getHead().data;
  }
  tail() {
    if (this._link.size() === 0) return undefined;
    return this._link.getTail().data;
  }
  size() {
    return this._link.size();
  }
  isEmpty() {
    return this._link.isEmpty();
  }
  clear() {
    this._link.clear()
  }
}
```

链表翻转【面试常考】

**（1）迭代法**

迭代法的核心就是`currNode.next = prevNode`，然后从头部一次向后轮询

![img](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mERNK74j59kgW4ZE0uuia8eyibaBAFnkIwJLhbTyVSL20ggv6y4M7Sicia6Kh2XIC05xqFu5T66vHYF9A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

代码实现

```javascript
reverse() {
  if (!this._head) return false;

  let prevNode = null;
  let currNode = this._head;
  while (currNode) {
    // 记录下一节点并重塑连接
    const nextNode = currNode.next;
    currNode.next = prevNode;
    // 轮询至下一节点
    prevNode = currNode;
    currNode = nextNode;
  }

  // 交换首尾
  let temp = this._tail;
  this._tail = this._head;
  this._head = temp;

  return true;
}
```

**（2）递归法**

递归的本质就是执行到当前位置时，自己并不去解决，而是等下一阶段执行。直到递归终止条件，然后再依次向上执行

```
function _reverseByRecusive(node) {
  if (!node) return null;
  if (!node.next) return node; // 递归终止条件

  var reversedHead = _reverseByRecusive(node.next);
  node.next.next = node;
  node.next = null;

  return reversedHead;
};

_reverseByRecusive(this._head);
```

链表逆向输出

利用递归，反向输出

```
function _reversePrint(node){
  if(!node) return;// 递归终止条件
  _reversePrint(node.next);
  console.log(node.data);
};
```

## 5 图

## 6 集合

集合是由一组无序且唯一的项组成的。这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。在数学中，集合也有并集、交集、差集等基本操作。

**集合的基本性质有一条: 集合中元素是不重复的。因为这种性质，所以我们选用了对象来作为集合的容器，而非数组**

javascript对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的

### 6.1 实现集合

下面我们先来简单实现一个集合类，并包含以下的方法：

- has(value): 检测集合内是否有某个元素
- add(value): 给集合内添加某个元素
- remove(value): 移除集合中某个元素
- clear(value): 清空集合
- size(): 返回集合长度
- values(): 返回集合转换的数组

```javascript
function Set() {
    var items = {};

    /**
     * 检测集合内是否存在某个元素
     * 
     * @param {any} value 检测的元素
     * @returns 存在则返回true
     */
    this.has = function (value) {
        return items.hasOwnProperty(value);
    }

    /**
     * 给集合添加某个元素
     * 
     * @param {any} value 要添加的元素
     * @returns 添加成功返回true
     */
    this.add = function (value) {
        if (this.has(value)) {
        // 如果集合中已存在该元素
            return false;
        }
        items[value] = value;
        return true;
    }

    /**
     * 移除集合中的某个元素
     * 
     * @param {any} value 要移除的元素
     * @returns 移除成功返回true
     */
    this.remove = function (value) {
        if (!this.has(value)) {
            // 如果集合中不存在该元素
            return false;
        }
        delete items[value];
        return true;
    }

    /**
     * 清空集合
     */
    this.clear = function () {
        items = {};
    }
    /**
     * 返回集合长度
     */
    this.size = function () {
        return Object.keys(size).length
    }
    
    /**
     * 返回集合转换成的数组
     * @returns {Array} 转换后的数组
     */
    this.values = function () {
        var arr = [];
        for (var key in items) {
            var item = items[key];
            arr.push(item)
        }
        return arr;
    }
}
```

### 6.2 交集 并集 差集

```javascript
/**
 * 返回两个集合的交集
 * @param {any} otherSet 要进行交集操作的集合
 * @returns 两个集合的交集
 */
this.intersection = function (otherSet) {
    // 初始化一个新集合，用于表交集
    var interSectionSet = new Set();
    // 把当前集合转换成数组
    var values = this.values();
    // 遍历数组，如果另外一个集合也有该元素，则interSectionSet加入该元素。
    for (var i = 0; i < values.length; i++) {
        if (otherSet.has(values[i])) {
            interSectionSet.add(values[i]);
        }
    }

    return interSectionSet;
}

/**
 * 返回两个集合的并集
 * @param {any} otherSet 要进行并集操作的集合
 * @returns 两个集合的并集
 */
this.union = function (otherSet) {
    // 初始化一个新集合，用于表示并集
    var unionSet = new Set();
    // 把当前集合依次添加进unionSet
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
    }

    // 将其他集合转换成数组，依次加添进unionSet
    values = otherSet.values();
    for (var i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
    }

    return unionSet
}
/**
 * 返回两个集合的差集
 * 
 * @param {any} otherSet 要进行差集操作的集合
 * @returns 两个集合的差集
 */
this.difference = function (otherSet) {
    var differenceSet = new Set();
    var values = this.values();
    // 遍历数组，如果另外一个集合不存在该元素，则differenceSet加入该元素。
    for (var i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
            differenceSet.add(values[i]);
        }
    }

    return differenceSet;
}
 /**
  * 判断该集合是否为传入集合的子集
  * @param {any} otherSet 传入的集合
  * @returns 如果为子集则返回true
  */
 this.subset = function (otherSet) {
     // 如果该集合长度大于传入集合的长度，直接返回false，表示不是子集
     if (this.size() > otherSet.size()) {
         return false
     }

     var values = this.values();
     // 遍历数组, 只要该集合中存在一个传入集合没有的元素，则返回false，表示不是子集
     for (var i = 0; i < values.length; i++) {
         if (!otherSet.has(values[i])) {
             return false;
         }
     }
     return true;
 }
```

## 7 字典

## 8 散列表