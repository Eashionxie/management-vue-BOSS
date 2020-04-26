import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/* 全屏组件 */
// import layoutFull from '../views/layoutFull'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/

/* 同步路由 */
export const constantRouterMap = [
  /* 定向页面 */
  { path: '/', redirect: '/helloPage' },
  // { path: '*', redirect: '/404', hidden: true },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        name: 'redirect',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/404',
    name: 'err404',
    component: () => import('@/views/404/err404'),
    hidden: true
  },
  /* {
    path: '/author',
    name: 'author',
    component: () => import('@/views/author'),
    hidden: true
  }, */
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/baseInfo',
    name: 'baseInfo',
    component: () => import('@/views/baseInfo'),
    hidden: true
  },
  {
    path: '/helloPage',
    name: 'helloPage',
    redirect: '/helloPage/helloPageSon',
    component: Layout,
    meta: { title: '主页' },
    children: [
      {
        path: 'helloPageSon',
        name: 'helloPageSon',
        component: () => import('@/views/hello'),
        meta: { icon: 'example', title: '主页' }
      }
    ]
  },
  /* 业务页面 */
]

/* 异步路由 */
export const syncAdminRouterMap = [
  {
    path: '/openJobs',
    name: 'openJobs',
    redirect: '/openJobs/openJobsSon',
    component: Layout,
    meta: { title: '在招职位' },
    children: [
      {
        path: 'openJobsSon',
        name: 'openJobsSon',
        component: () => import('@/views/openJobs/index'),
        meta: { icon: 'example', title: '在招职位' }
      },
      {
        path: 'modifyJob',
        name: 'modifyJob',
        component: () => import('@/views/modifyJob'),
        meta: { title: '编辑职位信息' },
        hidden: true
      }
    ]
  },
  {
    path: '/resumeFilter',
    name: 'resumeFilter',
    redirect: '/resumeFilter/resumeFilterSon',
    component: Layout,
    meta: { title: '简历筛选' },
    children: [{
      path: 'resumeFilterSon',
      name: 'resumeFilterSon',
      component: () => import('@/views/resumeFilter'),
      meta: { icon: 'example', title: '简历筛选' }
    }]
  },
  {
    path: '/message',
    name: 'message',
    redirect: '/message/messageSon',
    component: Layout,
    meta: { title: '在线沟通' },
    children: [{
      path: 'messageSon',
      name: 'messageSon',
      component: () => import('@/views/message'),
      meta: { icon: 'example', title: '在线沟通' }
    }]
  },
  {
    path: '/companyManage',
    name: 'companyManage',
    redirect: '/companyManage/companyManageSon',
    component: Layout,
    meta: { title: '公司信息管理' },
    children: [
      {
        path: 'companyManageSon',
        name: 'companyManageSon',
        component: () => import('@/views/companyManage'),
        meta: { icon: 'example', title: '公司信息管理' }
      }
    ]
  }
]

export const syncUserRouterMap = [
  {
    path: '/uploadResume',
    name: 'uploadResume',
    redirect: '/uploadResume/uploadResumeSon',
    component: Layout,
    meta: { title: '上传简历' },
    children: [{
      path: 'uploadResumeSon',
      name: 'uploadResumeSon',
      component: () => import('@/views/uploadResume'),
      meta: { icon: 'example', title: '上传简历' }
    }]
  }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
