# slideload.js

Javascript 移动端下拉刷新与无限滚动插件

### 特性

- 优秀的性能，流畅的缓动动画；
- 优先使用CSS3的 transfrom & transition 来实现动画效果，并开启3D硬件加速以获得更好的动画性能；
- 使用 Passive event listeners 新特性，并使用浏览器原生滚动条，提高页面的滚动流畅度；
- 不依赖任何js库，比如大名鼎鼎的jQuery；
- 不仅适用于浏览器的window窗口，同时也适用于任何具有滚动条的普通HTML元素；

### 获取 slideload

#### 从Github克隆到本地

```bash
git clone https://github.com/lxyPJ/slideload.git
```

### 浏览器兼容性

- iOS 7.0+ Android 4.4+ 所有浏览器(包括webview)

### 使用方法

#### 载入slideload.js
###### script标签
```html
<script type="text/javascript" src="../dist/slideload.min.js"></script>
```
###### webpack CommonJS规范
```javascript
var Slideload = require("slideload.min.js");
```
###### AMD规范
```javascript
define(["slideload.min.js"],function(Slideload){
    ……
    ……
});
```
###### ES6模块
```javascript
import Slideload from "slideload.min.js";
```

#### 例子

###### HTML

```html
<div class="scroll-window">
    <div id="scroll-body"></div>
</div>
```
###### CSS
```css
.scroll-window{
    width:100%; height:100%;
    overflow:auto; -webkit-overflow-scrolling:touch;
}
```
###### JS
```javascript
var slideload = new Slideload(document.querySelector(".scroll-window"),{
    scrollCont:document.querySelector("#scroll-body"),
    refreshDOM:{
        "pull2refresh":'<p class="refresh-tip">↓ 下拉刷新</p>',
        "release2refresh":'<p class="refresh-tip">↑ 释放刷新</p>',
        "loading":'<div id="infinite-loading" class="infinite-loading">正在刷新...</div>',
        "refreshSuccess":'<p class="refresh-tip">√ 刷新成功</p>'
    },
    loadMoreDOM:{
        "pull2load":'<p class="refresh-tip">↑ 上拉加载更多</p>',
        "loading":'<div id="infinite-loading" class="infinite-loading">正在加载...</div>',
        "loadSuccess":'<p class="refresh-tip">√ 加载成功</p>'
    }
});
var hasData = true;
//注册滚动加载事件
slideload.on('load',function(next,stop){
    //通过ajax获取数据，渲染DOM
    ……
    ……

    if(hasData){
        next();//如果还有数据，调用next();
    }else{
        stop();//如果没有数据，调用stop();
    }
});
//注册下拉刷新事件
slideload.on('refresh',function(next,stop){
    //通过ajax获取数据，渲染DOM
    ……
    ……

    next();//下拉刷新渲染完DOM必须调用next();
});
```

### slideload API

#### 滚动容器(DOM)

- new Slideload(```DOM```,options)
- `{HTMLElement}`
- `required:true`
- 滚动容器dom节点(可以是`window`或者`div`)

#### 选项(options)

- new Slideload(DOM,```options```)
- `{Object}`
- `required:true`

###### scrollCont

- `{HTMLElement} {String}`
- `required:true`
- 滚动内容dom节点
- 也可以传入class或者id  ( e.g `"#scroll-body"` or `".scroll-body"` )

###### threshold
- `{Number}`
- `required:false`
- `defaultValue:50` 
- 适用于滚动加载，可设置滚动提前加载的距离，单位px

###### distance

- `{Number}`
- `required:false`
- `defaultValue:50`
- 适用于下拉刷新，可设置触发下拉刷新的阈值，单位px

###### refreshDOM

- `{Object}`
- `required:true`
- e.g
```javascript
refreshDOM:{
    "pull2refresh":'<p class="refresh-tip">↓ 下拉刷新</p>',
    "release2refresh":'<p class="refresh-tip">↑ 释放刷新</p>',
    "loading":'<div id="infinite-loading" class="infinite-loading">正在刷新...</div>',
    "refreshSuccess":'<p class="refresh-tip">√ 刷新成功</p>'
}
```

###### loadMoreDOM

- `{Object}`
- `required:true`
- e.g
```javascript
loadMoreDOM:{
    "pull2load":'<p class="refresh-tip">↑ 上拉加载更多</p>',
    "loading":'<div id="infinite-loading" class="infinite-loading">正在加载...</div>',
    "loadSuccess":'<p class="refresh-tip">√ 加载成功</p>'
}
```

#### 事件(events)

###### load

- `slideload.on("load",callback(next,stop))`
- 当内容(列表)滚动到容器底部的时候触发
- `callback`的两个参数是slideload的重置方法，在加载更多数据并且渲染完DOM之后，必须调用，区别在于调用next()方法重置，在以后还会继续触发`load`事件，而调用stop()方法重置则会禁用`load`事件

###### refresh

- `slideload.on("refresh",callback(next))`
- 当内容(列表)向下拉动的距离大于`options.distance`时触发
- `callback`的参数next是slideload的重置方法，在刷新完成并且渲染完DOM之后必须调用