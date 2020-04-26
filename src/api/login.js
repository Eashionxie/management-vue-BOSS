import request from '@/utilsSe/request'

export function getAuthCode(params) {
  return request.get('/common/auth-code', {params})
}

export function login(data) {
  return request.post('/common/login', data)
}

export function signUp(data) {
  return request.post('/common/sign-up', data)
}

export function logout(params) {
  return request.get('/user/loginOut', { params })
}

export function getInfo(params) {
  return request.get('/user/get-userInfo', { params })
}

export function getUserRegister(data) {
  return request.post('/user/register', data)
}

export function userUpdate(data) {
  return request.post('/user/post-user', data)
}