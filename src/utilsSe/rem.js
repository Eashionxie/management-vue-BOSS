const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
const initView = () => {
  const clintWidth = document.body.clientWidth
  document.querySelector('html').style.fontSize = `${clintWidth / 19.2}px`
}
window.addEventListener(resizeEvt, initView)
document.addEventListener('DOMContentLoaded', initView)
