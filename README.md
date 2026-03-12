# Vue2-IE 兼容项目

基于 Vue 2 + Element UI 的 IE11 兼容前端项目

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 2.6.14 |
| 路由 | Vue Router 3.5.1 |
| UI | Element UI 2.15.14（按需导入 + 全局注册） |
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
4. ES_Polyfill           → 补充特性（87行）
```

### Element UI 使用方式

**方式一：全局注册（推荐常用组件）**
```js
// main.js 已自动全局注册常用组件
<el-button>按钮</el-button>
<el-input>输入框</el-input>
<el-table :data="tableData">...</el-table>
```

**方式二：按需导入（不常用的组件）**
```js
import { DatePicker } from 'element-ui';
export default {
  components: { DatePicker }
}
```

> babel-plugin-component 会自动处理按需导入的样式

## 项目结构

```
src/
├── main.js                    // 入口
├── App.vue                    // 根组件
├── router/                    // 路由配置
├── plugins/
│   └── element.js             // Element UI 集中注册
└── utils/
    └── ES_Polyfill.js         // 补充兼容（87行）
```
