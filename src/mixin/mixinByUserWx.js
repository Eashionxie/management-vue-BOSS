export default {
  methods: {
    /* 通讯录选人 */
    selectEnterpriseContact(selectedUserIds, callback, selectedDepartmentIds, mode = 'multi', type = ['user']) {
      this.$wxTMS.invoke('selectEnterpriseContact', {
        fromDepartmentId: -1,
        selectedUserIds: selectedUserIds, // 非必填 已选用户ID列表 用于多次选人时可重入
        selectedDepartmentIds: selectedDepartmentIds, // 非必填 已选部门ID列表 用于多次选人时可重入
        mode: mode, // 多选 multi single
        type: type // 必填 选择限制类型 指定department、user中的一个或者多个
      }, (res) => {
        if (res.err_msg === 'selectEnterpriseContact:ok') {
          typeof res.result === 'string' && (res.result = JSON.parse(res.result))
          callback(res.result)
        } else this.$tool.messageErr('获取通讯录失败,请重试')
      })
    }
  }
}
