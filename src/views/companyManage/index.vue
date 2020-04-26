<template>
  <div class="full poR">
    <div v-if="!userInfo.companyId" class="posLT">
      <span class="dIb add-btn" type="primary" @click="addCom">
        <span>添加公司</span>
        <span class="iconfont icon-increase"></span>
      </span>
    </div>
    <div v-else class="infomations">
      <div class="company-items">
        <div
          v-for="(item, index) in infoTypes"
          :key="index"
          :class="[infoType === index ? 'bgcFe' : '']"
          @click="infoType = index"
        >{{item}}</div>
      </div>
      <div class="info-window">
        <base-info v-if="infoType === 0" :comInfo.sync="comInfo" class="info-box"></base-info>
        <Tinymce v-if="infoType === 1" v-model="infoSend" height="600px"></Tinymce>
        <el-button v-if="infoType === 1" size="mini" type="primary" class="posRT" @click="_updateCom">提交</el-button>
        <div v-if="infoType === 2" class="flexCC font24">暂未开放</div>
        <div v-if="infoType === 3" class="flexCC font24">暂未开放</div>
      </div>
    </div>
    <com-init v-if="showInit" class="com-init" :showInit.sync="showInit" :comInfo="comInfo"></com-init>
    <el-dialog :visible.sync="dialogVisible" width="600px">
      <more-info v-if="dialogVisible" :comInfo.sync="comInfo"></more-info>
    </el-dialog>
  </div>
</template>

<script>
const _infoTypes = [
  '基本信息',
  '详细信息',
  '产品信息',
  '管理者简介'
]
import { getComInfo, addCompany } from '@/api'
import comInit from './component/cominit'
import baseInfo from './component/baseinfo'
import moreInfo from './component/moreInfo'
export default {
  components: {
    comInit,
    baseInfo,
    moreInfo
  },
  data() {
    return {
      showInit: false,
      dialogVisible: false,
      infoType: 0,
      userInfo: this.$store.getters.userInfo,
      infoTypes: _infoTypes,
      comInfo: '',
      infoSend: ''
    }
  },
  watch: {
    showInit(val) {
      this.userInfo = this.$store.getters.userInfo
      this.userInfo.companyId && this._getComInfo(this.userInfo.companyId)
    }
  },
  created() {
    this.userInfo = this.$store.getters.userInfo
    this.userInfo.companyId && this._getComInfo(this.userInfo.companyId)
  },
  methods: {
    addCom() {
      setTimeout(() => {
        this.showInit = !this.showInit
      }, 100);
    },
    async _getComInfo(id) {
      let { data } = await getComInfo({ _id: id })
      this.comInfo = data
      this.comInfo.companyIntroduction ? this.infoSend = this.comInfo.companyIntroduction : this.infoSend = ''
    },
    async _updateCom() {
      let { data } = await addCompany({ _id: this.comInfo._id, companyIntroduction: this.infoSend }).catch(err => {
        this.$tool.messageErr('提交失败！')
      })
      this.comInfo = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.full > .posLT {
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
}
// .app-container {
//   padding: 0 20px 20px 0 !important;
// }
.add-btn {
  background-color: #409eff;
  color: #ffffff;
  padding: 10px 12px 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #66b1ff;
  }
}
.infomations {
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.company-items {
  width: 180px;
  height: 100%;
  background-color: #efefef;
  div {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    cursor: pointer;
  }
  div:hover {
    background-color: #dfdfdf;

  }
}
.info-window {
  flex: 1;
  height: 100%;
}
.bgcFe:hover {
  background-color: #d44f48c5 !important;
  color: #fff;
}
.info-box {
  padding: 20px 40px;
}
.com-init {
  position: absolute;
  right: 0;
  top: 0;
}
/deep/ .el-button {
  height: 34px;
  margin-right: 0 !important;
}
</style>