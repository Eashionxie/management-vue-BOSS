import request from '@/utilsSe/request'

export function coordinate2Address (params) {
  return request.get('/common/address-by-coordinate', { params })
}

export function getCitys () {
  return request.get('/common/file-citys')
}

export function getJobTypes () {
  return request.get('/job/get-job-types')
}
