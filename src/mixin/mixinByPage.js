export default {
  data() {
    return {
      total: 0, // 总数
      records: [] // 列表
    }
  },
  methods: {
    async getPageList(current, callback, callRecords) {
      current && (this.sendData.current = current)
      const { data } = await callback(this.sendData)
      this.records = data.records
      this.total = Number(data.total)
      callRecords && callRecords(data.records)
    },
    async getPageListCom(current, callback, send, records, total, callRecords) {
      current && (this.sendData.current = current)
      const { data } = await callback(send)
      this[records] = data.records
      this[total] = Number(data.total)
      callRecords && callRecords(data.records)
    }
  }
}
