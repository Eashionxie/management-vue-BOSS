<template>
  <div class="full">
    <iframe 
      src='http://at.maguaxie.cn/简历-谢龙山.pdf'
      width='100%' height='100%' frameborder='1'>
    </iframe>
    <div class="tar p_10T p_20R">
      <el-button type="primary" @click="_changeStatus(2, true)">通过筛选</el-button>
      <el-button type="danger" @click="_changeStatus(3, true)">不合适</el-button>
    </div>
  </div>
</template>

<script>
import { changeStatus } from '@/api'
export default {
  props: ['delivery'],
  created() {
    this.delivery.deliveryType == '0' && this._changeStatus('1')
  },
  methods: {
    async _changeStatus(status, refresh = false) {
      let { data } = await changeStatus({ _id: this.delivery._id, status: status })
      refresh && this.$emit('closeAndRefresh')
    }
  }
}
</script>

<style>

</style>