# Vue 2.x IE11 兼容项目

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 核心依赖

| 依赖 | 版本 | 说明 |
|------|------|------|
| vue | 2.6.14 | Vue.js 框架 |
| vue-router | 3.5.1 | Vue 路由管理 |
| core-js | 3.48.0 | JavaScript 标准库 polyfill |
| regenerator-runtime | 0.14.1 | async/await polyfill |
| whatwg-fetch | 3.6.20 | Fetch API polyfill |
| css-vars-ponyfill | 2.4.9 | CSS 变量 polyfill |

## IE11 兼容性说明

本项目已针对 IE11 进行兼容处理，各依赖解决的问题：

| 依赖 | 解决的问题 |
|------|------------|
| core-js | IE11 不支持 ES6+ 新特性（如 Promise、Array.from、Object.assign、Symbol 等），提供标准库 polyfill |
| regenerator-runtime | IE11 不支持 async/await 语法，转换为生成器函数实现 |
| whatwg-fetch | IE11 不支持 Fetch API，提供 XMLHttpRequest 封装的标准 fetch 接口 |
| css-vars-ponyfill | IE11 不支持 CSS 自定义属性（:root { --color: red }），将 CSS 变量转换为静态值 |

## 使用建议

- **Promise**：直接使用，`core-js` 已自动注入
- **async/await**：直接使用，`regenerator-runtime` 已转换
- **fetch**：直接使用 `fetch()`，无需额外处理
- **CSS 变量**：正常书写，插件会自动处理兼容
