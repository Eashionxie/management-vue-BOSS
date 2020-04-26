<template>
  <div class="loginBg full poR">
    <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay" muted>
      <source :src="PATH_TO_MP4" type="video/mp4"/>
      浏览器不支持 video 标签，建议升级浏览器。
      <source :src="PATH_TO_WEBM" type="video/webm"/>
      浏览器不支持 video 标签，建议升级浏览器。
    </video>
    <div class="posCC">
      <div class="tac">
        <!-- <div class="loginLogo dIb"></div> -->
      </div>
      <el-form
        v-show="showLogin"
        ref="sendFormLogin"
        :class="[showLogin ? 'showBox' : 'boxUnshow']"
        class="formSe p_20A"
        :model="sendFormLogin"
        :rules="loginRules"
      >
        <div class="colorFf font18 m_30TB">账户登录</div>
        <el-form-item prop="phoneNumber">
          <el-input clearable size="medium" placeholder="请输入" v-model="sendFormLogin.phoneNumber">
            <template slot="prepend">{{passbox? '账户' : '手机号'}}</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="passbox" prop="userPassword">
          <el-input
            clearable
            type="password"
            size="medium"
            placeholder="请输入"
            v-model="sendFormLogin.userPassword"
            @keyup.enter.native="submitLogin"
          >
            <template slot="prepend">密码</template>
          </el-input>
        </el-form-item>
        <el-form-item v-else prop="userPassword">
          <div class="flexHsb w100">
            <el-input
              class="authCode-input"
              clearable
              type="password"
              size="medium"
              placeholder="请输入"
              v-model="sendFormLogin.code"
              @keyup="submitLogin"
            >
              <template slot="prepend">验证码</template>
            </el-input>
            <el-button size="small" type="primary" @click="_getAuthCode">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="flexHsb w100">
            <el-button class="subminBtn" type="warning" size="medium" @click="submitLogin">登录</el-button>
            <span class="codeLogin flexHsb" @click="passbox = !passbox">
              <span>{{passbox ? '验证码登录' : '密码登录'}}</span>
              <span class="iconfont icon-right"></span>
            </span>
          </div>
        </el-form-item>
        <div class="tal">
          <span class="colorBl font12 cursorPoin" @click="showLogin = !showLogin">用户注册</span>
        </div>
      </el-form>

      <el-form
        v-show="!showLogin"
        ref="sendForm"
        class="formSe p_20A"
        :class="[showLogin ? 'boxUnshow' : 'showBox']"
        :model="sendForm"
        :rules="rules"
      >
        <div class="colorFf font18 m_30TB">用户注册</div>
        <el-form-item prop="phoneNumber">
          <el-input clearable size="medium" placeholder="请输入手机号码" v-model="sendForm.phoneNumber">
            <template slot="prepend">{{passbox? '注册账户' : '注册手机'}}</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="userPassword">
          <el-input
            clearable
            type="password"
            size="medium"
            placeholder="设置登录密码"
            v-model="sendForm.userPassword"
          >
            <template slot="prepend">登录密码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            clearable
            type="password"
            size="medium"
            placeholder="请确认密码"
            v-model="sendForm.confirmPassword"
          >
            <template slot="prepend">确认密码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="flexHsb w100">
            <el-input
              class="authCode-input"
              clearable
              type="number"
              size="medium"
              placeholder="请输入验证码"
              v-model="sendForm.code"
              @keyup.enter.native="submitSignup"
            >
              <template slot="prepend">验证码</template>
            </el-input>
            <el-button
              class="timer-btn"
              size="small"
              :disabled="showTimer"
              type="primary"
              @click="_getAuthCode"
            >{{ showTimer ? intervalNum + '秒后获取' : '获取验证码'}}</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="w100" type="warning" size="medium" @click="submitSignup">注册</el-button>
        </el-form-item>
        <div class="tal">
          <span class="colorBl font12 cursorPoin" @click="showLogin = !showLogin">已有账号,直接登录</span>
        </div>
      </el-form>
    </div>
    <div class="beian">
      <span>互联网ICP备案：</span>
      <a href="http://beian.miit.gov.cn/" target="_blank">鄂ICP备19016359号-1</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAuthCode, signUp } from "../../api/login";
export default {
  data() {
    const checkPWD = (rule, value, callback) => {
      if (!value) return callback(new Error("请输入"));
      if (value !== this.sendForm.userPassword)
        return callback(new Error("两次输入密码不一致"));
      callback();
    };
    const checkLOGINPWD = (rule, value, callback) => {
      if (!value && !this.sendFormLogin.code)
        return callback(new Error("请输入"));
      callback();
    };
    return {
      bgSrc: require("../../imgs/bgvideo.mp4"),
      vedioCanPlay: false,
      fixStyle: '',
      PATH_TO_MP4: require("../../imgs/bgvideo.mp4"),
      PATH_TO_WEBM: '',
      PATH_TO_JPEG: require("../../imgs/bgvideo.mp4"),
      showLogin: true,
      redirect: this.$route.query.redirect || "",
      passbox: true,
      showTimer: false,
      intervalNum: 60,
      sendForm: {
        phoneNumber: "",
        userPassword: "",
        confirmPassword: "",
        code: ""
      },
      sendFormLogin: {
        phoneNumber: "",
        userPassword: "",
        code: ""
      },
      rules: {
        phoneNumber: { required: true, message: "请输入", trigger: "blur" },
        userPassword: { required: true, message: "请输入", trigger: "blur" },
        confirmPassword: { validator: checkPWD, trigger: "blur" },
        code: { required: true, message: "请输入", trigger: "blur" }
      },
      loginRules: {
        phoneNumber: { required: true, message: "请输入", trigger: "blur" },
        userPassword: {
          validator: checkLOGINPWD,
          message: "请输入",
          trigger: "blur"
        }
      }
    };
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
  methods: {
    async _getAuthCode() {
      console.log(this.sendForm.phoneNumber);
      console.log(this.sendFormLogin.phoneNumber);
      let timer = null;
      if (
        !/^\(+\?86\)\?1\(3[0-9]\{3\}\|5[01235-9][0-9]\{2\}\|8[0-9]\{3\}\|7\([0-35-9][0-9]\{2\}\|4\(0[0-9]\|1[0-2]\|9[0-9]\)\)\|9[0135-9][0-9]\{2\}\|6[2567][0-9]\{2\}\|4[579][0-9]\{2\}\)[0-9]\{6\}$/.test(this.sendForm.phoneNumber) &&
        !/^\(+\?86\)\?1\(3[0-9]\{3\}\|5[01235-9][0-9]\{2\}\|8[0-9]\{3\}\|7\([0-35-9][0-9]\{2\}\|4\(0[0-9]\|1[0-2]\|9[0-9]\)\)\|9[0135-9][0-9]\{2\}\|6[2567][0-9]\{2\}\|4[579][0-9]\{2\}\)[0-9]\{6\}$/.test(this.sendFormLogin.phoneNumber)
      )
        return this.$tool.messageErr("请检查手机号码是否有误");
      let { data } = await getAuthCode({
        phoneNumber: this.sendForm.phoneNumber
          ? this.sendForm.phoneNumber
          : this.sendFormLogin.phoneNumber
      }).catch(_ => {
        this.$tool.messageErr("验证码发送失败");
      });
      this.$tool.messageSuccess("发送成功!");
      this.showTimer = true;
      timer = setInterval(() => {
        if (this.intervalNum > 1) this.intervalNum--;
        else {
          clearInterval(timer);
          this.intervalNum = 60;
          this.showTimer = false;
        }
      }, 1000);
    },
    async submitSignup() {
      const valid = await this.$refs["sendForm"].validate();
      if (!valid) return;
      let { data } = await signUp(this.sendForm);
      this.$tool.localSet("token", data.openId);
      this.$store.dispatch("GetInfo");
      this.$router.replace("/baseInfo");
    },
    async submitLogin() {
      // if (!/^1[3456789]\d{9}$/.test(this.sendForm.phoneNumber))
      //   return this.$tool.messageErr("请输入正确的用户名或手机号")
      const valid = await this.$refs["sendFormLogin"].validate();
      if (!valid) return;
      await this.$store.dispatch("Login", this.sendFormLogin);
      this.$router.replace(this.redirect || "/");
    },
    canplay() {
      this.vedioCanPlay = true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
// .loginBg {
//   background: url("../../imgs/loginBg.png") no-repeat center;
//   background-size: cover;
// }

// .loginLogo {
//   width: 250px;
//   height: 50px;
//   background: url("../../imgs/loginLogo.png") no-repeat center;
//   background-size: cover;
// }
.subminBtn {
  width: 70%;
}
.codeLogin {
  // width: 30%;
  cursor: pointer;
  color: #457bc7;
  border-bottom: 1px solid #457bc7;
}
.cursorPoin:hover {
  color: rgb(60, 138, 228);
}

.authCode-input {
  width: 60%;
}

.showBox {
  width: 400px;
  animation: showBox 0.5s;
  -webkit-animation: showBox 0.5s;
}

.unShowBox {
  width: 0;
  animation: boxUnshow 0.5s;
  -webkit-animation: boxUnshow 0.5s;
}

.formSe {
  background: rgba(255, 255, 255, 0.1);
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
.timer-btn {
  width: 100px;
}

@keyframes boxUnshow {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-webkit-keyframes boxUnshow {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes showBox {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes showBox {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
