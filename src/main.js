// main.js 调整顺序
import 'whatwg-fetch'; // 优先加载 fetch 垫片
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './utils/ES_Polyfill' // 加载自定义 Polyfill
import cssVars from 'css-vars-ponyfill'

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI);

// 优化 CSS 变量垫片配置（针对 IE11 增强）
cssVars({
  watch: true,
  onlyLegacy: true,
  // IE11 不支持 CSS 变量，强制转换所有变量
  forcePolyfill: true,
  // 修复 IE11 中伪元素/媒体查询的变量解析
  include: 'link, style',
  // 自定义属性前缀（如需）
  variables: {},
  // 回调：处理转换后的样式
  onComplete(cssText, styleNode, cssVariables) {
    if (process.env.NODE_ENV === 'development') {
      console.log('CSS 变量转换完成：', cssVariables);
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')