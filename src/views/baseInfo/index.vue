<template>
  <div class="loginBg full poR">
    <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay" muted>
      <source :src="PATH_TO_MP4" type="video/mp4"/>
      浏览器不支持 video 标签，建议升级浏览器。
      <source :src="PATH_TO_WEBM" type="video/webm"/>
      浏览器不支持 video 标签，建议升级浏览器。
    </video>
    <div class="posCC">
      <el-form ref="sendForm" class="formSe p_20A" :model="sendForm" :rules="rules">
        <div class="colorFf font18 m_30TB">完善个人信息</div>
        <el-form-item>
          <!-- 头像上传 -->
          <div class="w100 tac">
            <span class="head-title colorFf">头像</span>
            <uploadOne class="head-upload" :showUrl.sync="showUrl" :uploadData="authData"></uploadOne>
          </div>
        </el-form-item>
        <el-form-item prop="nickName">
          <!-- 用户名 -->
          <el-input clearable type="text" size="medium" placeholder="请输入用户姓名" v-model="sendForm.nickName" @keyup.enter.native="commit">
            <template slot="prepend">用户姓名</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w100" type="warning" size="medium" @click="commit">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="beian">
      <span>互联网ICP备案：</span>
      <a href="http://beian.miit.gov.cn/" target="_blank">鄂ICP备19016359号-1</a>
    </div>
  </div>
</template>

<script>
import { userUpdate } from '@/api/login'
export default {
  data() {
    return {
      bgSrc: require("../../imgs/bgvideo.mp4"),
      vedioCanPlay: false,
      fixStyle: '',
      PATH_TO_MP4: require("../../imgs/bgvideo.mp4"),
      PATH_TO_WEBM: '',
      PATH_TO_JPEG: require("../../imgs/bgvideo.mp4"),
      redirect: this.$route.query.redirect || "",
      showUrl: '',
      authData: { openid: this.$tool.localGet('token') },
      sendForm: {
        nickName: '',
        avatarUrl: ''
      },
      rules: {
        nickName: { required: true, message: "请输入", trigger: "blur" }
      }
    }
  },
  mounted() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial"
        }
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100vh',
          width: windowHeight / 0.5625 + "px",
        }
      }
    }
    window.onresize()
  },
  created() {
    let _user = this.$store.getters.userInfo
    if (!_user.openId) {
      this.$tool.messageErr('请先注册')
      this.$router.replace('/login')
    }
  },
  methods: {
    async commit() {
      const valid = await this.$refs["sendForm"].validate();
      if (!valid) return;
      this.showUrl ? this.sendForm.avatarUrl = this.showUrl : this.sendForm.avatarUrl = 'http://at.maguaxie.cn/defaultHead.png'
      userUpdate(this.sendForm).then(res => {
        this.$store.commit('SET_USERINFO', res.data)
        this.$router.replace(this.redirect || "/")
      })
    },
    canplay() {
      this.vedioCanPlay = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
// .loginBg {
//   // background: url("../../imgs/loginBg.png") no-repeat center;
//   background: #666;
//   background-size: cover;
// }

// .loginLogo {
//   width: 250px;
//   height: 50px;
//   background: #111;
//   // background: url("../../imgs/loginLogo.png") no-repeat center;
//   background-size: cover;
// }
.formSe {
  width: 400px;
  background: rgba(255, 255, 255, 0.1);
  /deep/ .el-select {
    display: block;
    width: 100%;
  }
  /deep/ .el-input {
    background: rgba(255, 255, 255, 0.3);
    .el-input-group__prepend {
      background: none;
      border: none;
      color: #ffffff;
    }
    .el-input__inner {
      background: none;
      border: none;
      color: #ffffff;
    }
  }
}
.head-upload {
  width: 80px;
  height: 80px;
  line-height: 90px;
  background-color: #cfcfcf;
  border-radius: 50%;
}
.head-title {
  position: absolute;
  left: 20px;
  top: 0;
}
.beian {
  position: absolute;
  font-size: 12px;
  color: #999999;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  a:hover {
    color: #4379c7;
  }
}
</style>