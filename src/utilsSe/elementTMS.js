import Vue from 'vue'

class elementTMS {
  /* 消息框 */
  static alertDialog(that, title, callback, confirmButtonText = '确认') {
    that.$alert(title, '提示', {
      center: true,
      callback: callback,
      confirmButtonText: confirmButtonText
    })
  }

  /* 确认框 */
  static confirmDialog(that, title, confirm, cancel, confirmButtonText = '确认', cancelButtonText = '取消') {
    that.$confirm(title, '提示', {
      type: 'warning',
      center: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    }).then(confirm).catch(cancel)
  }

  /* 输入确认框 */
  static promptDialog(that, title, confirm, cancel, confirmButtonText = '确认', cancelButtonText = '取消') {
    that.$prompt(title, '提示', {
      center: true,
      inputPlaceholder: '请输入内容',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    }).then(confirm).catch(cancel)
  }
}

Vue.prototype.$elementTMS = elementTMS
export default elementTMS
