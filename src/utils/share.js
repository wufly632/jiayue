export function share({ that, title, content, shareImage}) {
  that.request('WechatShareUrl', {
    url: window.location.href
  }).then(res => {
    const { code, data } = res
    if (code === 20000 && data) {
      const { config } = data
      console.log('success：')
      console.log(config.appId)

      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

      wx.ready(function () {
        shareFunction()
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发>时才调用的接口，则可以直接调用，不需要放在ready函数中。
      })
    }
  }, err => {
    console.log('err：')
    console.log(err)
    this.$Toast(err)
  })

  function shareFunction() {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: content, // 分享描述
      link: window.location.href, // 分享链接
      imgUrl: shareImage, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      },
    });
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: content, // 分享描述
      link: window.location.href, // 分享链接
      imgUrl: shareImage, // 分享图标
      type: "", // 分享类型,music、video或link，不填默认为link
      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        // console.log("分享成功========>>")
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // console.log("分享成功========>>");
      },
    });
  }

  wx.error(function (res) {
    alert(res.errMsg);
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