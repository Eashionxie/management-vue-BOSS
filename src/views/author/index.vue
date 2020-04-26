<template>
  <div class="flexCC full">
    授权中...
  </div>
</template>

<script>
  import { getWxCodeUrl } from '@/api/wxAuth'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        redirect: this.$route.query.redirect || ''
      }
    },
    created() {
      this.author()
    },
    methods: {
      ...mapActions(['_getWxAuth', '_getWxConfig']),
      /* 授权 */
      async author() {
        if (!this.$tool.getQueryString('code')) {
          const { data } = await getWxCodeUrl()
          location.href = data
        } else {
          await this._getWxAuth(this.$tool.getQueryString('code')).catch(err => {
            this.$router.push('/404')
          })
          this.$router.push(this.redirect || '/')
          await this._getWxConfig()
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
