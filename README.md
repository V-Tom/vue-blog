#t-tom blog

**本仓库已经废弃，请转至新完全重构的项目[React+Koa](https://github.com/V-Tom/blog)**

Vue版本的博客

[博客文章MD文件repo](https://github.com/V-Tom/blogArticle)

[React 版本](https://github.com/V-Tom/react-blog)

[React-native版本](https://github.com/V-Tom/ReactNative)

electron版本开发中

>后端：express,flask,mongodb native 写的restful API

#### set up
##### `npm install`

#### run base dev
##### `npm run base-dev`

#### run base build
##### `npm run base-build`

#### run dev dev
##### `npm run dev-dev`

#### run dev build
##### `npm run dev-build`

### 目录结构

```
.
├── README.md           
├── config                   // 公用配置文件
├── logs                     // 生产环境日志目录
├── mods                    // server helper
├── server                  // server 启动文件
├── src                      // 生产目录
     ├── build                      // webpack配置
        ├── webpack.config.dev.js        // 开发环境Webpack配置文件
        ├── webpack.config.js             // Webpack 配置文件
        ├── webpack-config.prod.js      // 生产环境Webpack 配置文件
     ├── dist                       // 打包文件目录
     ├──routes                    // 路由请求处理
     ├── controller              // db controller 封装
     ├── static                   // 静态文件目录
         ├── api                                 // API 请求
         ├── assets                            // css 和图片资源
         ├── components                    // 组件
         ├── utils                              // 公用的文件
         ├── style                             // css style
         ├── views                            // 主要view
         ├── vuex            		            // vuex相关文件, store,action
         ├── app.vue                         // app.vue
         ├── favicon.icon                   // 站点图标
         ├── index.js                         // 项目主入口
         ├── router.js                        // 项目 web route 管理
│   └── config.js              // api url, cookie domain等配置文件
│   └── index.html           // 主页html
│   └── index.js              // server 服务入口文件
├── .babelrc                 // babel配置
├── .eslintrc.json           // eslint配置
├── gulpfile.babel.js        // gulp配置, 使用gulp做为任务管理
├── process.json             // pm2配置文件
.
```

MIT
