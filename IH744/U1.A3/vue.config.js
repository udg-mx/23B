const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.APP_BASE_URL ? process.env.APP_BASE_URL : '/',
  transpileDependencies: true
})
