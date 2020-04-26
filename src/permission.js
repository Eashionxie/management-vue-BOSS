import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // nprogress 进度条
import 'nprogress/nprogress.css' // nprogress 进度条样式
import tool from '@/utilsSe/tool'

const whiteList = ['/login', '/404'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (tool.localGet('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.userInfo) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          console.log(store.getters.userInfo.nickName)
          if (!store.getters.userInfo.nickName) return next({ path: `/baseInfo?redirect=${to.path}` })
          router.addRoutes(res)
          next({ ...to, replace: true })
          // next()
        }).catch(err => {
          console.log(err)
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
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
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to, from, next) => {
  nprogress.done() // 结束nprogress
  if (to.path === '/') router.push('/') // 404问题 self
})
