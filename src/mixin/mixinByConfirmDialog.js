export default {
  methods: {
    /* 通用弹窗提示 */
    confirmDialog(title, api, item) {
      this.$elementTMS.confirmDialog(this, title, () => {
        this[api](item)
      })
    }
  }
}
