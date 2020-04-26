<template>
  <div>
    <el-dropdown @command="commandUser">
      <span class="colorBl flexHfe">
        <!-- <span>{{ userInfo.nickName }}</span> -->
        <img class="user-header" :src="userInfo.avatarUrl" alt="">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'

  export default {
    name: 'userArea',
    data() {
      return {}
    },
    created() {
    },
    methods: {
      async logout() {
        await this.$store.dispatch('FedLogOut')
        // location.reload()
      },
      commandUser(val) {
        val == 'logOut' && this.logout()
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.user-header {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
