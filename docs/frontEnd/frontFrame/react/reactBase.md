# React学习笔记

## 1 介绍

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。

特点：

- **1.声明式设计** −React采用声明范式，可以轻松描述应用。
- **2.高效** −虚拟(virtual)DOM, 不总是直接操作DOM(批量更新, 减少更新的次数) 高效的DOM Diff算法, 最小化页面重绘(减小页面更新的区域)
- **3.灵活** −React可以与已知的库或框架很好地配合。
- **4.JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
- **5.组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
- **6.单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

## 2 基本例子

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    
    <script src="../build/react.development.js"></script>
    <script src="../build/react-dom.development.js"></script>
    <script src="../build/babel.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
         //html模版
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

上面代码有两个地方需要注意。首先，最后一个 `<script>` 标签的 `type` 属性为 `text/babel`。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 `type="text/babel"`

`react.js` 是 React 的核心库，`react-dom.js` 是提供与 DOM 相关的功能，`bable.js` 的作用是将 JSX 语法转Babel 可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。同时Babel 可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。

## 3 jsx语法

### 3.1 基本概念

规则：

1. 在 JSX 中不能使用 if else 语句，但可以使用 conditional (三元运算) 表达式来替代
2. camelCase 语法来设置内联样式. React 会在指定元素数字后自动添加 px 。
3. 注释需要写在花括号中
4.  JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员
5. 遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{` 开头），就用 JavaScript 规则解析

```
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

2. 插入变量到javascript

```
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

### 3.2 jsx原理

本质上来讲，JSX 只是为 `React.createElement(component, props, ...children)` 方法提供的语法糖。比如下面的代码：

```
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

编译为：

```
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

如果没有子代，你还可以使用自闭合标签，比如：

```
<div className="sidebar" />
```

编译为：

```
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

### 3.3 jsx**语法特点**

- JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
- 它是类型安全的，在编译过程中就能发现错误。
- 使用 JSX 编写模板更加简单快速。
- jSX 防注入攻击中,React DOM 在渲染之前默认会 过滤所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击

## 4 元素渲染

元素是构成 **React 应用的最小单位**，它用于描述屏幕上输出的内容

React 元素是**不可变对象**。一旦被创建，你就无法更改它的子元素或者属性。

根据我们已有的知识，**更新 UI 唯一的方式是创建一个全新的元素，并将其传入 `ReactDOM.render()**`。React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。虚拟dom中的diff算法

```react
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

接收两个参数：ReactDOM.render(虚拟dom对象，container)

## 5 组件

组件的定义方式：函数组件，类组件

### 5.1 函数组件

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

一个函数就是一个组件，return一份DOM解构 特点：

 1.没有生命周期，也会被更新并挂载，但是没有生命周期函数

 2.没有this(组件实例） 

3.没有内部状态（state）

 优点 ：轻量，如果你的组件没有涉及到内部状态，只是用来渲染数据，那么就用函数式组件，性能较好。

### 5.2 class组件

```
//es6语法
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 5.3 函数组件和类组件的区别

函数组件没有state，无法使用组件的生命周期方法，接受props，渲染dom，不关注逻辑，是一个无状态组件

函数组件和类组件当然是有区别的，而且函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。为了提高性能，尽量使用函数组件。

| 区别               | 函数组件 | 类组件 |
| ------------------ | -------- | ------ |
| 是否有 `this`      | 没有     | 有     |
| 是否有生命周期     | 没有     | 有     |
| 是否有状态 `state` | 没有     | 有     |

### 5.4 组件渲染

```react
const element = <Welcome name="Sara" />;
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

渲染过程：

1. 我们调用 `ReactDOM.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数。
2. React 调用 `Welcome` 组件，并将 `{name: 'Sara'}` 作为 props 传入。
3. `Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。
4. React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

注意：**组件名称必须以大写字母开头**   **React 会将以小写字母开头的组件视为原生 DOM 标签**

### 5.5 props

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props

如果我们需要向组件传递参数，可以使用 **this.props** 对象,实例如下

```react
function HelloMessage(props) {
    return <h1>Hello {props.name}!</h1>;
}
 
const element = <HelloMessage name="Runoob"/>;
 
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

```react
//可以通过组件类的 defaultProps 属性为 props 设置默认值
function HelloMessage(props) {
    return <h1>Hello {props.name}!</h1>;
}
 
const element = <HelloMessage name="Runoob"/>;
 
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

Props**验证**

Props 验证使用 **propTypes**，它可以保证我们的应用组件被正确使用，React.PropTypes 提供很多验证器 (validator) 来验证传入数据是否有效。当向 props 传入无效数据时，JavaScript 控制台会抛出警告

```react
var title = "菜鸟教程";
// var title = 123;
class MyTitle extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.title}</h1>
    );
  }
}
 
MyTitle.propTypes = {
  title: PropTypes.string
};
ReactDOM.render(
    <MyTitle title={title} />,
    document.getElementById('example')
);
```



### 5.6 复合组件

我们可以通过创建多个组件来合成一个组件，即把组件的不同功能点进行分离。

以下实例我们实现了输出网站名字和网址的组件

```react
function Name(props) {
    return <h1>网站名称：{props.name}</h1>;
}
function Url(props) {
    return <h1>网站地址：{props.url}</h1>;
}
function Nickname(props) {
    return <h1>网站小名：{props.nickname}</h1>;
}
function App() {
    return (
    <div>
        <Name name="菜鸟教程" />
        <Url url="http://www.runoob.com" />
        <Nickname nickname="Runoob" />
    </div>
    );
}
 
ReactDOM.render(
     <App />,
    document.getElementById('example')
);
```

## 6 state

React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。state应该就是一个存储数据的地方，改变这个state中的数据，就会改变UI视图

**特点：**

1. 不能直接修改state，要采用setState来更新
2. 状态更新可能是异步的，React 可以将多个`setState()` 调用合并成一个调用来提高性能。

react中不能直接改变state的值，要通过setState属性进行修改。

使用state，需要进行深拷贝或者浅拷贝

### 6.1 state数据改变

* 浅拷贝

  * Object.assign()

    ```javascript
    handleChange (key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        })
      }
    ```

  * slice()

  * 扩展运算符

  ```
  var player = {score: 1, name: 'Jeff'};
  var newPlayer = Object.assign({}, player, {score: 2});
  // player 的值没有改变, 但是 newPlayer 的值是 {score: 2, name: 'Jeff'}
  
  // 使用对象展开语法，就可以写成：
  // var newPlayer = {...player, score: 2}
  const squares = this.state.squares.slice()
  ```

* 深拷贝

  JSON.parse(JSON.stringify(object))

### 6.2 setState

特点：

1. setState是异步的，不会立即改变state的值。
2. 多次setState调用生成的效果会合并。
3. 第二个参数可以是一个回调函数。
4. setState可以接受一个函数（例子改动）

异步的原因：

1. 保证内部的一致性：首先，我想我们都同意推迟并批量处理重渲染是有益而且对性能优化很重要的，无论 setState() 是同步的还是异步的。那么就算让 state 同步更新，props 也不行，因为当父组件重渲染（re-render ）了你才知道 props。
2. 在批量多次的更新中，延缓到最后合并渲染是有好处的。这一点，和我们熟知的防抖动函数的出发点类似，我们普遍认为在许多情况下在同一时间段，频繁setState触发渲染，连续同步效率很低，对性能有极大损耗。

setState引发组件的更新过程：

![setStateå¼åç»ä»¶çæ´æ°è¿ç¨](https://segmentfault.com/img/bVbdGk3?w=244&h=540)

每一次setState如果都引发一次组件更新，走完一圈生命周期，实在是有点粗糙和浪费，生命周期函数为纯函数性能应当还能够接受，可是render函数内返回的虚拟DOM去做比较这个就比较费时间了。

直观的感受是，React将多个setState产生的修改放在一个队列里，缓一缓，攒在一起，等待时机，觉得差不多了再引发一次更新过程。这样，在每次更新过程中，会把积攒的setState结果合并，做一个merge的动作，节省render触发的频率。 
这样，对于开发者而言，可以在同步代码中随意多行调用setState函数而不用担心重复setState重复render的问题





## 7 事件处理

类组件中绑定的回调函数的this指向默认为undefined，类的方法不会绑定this，需要人为绑定this

现在常用的语法是

### 7.1 属性初始化器语法

就是在组件中使用箭头函数

```react
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

### 7.2 回调函数使用箭头函数

```react
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

使用这个语法有个问题就是每次 `LoggingButton` 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

### 7.3 绑定事件传递参数

```react
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
```

## 8 条件渲染

React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI

采用三元表达式或者&&运算符进行条件渲染

```react
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```



## 9 列表

采用map函数来渲染多个组件，需要给每个组件指定唯一的key值

```react
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### 9.1 key的作用

Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。

### 9.2 组合

两个父子组件，子组件不知道父组件传递的数据有哪些，但是需要将传递的值进行渲染，例如下面的例子，A组件将div标签传入了子组件，子组件通过props.children将传入的组件进行渲染。同时，props可以传递组件进去，这个功能类似于vue的slot插槽

```react
import React from 'react'

function B(props) {
  return (
    <div>
      {props.C}
      {props.children}
    </div>
  )
}
function C() {
  return (
    <div>1111</div>
  )
}
class Practice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ha: 1
    }
  }

  render() {
    return (
      <div>
        <B C={<C/>}>
          <div>hhhhh</div>
        </B>
      </div>
    )
  }
}

export default Practice
```

## 10 组件通信

### 10.1 组件通讯

**在使用 React 的过程中，不可避免的需要组件间进行消息传递（通信），组件间通信大体有下面几种情况：**

1. 父组件向子组件通信

通过props进行传递，子组件在props对象上获取父组件传递的参数

2. 子组件向父组件通信

在父组件中声明一个函数，将函数通过props传给子组件，子组件获取到函数，然后进行调用，此时父组件就能得到子组件传过来的参数，父组件就可以进行相应的操作。

```react
//父组件,创建一个add函数
add(newTodo){
    console.log(newTodo)
    //处理子组件传递的参数newTodo
}

//render函数中，将add函数传递给子组件AddList
<AddList add={this.add}/>

//=================

//子组件中，通过props获取到add方法
addList(){
        //获取输入框内容
        let newTodo=this.refs.newTodo.value
        //this.props.add(newTodo)调用add函数，同时将newTodo参数传人，此时父组件中的add方法就能获取到子组件传递的参数newToDo
        this.props.add(newTodo)
    }

```



3. 非嵌套组件间通信

   采用context和redux

## 11 生命周期

### 11.1 生命周期流程

组件的生命周期可分成三个状态：

#### 1 Mounting：挂载阶段

挂载阶段指组件被创建到插入Dom的阶段

这个阶段会调用下面的方法：

* constructor()
* static getDerivedStateFromProps()
* render()
* componentDidMount()

**constructor()**:

 用于绑定事件以及初始化state，此时组件未被挂载到dom上

**getDerivedStateFromProps（）**

在初始化组件数据时, 我们有时需要将组件接收的参数 props 中的数据添加到它的 state 中, 期望组件响应 props 的变化.然而组件接收的 props 数据是只读的, 不可变的, 禁止修改的. 当组件接收了新的 props 时, constructor 函数中数据初始化行为并不会再次发生. 于是我们想要在 `getDerivedStateFromProps` 生命周期函数中获取新的 props 并且调用 setState() 来更新数据.getDerivedStateFromProps 会在每次组件被重新渲染前被调用, 这意味着无论是**父组件的更新, props 的变化, 或是组件内部执行了 setState(), 它都会被调用**.

**componentDidmount()**

在这个阶段组件被挂载到dom元素上，通常在这个方法里面发起ajax请求

#### 2 Updating：更新阶段

触发更新的情况：

1. 传入的props更新
2. 调用setState方法使state更新
3. 通过forceUpdate方法强制更新

在重新渲染之前调用

getDerivedStateFromProp

shouldComponentUpdate

render

getSnapshotBeforeUpdate

componentDidUpdate

 **shouldComponentUpdate(nextProps, nextState)**

当 props 或 state 发生变化时，`shouldComponentUpdate()` 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 `forceUpdate()` 时不会调用该方法。

可以将 `this.props` 与 `nextProps` 以及 `this.state` 与`nextState` 进行比较，并返回 `false` 以告知 React 可以跳过更新。请注意，返回 `false` 并不会阻止子组件在 state 更改时重新渲染。

**componentDidUpdate()**

`componentDidUpdate()` 会在更新后会被立即调用。**首次渲染不会执行此方法**。当组件更新后，可以在此处对 DOM 进行操作

（例如，当 props 未发生变化时，则不会执行网络请求）。

```react
componentDidUpdate(prevProps，preState) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
  if (this.state.userID !== prevState.userID))
}
```

你也可以在 `componentDidUpdate()` 中**直接调用 setState()**，但请注意**它必须被包裹在一个条件语件里**，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。

#### 3 Unmounting：卸载阶段

当组件从dom中移除时会调用如下方法：

componentwillUnmount()

主要用于执行一些清理工作，比如取消网络请求，清楚多余的DOM元素等

#### 4 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

static getDerivedStateFromError（）

componentDidCatch（）

#### 5 生命周期图

![屏幕快照 2019-05-22 上午10.06.03](F:\技术文件\React\image\屏幕快照 2019-05-22 上午10.06.03.png)

### 11.2 常用方法

| 生命周期方法 |                                                              |
| ------------ | ------------------------------------------------------------ |
| 创建阶段     | constructor、getDerivedStateFromProps、render、componentDidMount |
| 更新阶段     | getDerivedStateFromProp、shouldComponentUpdate、render、getSnapshotBeforeUpdate、componentDidUpdate |
| 卸载阶段     | componentwillUnmount                                         |



#### 1 render()

`render()` 方法是 class 组件中唯一必须实现的方法。

当 `render` 被调用时，它会检查 `this.props` 和 `this.state` 的变化并返回以下类型之一：

- **React 元素**。通常通过 JSX 创建。例如，`<div />` 会被 React 渲染为 DOM 节点，`<MyComponent />`会被 React 渲染为自定义组件，无论是 `<div />` 还是 `<MyComponent />` 均为 React 元素。
- **数组或 fragments**。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 [fragments](https://react.docschina.org/docs/fragments.html) 文档。
- **Portals**。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 [portals](https://react.docschina.org/docs/portals.html) 的文档
- **字符串或数值类型**。它们在 DOM 中会被渲染为文本节点
- **布尔类型或 null**。什么都不渲染。（主要用于支持返回 `test && <Child />` 的模式，其中 test 为布尔类型。)

`render()` 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

注意

如果 `shouldComponentUpdate()` 返回 false，则不会调用 `render()`。

#### 2 constructor

**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 `this.state` 赋值对象来初始化内部state
- 为事件处理函数绑定实例



#### 5 componentWillUnmount()

`componentWillUnmount()` 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等。

`componentWillUnmount()` 中**不应调用 setState()**，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

#### 6 setState()

```
setState(updater[, callback])
```

`setState()` 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式

将 `setState()` 视为*请求*而不是立即更新组件的命令。为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。React 并不会保证 state 的变更会立即生效。

`setState()` 并不总是立即更新组件。它会批量推迟更新。这使得在调用 `setState()` 后立即读取 `this.state` 成为了隐患。为了消除隐患，请使用 `componentDidUpdate` 或者 `setState` 的回调函数（`setState(updater, callback)`），这两种方式都可以保证在应用更新后触发。如需基于之前的 state 来设置当前的 state，请阅读下述关于参数 `updater` 的内容。

除非 `shouldComponentUpdate()` 返回 `false`，否则 `setState()` 将始终执行重新渲染操作。如果可变对象被使用，且无法在 `shouldComponentUpdate()` 中实现条件渲染，那么仅在新旧状态不一时调用 `setState()`可以避免不必要的重新渲染

### 11.3 不常用方法



#### 3 getSnapshotBeforeUpdate(prevProps, prevState)

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`

#### 4 forceUpdate()

默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 `render()` 方法依赖于其他数据，则可以调用 `forceUpdate()` 强制让组件重新渲染。

调用 `forceUpdate()` 将致使组件调用 `render()` 方法，此操作会跳过该组件的 `shouldComponentUpdate()`。但其子组件会触发正常的生命周期方法，包括 `shouldComponentUpdate()` 方法。如果标记发生变化，React 仍将只更新 DOM。

通常你应该避免使用 `forceUpdate()`，尽量在 `render()` 只使用 `this.props` 和 `this.state`

### 5 应用场景

组件的初始化阶段的声明周期函数以及重点用法如下：

- constructor(): 用于绑定事件以及初始化state（可以通过"fork"props的方式给state赋值）
- componentWillMount(): 只会在服务端渲染时被调用，你可以在这里同步操作state
- render(): 这个函数是用来渲染DOM没有错。**但它只能用来渲染DOM，请保证它的纯粹性**。如果有操作DOM或者和浏览器打交道的一系列操作，请在下一步骤componentDidMount中进行
- componentDidMount(): 如果你有第三方操作DOM的类库需要初始化（类似于jQuery，Bootstrap的一些组件）操作DOM、或者请求异步数据，都应该放在这个步骤中做

组件更新阶段：

- componentWillReceiveProps(nextProps): 在这里你可以拿到即将改变的状态，可以在这一步中通过setState方法设置state
- shouldComponentUpdate(nextProps, nextState): **这一步骤非常重要**，它的返回值决定了接下来的生命周期函数是否会被调用，默认返回true，即都会被调用；你也可以重写这个函数使它返回false。
- componentWillUpdate(): 我也不知道这个声明周期函数的意义在哪里，在这个函数内你不能调用setState改变组件状态
- render()
- componentDidUpdate(): 和componentDidMount类似，在这里执行DOM操作以及发起网络请求

组件析构阶段：

- componentWillUnmount(): 主要用于执行一些清理工作，比如取消网络请求，清楚多余的DOM元素等

## 12 ref属性

### 12.1 使用场景

下面是几个适合使用 refs 的情况：

- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 DOM 库

如果可以通过声明式实现，则尽量避免使用 refs。

ref的值取决于节点的类型:

- 当 `ref` 属性被用于一个普通的 HTML 元素时，`React.createRef()` 将接收底层 DOM 元素作为它的 `current` 属性以创建 `ref` 。
- 当 `ref` 属性被用于一个自定义类组件时，`ref` 对象将接收该组件已挂载的实例作为它的 `current` 。
- **你不能在函数式组件上使用 ref 属性**，因为它们没有实例。

下面的例子说明了这些差异。

### 12.2 refs使用

```react
  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：通过 "current" 取得 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

          
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

## 13虚拟dom

### 13.1定义

虚拟DOM**简而言之就是，用JS去按照DOM结构来实现的树形结构对象，你也可以叫做**DOM对象

- 一个虚拟DOM(元素)是一个一般的js对象, 准确的说是一个对象树(倒立的)
- 虚拟DOM保存了真实DOM的层次关系和一些基本属性，与真实DOM一一对应
- 如果只是更新虚拟DOM, 页面是不会重绘的

- Virtual DOM 算法的基本步骤
  - 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
  - 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
  - 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了
- 进一步理解
  - Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。
  - 可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

### 13.2 diff算法

- 

## 14 高阶组件

**高阶组件是一个函数，能够接受一个组件并返回一个新的组件**

### 14.1 使用原因

*  复用代码。很多个react组件都需要公用同一个逻辑，可以将公用的逻辑抽离出来，然后采用高阶组件的方式去应用

* 修改现有react组件。有些react组件不是自己开发或者是第三方，不想去修改原有组件，可以采用高阶组件

### 14.2 实现方式

#### 1 代理

#### 2 继承

### 14.3 遵循原则

1、不要修改原始组件

常见做法是通过修改原组件的prototype来重写其生命周期方法等（如给WrappedComponent.prototype.componentWillReceiveProps重新赋值）。请使用纯函数返回新的组件，因为一旦修改原组件，就失去了组件复用的意义。

2、props保持一致

高阶组件在为子组件添加特性的同时，要保持子组件的原有的props不受影响。传入的组件和返回的组件在props上尽量保持一致。

3、保持可组合性

4、displayName

为了方便调试，最常见的高阶组件命名方式是将子组件名字包裹起来。

5、不要在render方法内部使用高阶组件

render中的高阶组件会在每次render时重新mount，之前组件内部的state也会丢失。

### 14.3 使用场景

关于高阶组件解决的问题可以简单概括成以下几个方面：

- 代码复用：这是高阶组件最基本的功能。组件是React中最小单元，两个相似度很高的组件通过将组件重复部分抽取出来，再通过高阶组件扩展，增删改props，可达到组件可复用的目的；
- 条件渲染：控制组件的渲染逻辑，常见case：鉴权；
- 生命周期捕获/劫持：借助父组件子组件生命周期规则捕获子组件的生命周期，常见case：打点。

1 操作props

2 抽取状态

## 15mock.js

安装：

```
npm install axios
npm install mock.js
```

使用教程：

1. 编写模拟数据

2. ```react
   var Mock = require('mockjs')
   
   var data = Mock.mock('/api/list', {
     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
     'list|1-10': [{
       // 属性 id 是一个自增数，起始值为 1，每次增 1
       'id|+1': 1
     }]
   })
   // 输出结果
   export default data
   
   ```

3. 在需要模拟的组件中引入数据

   ```
   import '../mock/mock'
   ```

4. 在组件中发送请求

   ```react
   // 发送ajxa请求
     componentDidMount () {
       axios.get('/api/list').then((response) => {
         console.log(response.data)
         // this.setState({
         //   todoList: response.data.todoList
         // })
       }).catch((error) => {
         console.log(error)
       })
     }
   ```


## 16 react发送ajax

1. axios

   ```react
   componentDidMount () {
       axios.get(' https://easy-mock.com/mock/5d1dae3f2945dd709a70c603/api/list/').then((response) => {
         console.log(response)
         let todoList = response.data.todoList
         console.log(todoList)
         this.setState({
           todoList: todoList
         })
       }).catch((error) => {
         console.log(error)
       })
     }
   ```

2. Fetch

   ```react
   componentDidMount () {
       fetch('https://easy-mock.com/mock/5d1dae3f2945dd709a70c603/api/list/')
         .then((response) => {
           return response.json()
         })
         .then(data => {
           this.setState({
             todoList: data.todoList
           })
         })
         .catch((error) => {
           console.log(error)
         })
     }
   ```

`fetch` 是浏览器内置对象，所以我们不用安装包，直接使用

- 使用流程
  - fetch ...
  - then => res.json()
  - then => data

> 注意需要执行一次 `res.json()` 方法才能获取数据

## 17  proptype类型校验

```react
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
}
```

#### 默认值设置

```react
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

## 18 context

### 18.1 基本使用

使用步奏

1. 先创建context对象，是在外层的组件中写
2. 采用context.provider将需要接受参数的组件包裹，这样子组件就能访问上面的值
3. 在需要接受参数的组件中，声明contextType属性
4. 在需要接受参数的组件中，通过this.context就能获取值

```react
import React from 'react'


//1 先创建一个context对象
const Hacontext = React.createContext('light')

class Practice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        ha: 1,
        he: (val) => {
          console.log('heheh',val)
        }
      }
    }
  }
  render() {

    return (
      <div>
        {/* 2 将子组件包起来，这样就可以传递到子组件,value为要传的数据 */}
        <Hacontext.Provider value={this.state.value}>
          <B />
        </Hacontext.Provider>
      </div>
    )
  }
}


class B extends React.Component {
  // 3 声明类型
  static contextType = Hacontext
  render() {
    const { ha, he } = this.context
    return (
      <div>
        {/*4  通过this.context获取值 */}
        <div onClick={() => he(2)}>{ha}</div>
        <Hacontext.Consumer>
          {
            ({ ha, he }) => {
              return (
                <div onClick={()=>he(222222)}>
                  {ha}
                </div>
              )
            }
            }
        </Hacontext.Consumer>
      </div >
    )
  }
}


export default Practice
```

