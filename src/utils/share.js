export function share({ that, title, content, shareImage}) {
  that.request('WechatShareUrl', {
    url: location.href
  }).then(res => {
    const { code, data, msg } = res
    console.log(res)
    
    if (code === 20000) {
      const { config } = data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: config.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function(res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              console.log("check res:",res)
          }
      });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发>时才调用的接口，则可以直接调用，不需要放在ready函数中。
        // 分享到朋友圈
        wx.updateAppMessageShareData({
        // wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: content, // 分享描述
          link: location.href, // 分享链接
          imgUrl: shareImage, // 分享图标
          complete: function(res) {
            console.log('updateAppMessageShareData complete')
          },
          success: function () {
            // 用户点击了分享后执行的回调函数
            alert("分享成功2");//不要用alert，不然错误无法wx.error无法执行
            console.log("分享成功2");
          },
          cancel: function () {
              console.log("分享取消2");
          }
        },function() {
          console.log(145221)
        })
        // // 分享给朋友
        // wx.updateTimelineShareData({
        // // wx.onMenuShareTimeline({
        //   title: title, // 分享标题
        //   desc: content, // 分享描述
        //   link: location.href, // 分享链接
        //   imgUrl: shareImage, // 分享图标
        // })
      })
    } else {
      console.log('出错了！？' + msg)
    }
  })

  wx.error(function (res) {
    console.log('打印 error:')
    console.log(res)
    alert(res.errMsg)
  })
}

export function isWechat() {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}