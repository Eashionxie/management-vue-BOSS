import Vue from 'vue'
import store from '@/store'

class wxTMS {
  /* 一般方法 */
  static wxInit(name, data, callback) {
    const wx = store.getters.wx
    wx.ready(() => wx[name](data, callback))
    wx.error(() => store.dispatch('_getWxConfig'))
  }

  /* invoke */
  static invoke(name, data, callback) {
    const wx = store.getters.wx
    wx.ready(() => wx.invoke(name, data, callback))
    wx.error(() => store.dispatch('_getWxConfig'))
  }
}

Vue.prototype.$wxTMS = wxTMS
export default wxTMS
