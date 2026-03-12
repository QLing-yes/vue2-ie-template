/**
 * Vue 2 IE 兼容项目入口文件
 * 优先加载各种 polyfill 以确保 IE 浏览器兼容性
 */

// 1. 优先加载 fetch 垫片，确保 fetch API 在 IE 中可用
import 'whatwg-fetch';

// 2. 加载 core-js，提供 ES6+ 特性支持
import 'core-js/stable';

// 3. 加载 regenerator-runtime，支持 async/await 语法
import 'regenerator-runtime/runtime';

// 4. 加载自定义 Polyfill，进一步增强 IE 兼容性
import './utils/ES_Polyfill';

// 5. 加载 Vue 核心库
import Vue from 'vue';

// 6. 加载 Element UI 组件库及其样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 7. 加载根组件和路由配置
import App from './App.vue';
import router from './router';

// 关闭生产环境提示
Vue.config.productionTip = false;

// 使用 Element UI 组件库
Vue.use(ElementUI);

/**
 * 初始化 Vue 实例
 * @param {Object} options - Vue 实例配置选项
 * @param {Object} options.router - 路由配置
 * @param {Function} options.render - 渲染函数
 */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
