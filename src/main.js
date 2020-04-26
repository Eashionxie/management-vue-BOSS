import Vue from 'vue'
import App from './App'

import element from 'element-ui'
import router from '@/router'
import store from '@/store'

import $ from 'jquery'
// import vconsole from 'vconsole'

import 'element-ui/lib/theme-chalk/index.css' // element css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/stylesSe/index.scss' // global css

import '@/icons' // icon
import '@/utilsSe' // 依赖

// const vconsole = new vconsole()

Vue.use(element, { size: 'small', zIndex: 3000 })
Vue.prototype.$ = $
Vue.config.productionTip = false //  eslint-disable no-new

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
