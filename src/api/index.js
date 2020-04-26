import request from '@/utilsSe/request'

export function addCompany(data) {
  return request.post('/company/add-company', data)
}

export function getComInfo(params) {
  return request.get('/company/get-companyInfo', { params })
}

export function getWelfares() {
  return request.get('/company/get-welfares')
}

export function addAlbumImg(data) {
  return request.post('/company/add-album', data)
}

export function delAlbumImg(data) {
  return request.post('/company/delete-album', data)
}

export function getJobDetail(params) {
  return request.get('/job/get-jobInfo', { params })
}

export function addJob(data) {
  return request.post('/job/add-job', data)
}

export function delJob(params) {
  return request.get('/job/del-job', { params })
}

export function getJobList(params) {
  return request.get('/job/get-job-list', { params })
}

export function getDeliveryList(params) {
  return request.get('/delivery/get-delivery-list', { params })
}

export function changeStatus(params) {
  return request.get('/delivery/change-delivery-status', { params })
}

/* 用户管理 */
export function getUserList(params) {
  return request.get('/user/list', params)
}

export function getUserAdd(data) {
  return request.post('/user/add', data, { isTip: true })
}

export function getUserUpdate(data) {
  return request.post('/user/update', data, { isTip: true })
}
