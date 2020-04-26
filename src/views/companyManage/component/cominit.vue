<template>
  <div class="mask posR" @click="closeInit">
    <div class="contianer bgcFf" :class="[showBox ? 'show' : 'unshow']" @click.stop="boxClick">
      <el-form ref="sendForm" class="formSe p_20A" :model="sendForm" :rules="rules" label-position="top">
        <el-form-item prop="companyAvatar" label="公司LOGO">
          <div class="">
            <uploadOne class="head-upload" :showUrl.sync="showUrl" :uploadData="authData"></uploadOne>
          </div>
        </el-form-item>
        <el-form-item prop="companyName" label="公司名称">
          <el-input
            clearable type="text"
            size="medium"
            placeholder="请输入公司名称"
            v-model="sendForm.companyName">
          </el-input>
        </el-form-item>
        <el-form-item prop="companySize" label="公司规模">
          <el-select v-model="sendForm.companySize" placeholder="请选择">
            <el-option
              v-for="item in sizes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="financingType" label="融资情况">
          <el-select v-model="sendForm.financingType" placeholder="请选择">
            <el-option
              v-for="item in finances"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="companyShortDuce" label="公司简介">
          <el-input
            clearable type="textarea"
            :rows="3"
            :maxlength="32"
            show-word-limit
            placeholder="请输入公司简介"
            v-model="sendForm.companyShortDuce"
            @keyup.enter.native="commit">
          </el-input>
        </el-form-item>
        <el-form-item v-if="showBox" class="btn-contianer">
          <el-button class="w100" type="warning" size="medium" @click="commit">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addCompany } from '@/api'
export default {
  props: ['showInit', 'comInfo'],
  data() {
    return {
      showBox: false,
      showUrl: '',
      authData: { openid: this.$tool.localGet('token') },
      sizes: [
        {
          label: '1-19人',
          value: 0
        },
        {
          label: '20-99人',
          value: 1
        },
        {
          label: '100-499人',
          value: 2
        },
        {
          label: '500-999人',
          value: 3
        },
        {
          label: '1000-9999人',
          value: 4
        },
        {
          label: '10000人以上',
          value: 5
        }
      ],
      finances: [
        { label: '不需要融资', value: 0 },
        { label: '未融资', value: 1 },
        { label: 'A轮', value: 2 },
        { label: 'B轮', value: 3 },
        { label: 'C轮', value: 4 },
        { label: 'D轮及以上', value: 5 },
        { label: '已上市', value: 6 },
      ],
      sendForm: {
        companyAvatar: '',
        companyName: '',
        companySize: '',
        financingType: '',
        companyShortDuce: ''
      },
      rules: {
        companyAvatar: { required: true, message: "请选择LOGO", trigger: "blur" },
        companyName: { required: true, message: "请输入", trigger: "blur" },
        companySize: { required: true, message: "请选择", trigger: "blur" },
        financingType: { required: true, message: "请选择", trigger: "blur" },
        companyShortDuce: { required: true, message: "请输入", trigger: "blur" }
      }
    }
  },
  created() {
    setTimeout(() => {
      this.showBox = this.showInit
    }, 10);
    if (this.comInfo) {
      let _info = this.$tool.obCopy(this.comInfo)
      this.sendForm =  {
        _id: _info._id,
        companyAvatar: _info.companyAvatar,
        companyName: _info.companyName,
        companySize: _info.companySize,
        financingType: _info.financingType,
        companyShortDuce: _info.companyShortDuce
      }
      this.showUrl = this.comInfo.companyAvatar
    }
  },
  methods: {
    closeInit() {
      this.showBox = false
      setTimeout(() => {
        this.$emit('update:showInit', false)
      }, 500)
    },
    async commit() {
      this.sendForm.companyAvatar = this.showUrl
      const valid = await this.$refs["sendForm"].validate();
      if (!valid) return
      addCompany(this.sendForm).then(res => {
        this.$store.dispatch("GetInfo").then(res => {
          this.closeInit()
        })
      })
    },
    boxClick() {
      return
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, .5);
}
.contianer {
  position: fixed;
  width: 500px;
  height: 100%;
  right: -510px;
  transition: right  .5s  ease;
  -moz-transition: right .5s ease; /* Firefox 4 */
  -webkit-transition: right .5s ease; /* Safari and Chrome */
  -o-transition: right .5s ease; /* Opera */
}
.show {
  right:  0;
}
.unshow {
  right: -510px !important;
}
.formSe {
  /deep/ .el-select {
    display: block;
    width: 100%;
  }
}
.head-upload {
  width: 80px;
  height: 80px;
  line-height: 90px;
  background-color: #cfcfcf;
  border-radius: 50%;
  display: block !important;
}
.btn-contianer {
  margin-top: 80px;
  width: 90%;
  margin-left: 5%;
}
</style>