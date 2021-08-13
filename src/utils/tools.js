//获取远程字体资源或样式
export function getFont (url) {
  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = url
  document.head.appendChild(style)
}

//nps触发条件--滚动
export function triggerNps_Scroll ( callback, ratio = 0.5 ) {
  let scrollElement = document.scrollingElement || document.documentElement || document.body
  let canSrollHeight = scrollElement.scrollHeight - window.innerHeight
  const triggerFn = () => {
    if ( canSrollHeight <= 0 || (scrollElement.scrollTop / canSrollHeight  >= ratio)) {
      callback () 
      window.removeEventListener('scroll', triggerFn)
    }
  }

  window.addEventListener('scroll', triggerFn)
}