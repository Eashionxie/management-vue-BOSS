import mixinByDialog from './mixinByDialog'
import mixinByLookFile from './mixinByLookFile'

export default {
  props: ['uploadData', 'disabled'],
  mixins: [mixinByDialog, mixinByLookFile],
  data() {
    return {}
  },
  methods: {
    onSuccess(res, file, fileList) {
      /* 基础 */
      if (res.status !== 200) {
        this.$tool.messageErr('上传失败,请重试')
        this.$refs['upload'].clearFiles()
      }
      if (res.status === 200) {
        this.$tool.messageSuccess('上传成功')
        /* 列表 */
        this.$parent._getPageList && this.$parent._getPageList(1)
        /* form */
        this.$emit('onSuccess', fileList)
        /* showUrl */
        res.data && this.$emit('update:showUrl', this.$tool.download.img(res.data))
      }
    },
    onError(err, file, fileList) {
      console.log(err)
      this.$tool.messageErr('上传失败,请重试')
      this.$refs['upload'].clearFiles()
    },
    onPreview(res, file, fileList) {
      this.lookFile(res, () => {
        this.actionItem('look')
      })
    }
  }
}
