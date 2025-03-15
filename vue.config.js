const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '/api/toutiao': {
        target: 'http://v.juhe.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api/toutiao': ''
        }
      },
      '/api/weather': {
        target: 'http://apis.juhe.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api/weather': ''
        }
      }
    }
  }
})
