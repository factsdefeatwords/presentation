//获取远程字体资源或样式
export function getFont (url) {
  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = url
  document.head.appendChild(style)
}

//判断是否移动端
export function isMobile () {
  return window.innerWidth < 992
}

//设置nps有效时长 单位（天）
export function setNpsDuration ( days = 7 ) {
  localStorage.setItem('ws_nps', JSON.stringify({
    date: new Date(),
    duration: days
  }))
}

//获取nps设置，返回Boolean
export function getNpsDuration () {
  let n = localStorage.getItem('ws_nps')

  if (!n) return {
    expired: true,
    new: true
  }

  n = JSON.parse(n)
  let time_diff = new Date() - new Date(n.date)

  time_diff = Math.floor(time_diff / (24 * 60 * 60 * 1000))

  return {
    expired: !n ? true : time_diff >= n.duration ? true : false,
    new: n ? false : true
  }
}

//nps触发条件--滚动
export function triggerNps_Scroll ( callback, ratio = 0.5 ) {
  let scrollElement = document.scrollingElement || document.documentElement || document.body

  const triggerFn = () => {
    let canSrollHeight = scrollElement.scrollHeight - window.innerHeight

    if ( canSrollHeight <= 0 || (scrollElement.scrollTop / canSrollHeight  >= ratio)) {
      callback () 
      window.removeEventListener('scroll', triggerFn)
    }
  }

  if (scrollElement.scrollHeight - window.innerHeight <= 0) {
    return callback()
  }

  window.addEventListener('scroll', triggerFn, { passive: true })
}