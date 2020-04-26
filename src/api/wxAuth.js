import request from '@/utilsSe/request'

const appFlag = '04'

export function getWxConfig() { // 开放能力
  const url = location.href.split('#')[0]
  const params = { appFlag, url }
  return request.get(`/api-wx-qyh/wx-user/info-config`, { params })
}

export function getWxCodeUrl() { // 获取code
  const params = { appFlag }
  return request.get(`/api-wx-qyh/wx-user/code-url`, { params })
}

export function getWxAuth(params) { // 模拟登陆
  params.appFlag = appFlag
  return request.get(`/api-wx-qyh/wx-user/auth`, { params })
}
