import axios from 'axios'
import tool from '@/utilsSe/tool'
import qs from 'qs'
import { Loading } from 'element-ui'
import { getToken } from '@/utils/auth'

var loadingInstance, isMessage, isTip
const request = axios.create({
  baseURL: `${tool.baseURL}`,
  timeout: 20000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: false,
  qs: true,
  /* 自定义 */
  isLoading: true,
  isMessage: true,
  isTip: false
})

/* request拦截器 */
request.interceptors.request.use(
  config => {
    config.isLoading && (loadingInstance = Loading.service({ text: '正在加载中', background: 'rgba(0, 0, 0, 0.3)' }))
    isMessage = config.isMessage
    isTip = config.isTip
    getToken() && (config.headers['token'] = getToken());
    (config.data && config.qs) && (config.data = tool.filterRes(config.data))
    config.qs && (config.data = qs.stringify(config.data, { indices: false }))
    return config
  },
  err => {
    loadingInstance && loadingInstance.close()
    isMessage && tool.messageErr('网络状态差')
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  res => {
    loadingInstance && loadingInstance.close()
    tool.checkStatus(res.data.status, res.data.message, isMessage, isTip) // 状态码
    if (res.data.status === 0) return res.data // 错误判断
    else return Promise.reject(res)
  },
  err => {
    loadingInstance && loadingInstance.close()
    isMessage && tool.messageErr('网络状态差')
    return Promise.reject(err)
  }
)

export default request
