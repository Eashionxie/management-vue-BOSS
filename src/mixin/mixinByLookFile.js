export default {
  data() {
    return {
      fileUrl: ''
    }
  },
  methods: {
    lookFile(item, callBack) {
      if (item.fileUrl) this.fileUrl = this.$tool.download.img(item.fileUrl)
      if (item.response) this.fileUrl = this.$tool.download.img(item.response.data[0])
      if (!this.$tool.isImg(this.fileUrl)) return window.open(this.fileUrl)
      callBack && callBack(this.fileUrl)
    }
  }
}
