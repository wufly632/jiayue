/**
 * 检查是否支持.webp 格式图片
 *
 * 支持 webp CDN   ?x-oss-process=image/format,webp
 * 不支持    CDN   ?x-oss-process=image/quality,Q_80
 */

;
(function() {
  var timeout = null;
  var urlarr = [];
  var flag = false;
  if (localStorage && !localStorage.iswebp) {
    var img = new Image();
    img.onload = function() {
      if (img.width === 1) {
        localStorage.iswebp = true;
      }
    };
    img.onerror = function() {
      flag = true;
      localStorage.iswebp = '';
    };
    img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  }
  function getOssImg(url, width) {
    clearTimeout(timeout);

    url = String(url);
    if (!url) {
      return url;
    }
    if (!flag && localStorage && (typeof localStorage.iswebp === 'undefined')) {
      timeout = setTimeout(function () {
        getOssImg(url);
      },100);
    } else {
      // gif 的图片不做处理
      urlarr = url.split('.');
      if (urlarr.length > 0 && urlarr[urlarr.length - 1] === 'gif') {
        url += '';
        return url;
      }
      if (url.indexOf('x-oss-process=image') === -1) { // 不存在这种后缀
        if (localStorage && localStorage.iswebp) {
          if (!width) {
            url = url + '?x-oss-process=image/format,webp'
          } else {
            url = url + '?x-oss-process=image/resize,w_' + width + ',image/format,webp'
          }
        } else {
          if (!width) {
            url = url + '?x-oss-process=image/quality,Q_80'
          } else {
            url = url + '?x-oss-process=image/resize,w_' + width
          }
        }
        
      }
      return url;
    }
  }
  String.prototype.ossimg = function() { // 直接转webp
    return getOssImg(this)
  }

  String.prototype.formatOssimg = function(width) { // 切割width && 转webp
    return getOssImg(this, width)
  }
})();


