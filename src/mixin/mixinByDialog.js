export default {
  data() {
    return {
      dialogVisible: false,
      dialogWidth: '800px',
      actionData: '',
      actionName: ''
    }
  },
  methods: {
    /* 操作 */
    actionItem(actionData, actionName) {
      this.actionData = actionData
      this.actionName = actionName
      this.dialogVisible = true
    },
    /* 确认弹窗 */
    dialogConfirm(callback) {
      this.dialogVisible = false
      this._getPageList && this._getPageList()
      this._getPageListCom && this._getPageListCom()
      callback && callback()
    }
  },
  watch: {
    dialogVisible(val) {
      !val && (this.actionData = '')
      !val && (this.actionName = '')
      !val && (this.fileUrl = '')
    }
  },
  computed: {
    dialogTitle() {
      if (typeof this.actionData === 'object') return '查看&&修改'
      if (this.actionData === 'add') return '新增'
      if (this.actionData === 'look') return '查看' // 例如图片(非form组件)
      else return '提示'
    }
  }
}
