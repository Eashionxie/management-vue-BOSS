export default {
  props: ['actionData'],
  data() {
    return {
      labelWidth: '100px',
      disabled: this.actionData !== 'add' ? true : false,
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  methods: {
    initForm(callback) {
      if (this.actionData !== 'add') this.sendForm = this.$tool.obCopy(this.actionData)
      callback && callback(this.sendForm)
    },
    /* 添加文件列表 */
    onSuccessList(fileList) {
      this.sendForm.attachments = fileList.map((v) => {
        if (v.url) return v.url
        if (v.response) return v.response.data[0]
      })
    },
    async submitAction(add, update, sendForm) {
      const valid = await this.$refs['sendForm'].validate()
      if (!valid) return
      this.actionData === 'add' && await add(sendForm)
      this.actionData !== 'add' && await update(sendForm)
      this.$emit('confirm')
    }
  }
}
