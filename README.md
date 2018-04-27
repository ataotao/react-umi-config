## 框架组成
- `umi` [工具 + 路由]
- `dva` [数据 + 状态管理redux] (dva底层引入了redux-sagas做异步流程控制)
- `antd` (或mobile)[UI视图]
- UI文档
    - pc[https://ant.design/index-cn]
    - mobile[https://mobile.ant.design/index-cn]
    - UI风格可参考 antd pro [https://preview.pro.ant.design](没有采用此框架，使用umi更灵活)

## 结构

├── mock                     # 本地模拟数据
├── public                   # 静态资源
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── common               # 应用公用配置，如导航信息
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # dva model
│   ├── routes               # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── g2.js                # 可视化图形配置
│   ├── theme.js             # 主题配置
│   ├── index.ejs            # HTML 入口模板
│   ├── index.js             # 应用入口
│   ├── index.less           # 全局样式
│   └── router.js            # 路由入口
├── tests                    # 测试工具
└── package.json

## 排除pages下的文件生成为路由
```
//.umirc.js下配置
plugins: [
    ['umi-plugin-routes', {
        exclude: [/pages\/models/, /pages\services/, /pages\components/]
    }]
]
```

-------------------------------------------------------------------------------------------

## 文件说明
- /pages/ 路由路径根据pages下的文件夹（文件名）自动定义，文件夹下的page.js默认为根文件
- /layouts/index.js 入口文件
- /public/ 可放置静态资源文件 (如/public/static/img/nopic.png，页面可直接引用<img src="static/img/nopic.png" alt="" />)
- /global.css(全局样式定义，build不会生成唯一的hash参数)
- /utils/request.js： 处理http请求
- 目录规范 
    - page/.../services/ 数据接口服务
    - page/.../model/ 数据模型
    - page/.../components/ 页面模板

## 配置
### 代理配置：处理dev环境跨越问题
```
    // .webpackrc.js
    proxy: {
        '/api': {
            target: 'http://jsonplaceholder.typicode.com/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    }
```

### 配置antd主题 theme
- .webpackrc（JSON 格式）或 .webpackrc.js（ES 6 语法）中配置
```
"theme": {
  "@primary-color": "#1DA57A"
}
// 或者，
"theme": "./theme-config.js"
```

### 别名配置
import path from 'path';
- .webpackrc（JSON 格式）或 .webpackrc.js（ES 6 语法）中配置
```
alias: {
    '@': path.resolve(__dirname, './src/'),
    pages: path.resolve(__dirname, './src/pages/'),
    utils: path.resolve(__dirname, './src/utils/')
}
```


### 环境变量
- .webpackrc（JSON 格式）或 .webpackrc.js（ES 6 语法）中配置
```
"define": {
  "process.env.TEST": 1,
  "USE_COMMA": 2,
}
```

-------------------------------------------------------------------------------------------

## 使用说明

### 路由
#### 声明式 基于 umi/link。
```
    import Link from 'umi/link';
    export default () => (
        <Link to="/list">Go to list page</Link>
    );
```

#### 命令式 基于 umi/router。
```
    import router from 'umi/router';
    function goToListPage() {
        // 普通跳转，不带参数
        router.push('/list');

        // 带参数
        router.push('/list?a=b');

        router.push({
            pathname: '/list',
            query: {
                a: 'b',
            },
        });
    }

    // 替换当前页面，参数和 router.push() 相同。
    router.replace(path)
    // 往前或往后跳指定页数。
    router.go(-1)
    // 后退一页。
    router.goBack()


```
####  重定向 umi/redirect
```
    import Redirect from 'umi/redirect';
    <Redirect to="/login" />
```

#### 全局

#### 按需加载模块
- 页面路由模块自动异步加载
```
    // 内部模块按需加载方式 
    import('g2').then(() => {
        // do something with g2
    });
```

-------------------------------------------------------------------------------------------

## 安装依赖第三方包
- react-helmet或者react-document-title设置title以及head内容插件

## 部署

- 静态化(如果不做服务端渲染，服务端的 html fallback)可以这样配置，build时能根据路由生成html文件
```
    // .umirc.js 里配置：
    export default {
    exportStatic: {},
    }
```

## 环境变量设置
- package.json
```
set PORT=3000&&set BROWSER=none&&umi dev
```

## 404页面
- 约定 pages 目录下的 404.js 为 404 页面，需要返回 React 组件。

##
- withRouter说明， react-router 提供了一个withRouter组件 
- withRouter可以包装任何自定义组件，将react-router 的 history,location,match 三个对象传入。 
- 无需一级级传递react-router 的属性，当需要用的router 属性的时候，将组件包一层withRouter，就可以拿到需要的路由信息
- 如果使用了react-router-redux,则可以直接从state 中的router属性中获取location。不需要再使用withRouter 获取路由信息了

```

export default connect(({router}) => {
    return {pathname: router.location.pathname}
})(MyControl)

react-router-redux配置

const store = createStore(
    combineReducers({
        ...reducer,
        router: routerReducer
    }),
    applyMiddleware(routeMiddleware));
```