/**
 * 请求地址API
 */
const methodMap = {
  /** 注册 **/
  Register: {url: '/api/user/register', method: 'post'},
  /** 登录 **/
  Login: {url: '/api/user/login', method: 'post'},

  /** 风格 **/
  ProductStyle: {url: '/api/product/style', method: 'get'},
  /** 商品类别 **/
  ProductTypes: {url: '/api/product/types', method: 'get'},
  /** 商品列表 **/
  ProductList: {url: '/api/product/list', method: 'get'},
  /** 商品详情 **/
  ProductDetail: {url: '/api/product/detail', method: 'get'},

  /** 收藏 **/
  Fave: {url: '/api/fave/save', method: 'post'},
  /** 收藏列表 **/
  FaveList: {url: '/api/fave/list', method: 'get'},

  /** 案例 **/
  CaseList: {url: '/api/case/list', method: 'get'},
  /** 案例详情 **/
  CaseDetail: {url: '/api/case/detail', method: 'get'},

  /** 关于我们 **/
  AboutInfo: {url: '/api/about/info', method: 'get'},
  /** 联系我们 **/
  ContactInfo: {url: '/api/contact/info', method: 'get'},

  /** 地址信息 **/
  AddressInfo: {url: '/api/address/info', method: 'get'},

  /** 微信分享 **/
  WechatShareUrl: {url: '/api/backend/wechat/shareUrl', method: 'get'},
  
  
}

export default methodMap
