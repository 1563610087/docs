# react 进阶

# 1 hook

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

**Hook 使你在无需修改组件结构的情况下复用状态逻辑**

**Hook 使你在非 class 的情况下可以使用更多的 React 特性**

**什么时候我会用 Hook？** 如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

### 1.1 定义

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React，下面为两种方式的对比。

```react
import React, { useState, useEffect } from 'react';
class App extends React.Component{
  constructor() {
    super()
    this.state = {
      count:1
    }
  }
  render() {
    const count = this.state.count
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={()=>this.setState({count:count+1})}>点击</button>
      </div>
    )
  }
}
export default App


```

```react
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App
```

### 1.2 useState

例子

```react
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App
```

**const [count, setCount] = useState(0)**

表示设置一个state变量，变量名为count，setcount为一个函数，这个函数可以改变count的值，类似this.setState

useState可以给变量count设置初始值，这里设置的是0，useState()方法接受的参数就是初始的state

useState()方法它返回一个有两个值的数组。第一个值是当前的 state，第二个值是更新 state 的函数，这里采用方括号定义了一个 state 变量，这是因为采用数组的结构赋值，将返回的数组的元素赋值这两个变量。

* 设置多个state

  ```react
  function ExampleWithManyStates() {
    // 声明多个 state 变量
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
  ```

* 更新state

  ```react
  //直接采用setCount更新state 
  <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  ```

### 1.3 useEffect 

数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用

把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合

```react 
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

react中有两种常见副作用操作：需要清除的和不需要清除的。我们来更仔细地看一下他们之间的区别。

**1 无需清除的effect**
有时候，我们只想**在 React 更新 DOM 之后运行一些额外的代码。**比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。因为我们在执行完这些操作之后，就可以忽略他们了。

```react
//在类组件中，我们需要在初次渲染和更新两个阶段调用相同的代码，造成代码的重复

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

```react
//在hook中，只需要使用一次useEffect即可

import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

useEffect会在每次渲染后执行，包括第一次渲染和更新之后的渲染。将useEffect放在组件内部可以直接访问到state变量，变量在函数作用域中。

**2 需要清除effect**

在 React class 中，你通常会在 `componentDidMount` 中设置订阅，并在 `componentWillUnmount`中清除它。例如，假设我们有一个 `ChatAPI` 模块，它允许我们订阅好友的在线状态。以下是我们如何使用 class 订阅和显示该状态：

```react
//在类组件中
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

```react
//使用hook
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

在useEffect中返回一个函数，这是effect可选的清除机制，组件会在卸载的时候执行清除操作，调用这个函数。每次数据更新会先调用return返回的函数进行清除，然后执行函数内的内容

**effect性能优化**

effect每次重新渲染就会调用函数，这就会导致性能问题，所以useEffect可以传入第二个参数

```react
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

上面这个示例中，我们传入 `[count]` 作为第二个参数。这个参数是什么作用呢？如果 `count`的值是 `5`，而且我们的组件重渲染的时候 `count` 还是等于 `5`，React 将对前一次渲染的 `[5]` 和后一次渲染的 `[5]` 进行比较。因为数组中的所有元素都是相等的(`5 === 5`)，React 会跳过这个 effect，这就实现了性能的优化。

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

### 1.4 使用规则

### 1.5 自定义hook

### 1.6 采用hook和类组件的对比

