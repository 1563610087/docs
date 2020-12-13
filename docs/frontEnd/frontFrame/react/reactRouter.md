# react-router

使用React构建的单页面应用，要想实现页面间的跳转，首先想到的就是使用路由。在React中，常用的有两个包可以实现这个需求，那就是react-router和react-router-dom。

`react-router` React Router 核心

 `react-router-dom` 用于 DOM 绑定的 React Router

 `react-router-native` 用于 React Native 的 React Router

 `react-router-redux` React Router 和 Redux 的集成

 `react-router-config` 静态路由配置的小助手

## 1 使用react-router

```
npm install --save react-router-dom
```

### 1.1 组件

#### 1 Router

* 路由器组件，用来包含各个路由组件，用来管理路由
* 属性：history={hashHistory}用来监听浏览器地址栏的变化，并将url解析成一个地址对象，供React Router匹配
* 子组件：Route

#### 2 route

* 路由组件，注册路由
* 属性1：path='' 
* 属性2:component={xx}

#### 3 hashHistory

* 路由的切换由URL的hash变化决定，即url的#部分发生变化

#### 4 link

* 路由链接组件，生成a标签

* 属性1:to='/xxx'

* 属性2:activeClassName='active'

  #### to: object

  一个对象形式的链接地址，可以具有以下任何属性：

  - `pathname` - 要链接到的路径
  - `search` - 查询参数
  - `hash` - URL 中的 hash，例如 #the-hash
  - `state` - 存储到 location 中的额外状态数据

```react
<Link to="/courses" />   //跳转到指定路径
<Link to={{
  pathname: '/course',
  search: '?sort=name',
  state: { price: 18 }
}} />    //跳转到指定路径并且携带参数
```

#### 5 NavLink

这是 Link的特殊版，顾名思义这就是为页面导航准备的。因为导航需要有 “激活状态”

```react
<NavLink
  to="/about"
  activeClassName="selected"
>MyBlog</NavLink>
 //activeClassName: string
//导航选中激活时候应用的样式名，默认样式名为 active

//如果不想使用样式名就直接写style
<NavLink
  to="/about"
  activeStyle={{ color: 'green', fontWeight: 'bold' }}
>MyBlog</NavLink>
```

#### 6 Switch

只渲染出第一个与当前访问地址匹配的 `<Route>` 或 `<Redirect>`。

思考如下代码，如果你访问 `/about`，那么组件 About User Nomatch 都将被渲染出来，因为他们对应的路由与访问的地址 `/about` 匹配。这显然不是我们想要的，我们只想渲染出第一个匹配的路由就可以了，于是 `<Switch>` 应运而生！

```
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

也许你会问，为什么 RR4 机制里不默认匹配第一个符合要求的呢，答：这种设计允许我们将多个 `<Route> `组合到应用程序中，例如侧边栏（sidebars），面包屑 等等。

**children: node**
 `<Switch>` 下的子节点只能是 `<Route>` 或 `<Redirect>` 元素。只有与当前访问地址匹配的第一个子节点才会被渲染。`<Route>` 元素用它们的 `path` 属性匹配，`<Redirect>` 元素使用它们的 `from` 属性匹配。如果没有对应的 `path` 或 `from`，那么它们将匹配任何当前访问地址。

#### 7 Redirect

`<Redirect>` 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址

**to: string**
 重定向的 URL 字符串

**to: object**
 重定向的 location 对象

**push: bool**
 若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。

代码示例看9withrouter

#### 8 Prompt

当用户离开当前页面前做出一些提示。

**message: string**
 当用户离开当前页面时，设置的提示信息。

```
<Prompt message="确定要离开？" />
```

**message: func**
 当用户离开当前页面时，设置的回掉函数

```
<Prompt message={location => (
  `Are you sue you want to go to ${location.pathname}?` 
)} />
```

**when: bool**
 通过设置一定条件要决定是否启用 Prompt

#### 9 withRouter

```react
import NotFound from './NotFound'
/*或者直接在组件上使用‘@withRouter’*/
class App extends Component{
    //此时才能获取this.props,包含（history, match, location）三个对象
    console.log(this.props);  //输出{match: {…}, location: {…}, history: {…}, 等}
    render(){return (<div className='app'>
            <NavLink to='/one/users'>用户列表</NavLink>
            <NavLink to='/one/companies'>公司列表</NavLink>
            <Switch>
                <Route path='/one/:type?' component={One} />
                <Redirect from='/' to='/one' exact />
                <Route component={NotFound} />
            </Switch>
        </div>)
    }
}
export default withRouter(App);  //这里要执行一下WithRouter
```

**作用：**把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上

默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面

然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props

### 1.2 示例

Router是一个组件容器，里面的路由通过Route来定义

route属性path是路由的路径，component是需要渲染的组件

IndexRoute在react-router4里面已经不存在了

Exact 是路径的精确匹配

```javascript
import { Router, Route, hashHistory } from 'react-router';
import Index from './Index'
import Repos from './Repos'
import About from './About'
render((
  <Router history={hashHistory}>
  	 <Route path="/" component={App}/>
		 	<Route exact path="/" component={Index}
 		 	<Route path="/repos" component={Repos}/>
 		 	<Route path="/about" component={About}/>
     <Route/>
	</Router>
), document.getElementById('app'));
```

## 2 对象和方法

#### history

histoty 是 RR4 的两大重要依赖之一（另一个当然是 React 了），在不同的 javascript 环境中， history 以多种能够行驶实现了对会话（session）历史的管理。

我们会经常使用以下术语：

- "browser history" - history 在 DOM 上的实现，用于支持 HTML5 history API 的浏览器
- "hash history" - history 在 DOM 上的实现，用于旧版浏览器。
- "memory history" - history 在内存上的实现，用于测试或非 DOM 环境（例如 React Native）。

history 对象通常具有以下属性和方法：

- length: number  浏览历史堆栈中的条目数
- action: string 路由跳转到当前页面执行的动作，分为 PUSH, REPLACE, POP
- location: object 当前访问地址信息组成的对象，具有如下属性：
- pathname: string URL路径
- search: string URL中的查询字符串
- hash: string URL的 hash 片段
- state: string 例如执行 push(path, state) 操作时，location 的 state 将被提供到堆栈信息里，state 只有在 browser 和 memory history 有效。
- push(path, [state]) 在历史堆栈信息里加入一个新条目。
- replace(path, [state]) 在历史堆栈信息里替换掉当前的条目
- go(n) 将 history 堆栈中的指针向前移动 n。
- goBack() 等同于 go(-1)
- goForward 等同于 go(1)
- block(prompt) 阻止跳转

history 对象是可变的，因为建议从 `<Route>` 的 prop 里来获取 location，而不是从 history.location 直接获取。这样可以保证 React 在生命周期中的钩子函数正常执行，例如以下代码：

```react
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged
    const locationChanged = nextProps.location !== this.props.location

    // 错误方式，locationChanged 永远为 false，因为history 是可变的
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}
```

#### location

location 是指你当前的位置，将要去的位置，或是之前所在的位置

```
{
  key: 'sdfad1'
  pathname: '/about',
  search: '?name=minooo'
  hash: '#sdfas',
  state: {
    price: 123
  }
}
```

在以下情境中可以获取 location 对象

- 在 `Route component` 中，以 this.props.location 获取
- 在 `Route render` 中，以 ({location}) => () 方式获取
- 在 `Route children` 中，以 ({location}) => () 方式获取
- 在 `withRouter` 中，以 this.props.location 的方式获取

location 对象不会发生改变，因此可以在生命周期的回调函数中使用 location 对象来查看当前页面的访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用

```
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}
```

可以在不同情境中使用 location：

- `<Link to={location} />`
- `<NaviveLink to={location} />`
- `<Redirect to={location />`
- history.push(location)
- history.replace(location)

#### match

match 对象包含了` <Route path> `如何与 URL 匹配的信息，具有以下属性：

- params: object 路径参数，通过解析 URL 中的动态部分获得键值对
- isExact: bool 为 true 时，整个 URL 都需要匹配
- path: string 用来匹配的路径模式，用于创建嵌套的 `<Route>`
- url: string URL 匹配的部分，用于嵌套的 `<Link>`

在以下情境中可以获取 match 对象

- 在 `Route component` 中，以 this.props.match获取
- 在 `Route render` 中，以 ({match}) => () 方式获取
- 在 `Route children` 中，以 ({match}) => () 方式获取
- 在 `withRouter` 中，以 this.props.match的方式获取
- matchPath 的返回值

当一个 Route 没有 path 时，它会匹配一切路径。

作者：梁相辉

链接：https://www.jianshu.com/p/e3adc9b5f75c/

来源：简书

简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

## 3 路由跳转

实现路由跳转有三种组件

* BrowserRouter 
* HashHistory 
* MemoryHistory 

### 3.1 BrowserRouter 

`<BrowserRouter>` 使用 HTML5 提供的 history API (`pushState`, `replaceState` 和 `popstate` 事件) 来保持 UI 和 URL 的同步。

```react
import  { BrowserRouter }  form 'react-router-dom';
< BrowserRouter 
  basename = { optionalString } //所有位置的基本UR 
  forceRefresh = { optionalBool } //如果true路由器将在页面导航上使用整页刷新 通常用于不支持html5 history api的浏览器上
  getUserConfirmation = { optionalFunc }// 用户确认导航的功能回调函数
  keyLength = { optionalNumber } //location.key的长度 默认6
>
  < App />
</ BrowserRouter >
```

* **basename: string**

所有位置的基准 URL。如果你的应用程序部署在服务器的子目录，则需要将其设置为子目录。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

**使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 `basename` 设置到此目录。**

```react
<BrowserRouter basename="/calendar">
  <Link to="/today" />
</BrowserRouter>
```

上例中的 `<Link>` 最终将被呈现为：

```react
<a href="/calendar/today" />
```

* **forceRefresh: bool**

如果为 `true` ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。

```react
const supportsHistory = 'pushState' in window.history;

<BrowserRouter forceRefresh={!supportsHistory} />
```

* **getUserConfirmation: func**

用于确认导航的函数，默认使用 [window.confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)。例如，当从 `/a` 导航至 `/b` 时，会使用默认的 `confirm` 函数弹出一个提示，用户点击确定后才进行导航，否则不做任何处理。译注：需要配合 `<Prompt>` 一起使用。

```react
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<BrowserRouter getUserConfirmation={getConfirmation} />
```

* **keyLength: number**

`location.key` 的长度，默认为 `6`。

（key的作用：点击同一个链接时，每次该路由下的 `location.key`都会改变，可以通过 key 的变化来刷新页面。）

```
<BrowserRouter keyLength={12} />
```

### 3.2 HashRouter

Hash history 不支持 `location.key` 和 `location.state`。另外由于该技术只是用来支持旧版浏览器，因此更推荐大家使用 BrowserRouter

`<HashRouter>` 使用 URL 的 `hash` 部分（即 `window.location.hash`）来保持 UI 和 URL 的同步。

```
import { HashRouter } from 'react-router-dom';

<HashRouter>
  <App />
</HashRouter>
```

> 注意： 使用 `hash` 记录导航历史不支持 `location.key` 和 `location.state`。在以前的版本中，我们视图 shim 这种行为，但是仍有一些问题我们无法解决。任何依赖此行为的代码或插件都将无法正常使用。由于该技术仅用于支持旧式（低版本）浏览器，因此对于一些新式浏览器，我们鼓励你使用 `<BrowserHistory>` 代替。
>
> * **basename: string**
>
> ```jsx
> <HashRouter basename="/calendar"/>
> <Link to="/today"/> // renders <a href="#/calendar/today">
> ```

### 3.3 **MemoryHistory** 

### 3.4 三种组件的对比

区别：

1 url表现不一致

BrowserRouter使用HTML5 history API，保证UI界面和URL保存同步

HashRouter使用URL（即window.location.hash）的哈希部分来保持UI与URL同步的。哈希历史记录不支持location.key和location.state 。 用来支持旧版浏览器，官方不建议使用。

刷新页面或者直接浏览器回退一步，然后再前进时，BowserRouter的页面依然可以获取到state中的值，也就是进入路由后即使我们刷新页面上一个页面传递过来的参数依然有效！ 看以下打印结果~

** 测试步骤是先通过点击出发js跳转，然后回退上一页然后再点击下一页回到路由about页面

```react
class About extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.location);
        return (
            <div className="demo">
                我是一个路由跳转后的子页面
                <br />
                <div>
                    参数：{JSON.stringify(this.props.location)}
                </div>
                <Link to="/">回首页</Link>
            </div>
        );
    }
}
```

通过js执行跳转

```react
this.props.history.push({
    pathname: '/about',
    state: {
        msg: '来自首页的问候！by state'
    }
});
```



```react
HashRouter
//第一次进入页面打印结果
{"pathname":"/about","state":{"msg":"来自首页的问候！by state"},"search":"","hash":""}
//刷新页面或者后退再前进
{"pathname":"/about","search":"","hash":""}
```



```react
BowserRouter
//第一次进入页面打印结果
{"pathname":"/about","state":{"msg":"来自首页的问候！by state"},"search":"","hash":"","key":"1m6gz4"}
//刷新页面或者后退再前进
{"pathname":"/about","state":{"msg":"来自首页的问候！by state"},"search":"","hash":"","key":"1m6gz4"}
```

到这儿，应该知道为啥说location不支持key和state了吧，当我们通过state传递参数的时候，因为hashRouter没有使用html5中history的api，无法从历史记录中获取到key和state值，所以当刷新路由后state值会丢失导致页面显示异常。

**总结，实现路由页面页面刷新数据不丢失的方案**

- BorwserRouter有三种方式（url传值，路由参数传值，以及state）
- HashRouter有两种方式（url传值，路由参数传值）
- 本地缓存或者状态管理方案

## 4 路由传参

#### 4.1 query

`通过query`
 前提：必须由其他页面跳过来，参数才会被传递过来
 注：不需要配置路由表。路由表中的内容照常：<Route path='/user' component={User}></Route>

**传参**

```
HTML方式
<Link to={{ pathname: ' /user' , query : { day: 'Friday' }}}>
```

```
js方式
this.props.history.push({ pathname : '/user' ,query : { day: 'Friday'} })
```

**调用**

user页面：this.props.location.query.day

#### 4.2 state

`通过state`
 同query差不多，只是属性不一样，而且state传的参数是加密的，query传的参数是公开的，在地址栏

**传参**

Link处

```
  HTML方式：<Link to={{ pathname : ' /user' , state : { day: 'Friday' }}}> 
```

JS方式：

```
this.props.history.push({ pathname:'/user',state:{day : 'Friday' } })
```

**调用**

//user页面       
this.props.location.state.day

#### 4.3 url ？传参

```react
<Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route component={Home} />
</Switch>


//link方式跳转
<Link to="/about?msg='我是url参数'">去关于我的页面 url传递参数</Link>
//js方式跳转
 this.props.history.push({ pathname:"/about?msg='我是url参数'"});
//about中获取参数
console.log(this.props.location)
//{pathname: "/about", search: "?msg='我是url参数'", hash: "", state: undefined}
```

优缺点：参数比较灵活，参数直接在url中暴露，刷新路由页面时传递参数依然可以正常访问。缺点是还需要js通过search中解析类似getParameter(msg)方式获取真实值

#### 4.4 通过:id方式

```
<Route exact path="/about/:msg" component={About} />
//link方式
<Link to="/about/我是url参数">去关于我的页面 路由配置传递参数</Link>
//js方式跳转
 this.props.history.push({ pathname:"/about/'我是url参数'"});
//about中获取参数
console.log(this.props.match.params.msg)
//我是url参数
```

优缺点：参数比较灵活，参数直接在url中暴露,刷新路由页面时传递参数依然可以正常访问。但每增加一个参数需要在Route中注册一个，而且顺序需要一致。

## 5 路由的使用场景

### 5.1 嵌套路由

### 5.2 路由导航

**1 声明式导航**

采用link，navlink标签进行导航

```react
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
<div className="tab-bar">
    <Route path="/index" exact component={Index}></Route>
    <Route path="/index/news" component={News}></Route>
    <Route path="/index/course" component={Course}></Route>
    <Route path="/index/mine" component={Mine}></Route>
    <ul className="footer">
        <li><NavLink exact to="/index" activeStyle={{ color: '#4dc060' }}>首页列表项目 </NavLink></li>
        <li><NavLink to="/index/news" activeStyle={{ color: '#4dc060' }}>资讯</NavLink></li>
        <li><NavLink to="/index/course" activeStyle={{ color: '#4dc060' }}>课程</NavLink></li>
        <li><NavLink to="/index/mine" activeClassName="selected">我的</NavLink></li>
    </ul>
```

**2 编程式导航**

之前的导航都是用`link`标签或者直接操作地址栏的形式完成的，那如果在业务逻辑代码中需要跳转页面我们如何操作？编程式导航，就是在业务逻辑代码中实现导航.

```react
import {withRouter} from 'react-router-dom';

goBack(){
    this.props.history.goBack();
}  
goDetail(){
    this.props.history.push('/detail');
}  
goDetailWithParam(item){
    this.props.history.push({pathname : '/cart',state:{item}});
}
    
<span className="ico" onClick={this.goBack.bind(this)}>
    <i className="iconfont">&#xe501;</i>
</span>
//这里的item来自for循环的每一项
<li onClick={this.goDetailWithParam.bind(this,item)} key={encodeURI(item.imgUrl)}>

export default withRouter(Header);
```

> 引入`withRouter`之后,就可以使用编程式导航进行点击跳转, 需要注意的是`export default`的暴露如上面所写,如果结合redux使用,则暴露方式为: `withRouter(connect(...)(MyComponent))`
> 调用`history`的`goBack`方法会返回上一历史记录
> 调用`history`的`push`方法会跳转到目标页,如上面`goDetail`方法
> 跳转传参: `push()`可以接收一个对象参数,跳转之后,通过`this.props.location.state`接收

### 5.3 侧边栏

### 5.4 路由守卫

在使用 Vue 或者 Angular 的时候，框架提供了路由守卫功能，用来在进入某个路由前进行一些校验工作，如果校验失败，就跳转到 404 或者登陆页面

首先，导航守卫在业务层面可能有三种表现：

1. 根据状态（如登录/未登录）和身份（等级）将路由进行限制。低等级的用户根本没有定义某些路由。
2. 路由在任何时候都是完整的，只是根据状态和身份，将入口进行限制。没有任何操作能够导向没有权限访问的路由地址。
3. 不对入口进行限制，根据状态和身份，将某些特定的路由添加拦截。

在这几种表现中，2和3并不相互冲突。现在有两种思路实现导航守卫：

- 写一个路由配置表，写一个高阶组件，导航守卫的功能由高阶组件完成，所有与路由绑定的组件都被高阶组件修饰。（对应业务场景3）
- 写一个路由配置表，定义一个组件：根据路由配置生成最终的`<Route>`。对于用户没有权限的路由，可以控制不将其渲染。（对应业务场景1）
- 写一个路由配置表，写一个高阶组件，将是否渲染入口的逻辑写在高阶组件中，所有可能被隐藏的入口都被此高阶组件修饰。（对应业务场景2）

## 6项目添加路由

1 安装

```
cnpm install -D react-router-dom
```

2 index.js

```react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 路由使用 history模式
import { BrowserRouter } from 'react-router-dom';
// 路由采用 hash模式
// import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('root'));
```

3 在根组件app中

```react
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './pages/loginPage'
import UserInfoPage from './pages/user/UserInfoPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Login}/>
      <Route path='/UserInfoPage' component={UserInfoPage}/>
    </div>
  );
}

export default App;
```

