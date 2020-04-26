import tool from '@/utilsSe/tool'
import router from '@/router'
import { getComInfo } from '@/api'
import { login, logout, getInfo } from '@/api/login'
import { constantRouterMap, syncAdminRouterMap, syncUserRouterMap } from '@/router' // 路由表
// import { constantRouterMap } from '@/router' // 路由表

/* 路由权限方法 */
const someFilter = (name, roles) => {
  return roles.some((v, i) => {
    return name === v.name
  })
}

const getSyncRouter = (router, roles) => {
  return router.filter((v, i) => {
    var isTrue = someFilter(v.name, roles)
    isTrue && v.children && (v.children = getSyncRouter(v.children, roles))
    if (isTrue) return v
  })
}

const user = {
  state: {
    token: tool.localGet('token'),
    userInfo: '',
    roles: constantRouterMap
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_COMINFO: (state, comInfo) => {
      state.comInfo = comInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    /* 登录 */
    Login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          const { data } = res
          tool.localSet('token', data.openId)
          commit('SET_TOKEN', data.openId)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 获取用户信息 */
    async GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const { data } = res
          commit('SET_USERINFO', data)
          const errPage = [{ path: '*', redirect: '/404' }] // 404页面
          let allRouter = constantRouterMap
          if (data.userType == 2) {
            allRouter = allRouter.concat(syncAdminRouterMap)
          } else if (data.userType == 1) {
            allRouter = allRouter.concat(syncUserRouterMap)
          }
          allRouter = allRouter.concat(errPage)
          commit('SET_ROLES', allRouter)
          resolve(allRouter)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 登出 */
    LogOut() {
      // return new Promise((resolve, reject) => {
      //   logout().then(res => {
      //     tool.localClear()
      //     router.push('/login')
      //     setTimeout(() => location.reload(), 50)
      //     resolve()
      //   }).catch(err => {
      //     reject(err)
      //   })
      // })
    },
    /* 前端登出 */
    FedLogOut() {
      return new Promise(resolve => {
        tool.localClear()
        location.reload()
        resolve()
      })
    }
  }
}

export default user
