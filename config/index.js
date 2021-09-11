// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    // assetsPublicPath: process.env.NODE_BUILD === 'dev' ?  './' : './',
    assetsPublicPath: process.env.NODE_BUILD === 'dev' ?  '//static.pdever.cn/' : '//static.jiayue.store/',
    productionSourceMap: false, // 设为true生成map可以作调试
    // productionGzip: false,
    // productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3666,
    autoOpenBrowser: false, // 自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
   
    // proxyTable: {
    //   '/api': {
    //     target: 'http://apitest.pdever.cn',
    //     changeOrigin: true, // 是否跨域
    //     secure: false,
    //   },
    // },
    cssSourceMap: false,
  }
};

