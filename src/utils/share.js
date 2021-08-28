export function share({ title, content, shareImage}) {
  
  var current_url = window.location.href;
  
  //分享获取签名时间戳appid
  $.ajax({
    type: "GET",
    url: "http://hongqi.highset.cn/wechat/sign",
    async: false,
    dataType: "json",
    data: { url: current_url },
    success: function (data, textStatus) {
      console.log("data.appid>>>", data.appid);
      console.log("data.timestamp>>>", data.timestamp);
      console.log("data.noncestr>>>", data.noncestr);
      console.log("data.signature>>>", data.signature);
      if (textStatus == "success") {
        //success
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
          ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          console.log("+++++++++++++++++++++========>>");
          shareFunction()
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发>时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
      }
    },
  });

  // var title = "测试Title";
  // var content = "测试Content";
  // var shareImage = "http://hongqi.highset.cn/files/topic/share.png";

  function shareFunction() {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: content, // 分享描述
      link: current_url, // 分享链接
      imgUrl: shareImage, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      },
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: content, // 分享描述
      link: current_url, // 分享链接
      imgUrl: shareImage, // 分享图标
      type: "", // 分享类型,music、video或link，不填默认为link
      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log("分享成功========>>");
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log("分享成功========>>");
      },
    });
  }

  wx.error(function (res) {
    alert(res.errMsg);
  })
}

export function isWechat() {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}