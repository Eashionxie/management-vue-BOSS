import Vue from 'vue'

/* 依赖 */
import '@/utilsSe/elementTMS'
import '@/utilsSe/rem'
import '@/utilsSe/tool'
import '@/utilsSe/vueFilter'
import '@/permission'

/* 组件 */
import echartsTem from '@/componentsSe/echartsTem'
import uploadOne from '@/componentsSe/uploadOne'
import Tmap from '@/componentsSe/Tmap'
import Tinymce from '@/componentsSe/Tinymce'
import paginationSe from '@/componentsSe/paginationSe'

/* 组件 */
Vue.component('echartsTem', echartsTem) // echartsTem
Vue.component('uploadOne', uploadOne) // 单张图片上传
Vue.component('Tmap', Tmap) // 腾讯地图组件
Vue.component('Tinymce', Tinymce) // 富文本
Vue.component('paginationSe', paginationSe) // 分页
