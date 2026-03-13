![alt text](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e32dfa9dc71844689016a8cb48ff04c0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgcWxpbmc=:q75.awebp?rk3s=f64ab15b&x-expires=1773889199&x-signature=i4f0BCftx%2F1ThazhLht5jVcqf4U%3D)

# Vue2-IE 兼容项目

基于 Vue 2 + Element UI 的 IE11 兼容前端项目

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 2.6.14 |
| 路由 | Vue Router 3.5.1 |
| UI | Element UI 2.15.14 |
| 垫片 | core-js、regenerator-runtime、whatwg-fetch |

## 快速开始

```bash
pnpm install
pnpm run serve
pnpm run build
```

## 兼容性实现

### Polyfill 加载顺序 (main.js)

```
1. whatwg-fetch          → fetch API 兼容
2. core-js/stable        → ES6+ 特性（主要 polyfill，覆盖 95%+）
3. regenerator-runtime   → async/await
4. ES_Polyfill           → 补充特性
```

### ES_Polyfill 支持列表（仅 core-js 未覆盖的 IE11 原生缺失特性）

| 类型 | 方法/特性 | 说明 |
|------|----------|------|
| Promise | withResolvers() | ES2024 新特性 |
| String | replaceAll() | ES2021 新特性 |
| Symbol | 完整实现 | IE11 不存在 |
| Set | 完整实现 | IE11 不存在 |
| Map | 完整实现 | IE11 不存在 |
| WeakSet | 完整实现 | IE11 不存在 |
| WeakMap | 完整实现 | IE11 不存在 |

> 注：core-js 3.x 已覆盖大部分 ES6+ 特性（Object.assign、Array.includes、String.startsWith 等），仅以上特性未被覆盖。

## 项目结构

```
src/
├── main.js              // 入口：polyfill 顺序加载
├── App.vue              // 根组件
├── router/              // 路由配置
└── utils/
    └── ES_Polyfill.js   // 补充兼容（87行）
```

## 补充 polyfill CDN
```
// ES6 语言特性
https://cdn.jsdelivr.net/npm/core-js-bundle@3.48.0/minified.js
// fetch API
https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.20/dist/fetch.umd.min.js
// ------- 或 ----------
// 按 User-Agent 智能返回 polyfill
https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=Promise,fetch,Object.assign,Array.prototype.find,Array.prototype.findIndex
```
