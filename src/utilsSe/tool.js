import Vue from 'vue'
import store from '@/store'
import { Message } from 'element-ui'

const tool = {
  baseURL: process.env.BASE_API
}

/* 配置 */
// tool.baseURL = 'http://192.168.1.19:3000/mini-api/'
tool.imageURL = 'http://192.168.1.19:8088'

/* 图片类型 */
tool.imgType = ['jpg', 'png', 'jpeg', 'gif']
/* 判断文件类型 */
tool.isImg = (type, isTurn = true) => {
  const typeCp = isTurn ? type.split('.').reverse()[0] : type
  if (tool.imgType.indexOf(typeCp) === -1) return false
  else return true
}
/* 上传 */
tool.upload = {
  img: () => `${tool.baseURL}common/file-upload`,
  template: (filePath) => tool.baseURL + filePath
}
/* 下载 */
tool.download = {
  img: (filePath) => tool.imageURL + filePath,
  template: (typeName) => `${tool.baseURL}/template/download?typeName=${typeName}`,
  export: (typeName, id) => `${tool.baseURL}/template/export?typeName=${typeName}&id=${id}`
}
/* 检查状态码 */
tool.checkStatus = (status, message, isMessage, isTip) => {
  (isTip && status === 200) && tool.messageSuccess(message || '操作成功');
  (isMessage && status !== 200) && tool.messageErr(message || '请求失败')
  if (status === -99999) return store.dispatch('FedLogOut')
}
/* 结束 */

/* 消息 */
tool.message = (msg, sec = 3) => {
  Message({
    message: msg,
    duration: sec * 1000
  })
}
/* 正确提示 */
tool.messageSuccess = (msg, sec = 3) => {
  Message.success({
    message: msg,
    duration: sec * 1000
  })
}
/* 错误提示 */
tool.messageErr = (msg, sec = 3) => {
  Message.error({
    message: msg,
    duration: sec * 1000
  })
}
/* 结束 */

/* dom操作 */
/* 404图片处理 */
tool.imgErr = () => {
  document.addEventListener('error', (e) => {
    const elem = e.target
    elem.tagName.toLowerCase() === 'img' && (elem.src = '/static/img/404.png')
  }, true)
}
/* 屏幕变化 */
tool.windowResize = (callback) => {
  window.addEventListener('resize', (e) => {
    callback(e)
  })
}
/* 获取dom */
tool.getElement = (dom, all = false) => {
  if (all) return document.querySelectorAll(dom)
  else return document.querySelector(dom)
}
/* 结束 */

/* 获取类 */
/* 时间兼容性转化 */
tool.replaceTime = (curDate) => {
  if (curDate.indexOf('T')) {
    let _cur = curDate.split('.')[0]
    _cur = _cur.replace('T', ' ')
    return _cur.replace(/-/g, '/')
  }
  return curDate.replace(/-/g, '/')
}
/* 获取时间戳 */
tool.getTimestamp = (curDate) => {
  typeof curDate === 'string' && (curDate = tool.replaceTime(curDate))
  return new Date(curDate).getTime()
}
/* 时间基础转化 */
tool.dateToOb = (curDate) => {
  const year = curDate.getFullYear()
  const month = (curDate.getMonth() + 1) > 9 ? `${curDate.getMonth() + 1}` : `0${curDate.getMonth() + 1}`
  const day = curDate.getDate() > 9 ? curDate.getDate() : `0${curDate.getDate()}`
  const hour = curDate.getHours() > 9 ? curDate.getHours() : `0${curDate.getHours()}`
  const min = curDate.getMinutes() > 9 ? curDate.getMinutes() : `0${curDate.getMinutes()}`
  const sec = curDate.getSeconds() > 9 ? curDate.getSeconds() : `0${curDate.getSeconds()}`
  return { year, month, day, hour, min, sec }
}
/* 截取任意时间 */
tool.getAnyDate = (curDate = new Date(), dayInterval = 0, isTime = false) => {
  typeof curDate === 'string' && (curDate = tool.replaceTime(curDate))
  curDate = new Date(curDate)
  curDate.setDate(curDate.getDate() + dayInterval)
  const curDateOb = tool.dateToOb(curDate)
  if (isTime) return `${curDateOb.year}-${curDateOb.month}-${curDateOb.day} ${curDateOb.hour}:${curDateOb.min}:${curDateOb.sec}`
  else return `${curDateOb.year}-${curDateOb.month}-${curDateOb.day}`
}
/* 获取剩余天数 */
tool.getDateRange = (end, start = new Date()) => {
  typeof end === 'string' && (end = tool.replaceTime(end))
  typeof start === 'string' && (start = tool.replaceTime(start))
  const data = new Date(end).getTime() - new Date(start).getTime()
  if (!data || data < 0 || isNaN(data)) return false
  const days = Math.floor(data / (24 * 3600 * 1000))
  const leave1 = data % (24 * 3600 * 1000) // 小时余数
  const hours = Math.floor(leave1 / (3600 * 1000)) > 9 ? Math.floor(leave1 / (3600 * 1000)) : `0${Math.floor(leave1 / (3600 * 1000))}`
  const leave2 = leave1 % (3600 * 1000) // 分钟余数
  const minutes = Math.floor(leave2 / (60 * 1000)) > 9 ? Math.floor(leave2 / (60 * 1000)) : `0${Math.floor(leave2 / (60 * 1000))}`
  // const leave3 = leave2 % (60 * 1000); // 秒余数
  // const seconds = Math.round(leave3 / 1000) > 9 ? Math.round(leave3 / 1000) : `0${Math.round(leave3 / 1000)}`
  return `${days}天${hours}:${minutes}`
}
/* 获取code码 */
tool.getQueryString = (key) => {
  const url = new RegExp(`(^|&)${key}=([^&]*)(&|$)`)
  const newUrl = window.location.search.substr(1).match(url)
  if (newUrl != null) return unescape(newUrl[2])
  else return false
}
/* 查询参数为复杂类型 */
tool.getQuery = (data, open = true) => {
  if (!data) return false
  if (open) return JSON.parse(decodeURIComponent(data))
  else return encodeURIComponent(JSON.stringify(data))
}
/* 获取换行字符串 */
tool.getEnterString = (str) => {
  if (!str) return
  return str.replace(/\n|\r|\r\n/g, '<br/>')
}
/* 结束 */

/* 数组对象操作 */
/* 复制 */
tool.ObCopy = (data) => { // 复制复杂类型
  return JSON.parse(JSON.stringify(data))
}
/* 复制1 */
tool.obCopy = (data) => { // 复制复杂类型
  return JSON.parse(JSON.stringify(data))
}
/* 合并对象成为数组 */
tool.obToArray = (obj) => {
  var arr = []
  Object.keys(obj).forEach((v) => {
    arr = arr.concat(obj[v])
  })
  return arr
}
/* 判断JSON类型 */
tool.isJson = (data) => {
  try {
    const obj = JSON.parse(data)
    if (typeof obj === 'object' && obj) return true
    else return false
  } catch (err) {
    return false
  }
}
/* 存储 */
tool.localSet = (key, data) => {
  typeof data !== 'object' && localStorage.setItem(key, data)
  typeof data === 'object' && localStorage.setItem(key, JSON.stringify(data))
}
/* 移除 */
tool.localRem = (key) => {
  localStorage.removeItem(key)
}
/* 获取 */
tool.localGet = (key) => {
  const data = localStorage.getItem(key)
  if (tool.isJson(data)) return JSON.parse(data)
  else return data
}
/* 清除 */
tool.localClear = () => {
  localStorage.clear()
}
/* 删除对象固有字段 */
tool.deleteParams = (form, ...arg) => {
  arg.forEach((v, i) => {
    delete form[v]
  })
}
/* 将请求中的复杂类型转为str */
tool.filterRes = (obj) => {
  Object.keys(obj).forEach((v) => {
    typeof obj[v] === 'object' && (obj[v] = JSON.stringify(obj[v]))
  })
  return obj
}
/* 复杂数组去重 */
tool.reduceOnlyArray = (arr, name) => {
  var hash = {}
  return arr.reduce((item, next) => {
    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next)
    return item
  }, [])
}
/* 结束 */

/* pc */
/* 全屏 */
tool.fullScreen = (callback) => {
  window.addEventListener('resize', () => {
    const isFull = (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width)
    callback(isFull)
  })
}
/* 结束 */

Vue.prototype.$tool = tool
export default tool
