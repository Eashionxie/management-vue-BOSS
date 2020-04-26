import Vue from 'vue'
import tool from '@/utilsSe/tool'

Vue.filter('formatDate', (curDate, isTime = false) => {
  if (!curDate) return '暂无'
  return tool.getAnyDate(curDate, 0, isTime)
})

Vue.filter('titlefilter', (val, length) => {
  if (!val) return '暂无'
  if (val.length >= length) return val.substring(0, length) + '...'
  else return val
})

Vue.filter('noAny', (val) => {
  if (!val) return '暂无'
  else return val
})

Vue.filter('fileType', (val) => {
  if (!val) return '暂无'
  else return val.split('.').reverse()[0]
})

Vue.filter('percent', (val) => {
  if (!val) return '暂无'
  else return `${(val * 100).toFixed(2)}%`
})
