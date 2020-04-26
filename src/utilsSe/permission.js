import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // nprogress 进度条
import 'nprogress/nprogress.css' // nprogress 进度条样式
import tool from '@/utilsSe/tool'

const whiteList = ['/author', '/404'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (tool.localGet('token')) {
    if (to.path === '/author') {
      next({ path: '/' })
    } else {
      if (!store.getters.userInfo) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch(err => {
          console.log(err)
          store.dispatch('FedLogOut').then(() => {
            next(`/author?redirect=${to.path}`)
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/author?redirect=${to.path}`)
    }
  }
})

router.afterEach((to, from, next) => {
  nprogress.done() // 结束nprogress
  if (to.path === '/') router.push('/') // 404问题 self
})
