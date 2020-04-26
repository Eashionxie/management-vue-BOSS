import tool from '@/utilsSe/tool'
import { getWxAuth, getWxConfig } from '@/api/wxAuth'

const wxConfig = {
  state: {
    userWx: '',
    wx: wx
  },
  mutations: {
    SET_USERWX(state, data) {
      state.userWx = data
    },
    SET_WX(state, data) {
      state.wx.config(data)
    }
  },
  actions: {
    /* 授权 */
    _getWxAuth({ commit }, code) {
      return new Promise((resolve, reject) => {
        getWxAuth({ code }).then(res => {
          const { data } = res
          tool.localSet('userWx', data)
          tool.localSet('token', data.token)
          commit('SET_USERWX', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 开放能力 */
    _getWxConfig({ commit }) {
      getWxConfig().then(res => {
        const { data } = res
        const config = {
          beta: true,
          // debug: true,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'checkJsApi',
            'chooseImage',
            'previewFile',
            'selectEnterpriseContact',
            'scanQRCode'
          ]
        }
        commit('SET_WX', config)
      })
    }
  }
}

export default wxConfig
