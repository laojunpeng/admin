export function timeFormat(date, excludeTime) {
  let _date = new Date(date)
  let year = _date.getFullYear(),
    month = format(_date.getMonth() + 1), //月份是从0开始的
    day = format(_date.getDate()),
    hour = format(_date.getHours()),
    min = format(_date.getMinutes()),
    sec = format(_date.getSeconds())
  if (excludeTime) {
    return year + '-' + month + '-' + day
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
}

export function durationFormat(result) {
  let h = format(Math.floor(result / 3600))
  let m = format(Math.floor((result / 60) % 60))
  let s = format(Math.floor(result % 60))
  return h + ':' + m + ':' + s
}

function format(e) {
  return ('0' + e).substr(-2, 2)
}

export function sizeFormat(val) {
  return (val / 1024).toFixed(2) + 'MB'
}
