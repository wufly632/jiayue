/**
* 将时间格式化到年/月/日
*/
export function formatToHMS(date) {
    if (typeof date !== 'object') {
      date = new Date(date);
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);
    return year + '/' + month + '/' + day;
}
/**
 * 当前时间到天
 */
export function currentDateToDay(opts) {
  let curyear = new Date();

  if (opts && opts.date) {
    curyear = new Date(opts.date);
  }

  if (opts && opts.day) {
    curyear.setDate(curyear.getDate() + opts.day);
  }

  let year = curyear.getFullYear();
  let month = curyear.getMonth() + 1;
  let day = curyear.getDate();

  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return year + '/' + month + '/' + day;
}

/**
 * 倒计时
 * @params leftTime {String} 时间戳到毫秒
 */
export function countDown(leftTime) {
  function addZero(v) {
    if ((v + '').length <= 1) {
      return '0' + v
    } else {
      return v
    }
  }

  if (leftTime >= 0) {
    let d = Math.floor(leftTime / 60 / 60 / 24)
    let h = Math.floor((leftTime / 60 / 60) % 24)
    let m = Math.floor((leftTime / 60) % 60)
    let s = Math.floor((leftTime) % 60)

    leftTime = leftTime - 1
    // 递归每秒调用countDown方法，显示动态时间效果
    setTimeout(() => {
      countDown(leftTime)
      // console.log(leftTime, 123)
    }, 1000)
    
    d = addZero(d)
    h = addZero(h)
    m = addZero(m)
    s = addZero(s)

    if (d === '00') {
      return `${h}:${m}:${s}`
    } else {
      return `${d}:${h}:${m}:${s}`
    }
  } else {
    return 0
  }
}