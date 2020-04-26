<template>
  <div class="layoutFull scrollY">
    <headerAll></headerAll>
    <viewMain></viewMain>
  </div>
</template>

<script type="text/ecmascript-6">
  import headerAll from './components/headerAll'
  import viewMain from './components/viewMain'

  export default {
    components: {
      headerAll,
      viewMain
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
  .layoutFull {
    width: 100%;
    height: 100%;
    padding-top: 0.8rem;
  }
</style>
