<template>
  <div :id="idName" class="echartsTem"></div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'

  export default {
    name: 'echartsTem',
    props: ['option', 'idName', 'carousel'],
    data() {
      return {
        echarts: '',
        echartsInterval: false
      }
    },
    created() {
    },
    mounted() {
      this.initAll()
    },
    methods: {
      /* 初始化 */
      initAll() {
        setTimeout(() => {
          this.getEchart()
          this._resize()
        }, 50)
      },
      /* 获取echarts */
      getEchart() {
        this.echarts = echarts.init(document.querySelector(`#${this.idName}`))
        this.echarts.setOption(this.option)
        /* 点击事件 */
        this.echarts.on('click', (params) => {
          this.$emit('axisClick', params)
        })
        /* 轮播 */
        this.actionRow()
      },
      /* 屏幕监听 */
      _resize() {
        window.addEventListener('resize', () => {
          this.idName && setTimeout(() => {
            this.echarts.resize()
          }, 500)
        })
      },
      /* 轮播 */
      actionRow() {
        if (!this.carousel) return
        clearInterval(this.echartsInterval)
        let app = {
          currentIndex: 0
        }
        this.echarts.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        this.echarts.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        this.echartsInterval = setInterval(() => {
          let dataLen = this.option.series[0].data.length
          /* 取消之前高亮的图形 */
          this.echarts.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          this.echarts.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          this.echarts.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
        }, 3 * 1000)
      }
    },
    computed: {
      sidebar() {
        return this.$store.getters.sidebar
      }
    },
    watch: {
      option: {
        handler(val) {
          setTimeout(() => {
            this.echarts.setOption(val)
            this.actionRow()
          }, 50)
        },
        deep: true
      },
      sidebar: {
        handler(val) {
          setTimeout(() => {
            this.echarts.resize()
          }, 500)
        },
        deep: true
      }
    },
    beforeDestroy() {
      clearInterval(this.echartsInterval)
      this.echartsInterval = false
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
