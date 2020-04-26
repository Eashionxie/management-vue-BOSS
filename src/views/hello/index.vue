<template>
  <div>
    hello，{{userInfo.nickName}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: this.$store.getters.userInfo
    }
  }
}
</script>

<style>

</style>