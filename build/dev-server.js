var config = require('../config');
if (!process.env.NODE_ENV) { // 没有NODE_ENV这个环境变量就设置下
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.conf');


// 默认端口或者设置个端口
var port = process.env.PORT || config.dev.port;
// 自动打开浏览器？
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend 定义HTTP代理到你的自定义API的后端
// https://github.com/chimurai/http-proxy-middleware 这个是HTTP代理中间件

var app = express(); // express
// webpack
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});
// force page reload when html-webpack-plugin template changes
// 当html-webpack-plugin模版改变时重新加载页面
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb();
  })
});

// proxy api requests代理API请求
var proxyTable = config.dev.proxyTable || {};
var proxyMiddleware = require('http-proxy-middleware');

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options))
});
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

// handle fallback for HTML5 history API    HTML5 history API处理回退
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output 服务webpack绑定输出
app.use(devMiddleware);

// enable hot-reload and state-preserving 不能热更新且状态保护
// compilation error display 显示编译错误
app.use(hotMiddleware);

// serve pure static assets 纯静态资源
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var utils = require('./utils');
// var uri = `http://${utils.getIPAdress()}:${port}/home`;
var uri = `http://localhost:${port}`;

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

// ----- 路由 && mock - 动态查找所有index.html页面 ----- //
// MOCK 数据
var mock = require('../mock/mock.js');
var setOnline = mock.setOnline;

setOnline.forEach(function(m) {
  app[m.type](m.url, mock[m.name]);
});


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it 当环境变量NODE_ENV是testing时，不需要打开它
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
