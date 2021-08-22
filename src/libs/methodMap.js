/**
 * 请求地址API
 */
const methodMap = {
  /** 注册 **/
  Register: {url: '/api/user/register', method: 'post'},
  /** 登录 **/
  Login: {url: '/api/user/login', method: 'post'},
  /** 登录 - 用户信息 **/
  UserInfo: {url: '/api/user/info', method: 'get'},
  /** 重设密码 **/
  UserReset: {url: '/api/user/reset', method: 'post'},
  /** 验证码 **/
  UserSendCode: {url: '/api/user/sendCode', method: 'post'},
  /** 用户 - 修改信息 **/
  UserEdit: {url: '/api/user/edit', method: 'post'},
  

  /** 首页 **/
  Home: {url: '/api/home/show', method: 'get'},
  /** 搜索 **/
  ProductSearch: {url: '/api/product/search', method: 'post'},
  /** 分类 **/
  CategoryList: {url: '/api/category/list', method: 'get'},


  /** 收藏 - 列表 **/
  UserFave: {url: '/api/user/fave', method: 'get'},
  /** 收藏 - 收藏  / 取消收藏 **/
  ProductFave: {url: '/api/product/fave', method: 'post'},
  

  /** 商品详情 **/
  ProductDetail: {url: '/api/product/detail', method: 'get'},
  

  /** 购物车 - 列表 **/
  CartIndex: {url: '/api/cart/index', method: 'get'},
  /** 购物车 - 添加 **/
  CartAdd: {url: '/api/cart/add', method: 'post'},
  /** 购物车 - 更新 **/
  CartUpdate: {url: '/api/cart/update', method: 'post'},
  /** 购物车 - 删除 **/
  CartDelete: {url: '/api/cart/delete', method: 'post'},
  /** 购物车 - 数量 **/
  CartNum: {url: '/api/cart/num', method: 'get'},
  /** 购物车 - 更换 **/
  CartChange: {url: '/api/cart/change', method: 'post'},
  /** 购物车 - 结算 **/
  CartCheckout: {url: '/api/cart/checkout', method: 'post'},
  
  
  /** 订单 - 获取地址列表 **/   
  OrderAddressList: {url: '/api/address/list', method: 'get'},
  /** 订单 - 设置默认地址 **/   
  OrderAddressSetDefault: {url: '/api/address/setDefault', method: 'post'},
  /** 订单 - 添加地址 **/
  OrderAddressAdd: {url: '/api/address/add', method: 'post'},
  /** 订单 - 更新地址 **/
  OrderAddressUpdate: {url: '/api/address/update', method: 'post'},
  
  
  /** 订单 - 删除地址 **/
  OrderAddressDelete: {url: '/api/address/delete', method: 'post'},
  /** 订单 - 获取银行列表 **/
  OrderBank: {url: '/api/order/bank', method: 'get'},
  /** 订单 - 下单 **/
  OrderPlaceOrder: {url: '/api/order/placeOrder', method: 'post'},
  /** 订单 - 支付 **/
  OrderPay: {url: '/api/order/pay', method: 'post'},
  /** 订单 - 支付结果 **/
  OrderPayResult: {url: '/api/order/payResult', method: 'post'},
  /** 订单 - 取消支付 **/
  OrderCancelPay: {url: '/api/order/cancelPay', method: 'post'},
  /** 订单 - 支付结果提交 **/
  OrderSubmit: {url: '/api/order/submit', method: 'post'},
  /** 订单 - 简单详情 **/
  OrderSimpleDetail: {url: '/api/order/simpleDetail', method: 'get'},
  

  /** 订单 - 修改订单地址 **/
  OrderUpdateAddress: {url: '/api/order/updateAddress', method: 'post'},
  /** 订单 - 订单列表 **/
  OrderList: {url: '/api/order/list', method: 'get'},
  /** 订单 - 取消订单 **/
  OrderCancel: {url: '/api/order/cancel', method: 'post'},
  /** 订单 - 删除订单 **/
  OrderDelete: {url: '/api/order/delete', method: 'post'},

  /** 订单 - 订单详情 **/
  OrderDetail: {url: '/api/order/detail', method: 'get'},
  /** 订单 - 物流 **/
  OrderTrack: {url: '/api/order/track', method: 'get'},

  /** 优惠券 - 列表 **/
  CouponList: {url: '/api/coupon/list', method: 'get'},


  /** 地址 **/
  Area: {url: '/api/area', method: 'get'},
  
}

export default methodMap
