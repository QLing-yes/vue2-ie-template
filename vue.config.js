const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 1. 强制转译所有依赖（IE11 无法解析 ES6+ 依赖）
  transpileDependencies: true,
  // 2. 禁用生产环境 sourcemap（IE11 解析 sourcemap 易崩溃）
  productionSourceMap: false,
  // 3. 配置公共路径（IE11 对相对路径解析有问题）
  publicPath: './',
  // 4. 优化输出文件名（避免 IE11 缓存问题）
  filenameHashing: true,
  // 5. 链式调整 Webpack 配置（针对 IE11）
  chainWebpack: config => {
    // 禁用 IE11 不支持的压缩插件（如 Terser 压缩后的 ES6+ 语法）
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions = {
        ecma: 5, // 强制压缩到 ES5
        compress: {
          drop_console: process.env.NODE_ENV === 'production', // 生产环境移除 console
          ie8: true // 兼容 IE8+（IE11 兜底）
        },
        output: {
          comments: false,
          ascii_only: true // 强制 ASCII 输出，避免 IE11 中文乱码
        }
      };
      return args;
    });

    // 修复 IE11 中 chunk 加载失败（动态 import 兼容）
    config.output.chunkFilename(process.env.NODE_ENV === 'production' 
      ? 'js/[name].[contenthash:8].js' 
      : 'js/[name].js');


  },
  // 6. devServer 兼容 IE11（开发环境）
  devServer: {
    client: {
      overlay: false // 禁用错误浮层（IE11 渲染异常）
    },
    headers: {
      'X-UA-Compatible': 'IE=edge' // 强制 IE 使用最新渲染模式
    }
  }
});