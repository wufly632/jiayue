/**
 * @note   setOnline 线上接口 配置
 * @param  name  本地接口名
 *         type  接口类型
 *         url   线上接口地址
 */
var fs = require('fs')
var setOnline = [
  // 注册
  {
    name: 'userRegister',
    type: 'post',
    url: '/api/user/register'
  },

  // 登录 
  {
    name: 'userLogin',
    type: 'post',
    url: '/api/user/login'
  },

  // 风格
  {
    name: 'productStyle',
    type: 'get',
    url: '/api/product/style',
  },

  // 商品类别
  {
    name: 'productTypes',
    type: 'get',
    url: '/api/product/types'
  },
  
  // 商品列表
  {
    name: 'productList',
    type: 'get',
    url: '/api/product/list',
  },

  // 商品详情
  {
    name: 'productDetail',
    type: 'get',
    url: '/api/product/detail/100'
  },
  
  // 收藏
  {
    name: 'success',
    type: 'post',
    url: '/api/fave',
  },

  // 收藏列表
  {
    name: 'faveList',
    type: 'get',
    url: '/api/fave/list',
  },

  // 案例
  {
    name: 'caseList',
    type: 'get',
    url: '/api/case/list',
  },

  // 案例详情
  {
    name: 'caseDetail',
    type: 'get',
    url: '/api/case/detail'
  },

  // 商品详情
  {
    name: 'productDetail',
    type: 'get',
    url: '/api/product/detail'
  }, 
  // 关于我们
  {
    name: 'aboutInfo',
    type: 'get',
    url: '/api/about/info'
  }, 
  // 联系我们
  {
    name: 'contactInfo',
    type: 'get',
    url: '/api/contact/info'
  },

  {
    name: 'addressInfo',
    type: 'get',
    url: '/api/address/info'
  },


]

// 输出配置项
exports.setOnline = setOnline

// 遍历输出json数据
for (var i = 0, len = setOnline.length; i < len; i++) {
  // (function() {
  //   var name = setOnline[i].name

  //   exports[name] = function(req, res) {
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     fs.readFile('./mock/' + name + '.json', function(err, data) {
  //       if (err) throw err

  //       res.json(JSON.parse(data))
  //     })
  //   }
  // })(i)

  (function() {
    var name = setOnline[i].name

    exports[name] = function(req, res) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      fs.readFile('./mock/' + name + '.json', function(err, data) {
        if (err) throw err
        let randomTime = Math.floor(Math.random() * 100) * 10
        setTimeout(function() {
          res.json(JSON.parse(data))
        }, randomTime)
      })
    }
  })(i)
}

