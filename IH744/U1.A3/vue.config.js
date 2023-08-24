const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : '/',
  transpileDependencies: true
})
