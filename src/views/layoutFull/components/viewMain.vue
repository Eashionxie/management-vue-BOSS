<template>
  <section class="full">
    <transition name="fade-transform" mode="out-in">
      <router-view class="view-container" :key="key" v-if="isRouterAlive"/>
    </transition>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      }
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
