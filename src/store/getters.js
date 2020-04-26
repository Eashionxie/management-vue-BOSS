const getters = {
  /* 自适应 */
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  /* 页面缓存 */
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  /* token */
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  /* wxConfig */
  userWx: state => state.wxConfig.userWx,
  wx: state => state.wxConfig.wx
}

export default getters
