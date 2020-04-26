<template>
  <div class="full">
    <el-form ref="sendForm" class="formSe p_20A" label-width="100px" :model="sendForm" :rules="rules" label-position="right">
        <el-form-item prop="welfares" label="公司福利">
          <el-select multiple v-model="sendForm.welfares" placeholder="请选择">
            <el-option
              v-for="item in welfares"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="established" label="成立日期">
          <el-date-picker
            v-model="sendForm.established"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="registeredCapital" label="注册资金">
          <el-input
            clearable type="number"
            size="medium"
            placeholder="请输入注册资金"
            v-model="sendForm.registeredCapital">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="legalRepresentative" label="法人代表">
          <el-input
            clearable type="text"
            size="medium"
            placeholder="请输入法人代表"
            v-model="sendForm.legalRepresentative">
          </el-input>
        </el-form-item>
        <el-form-item prop="officeWeb" label="公司网站">
          <el-input
            clearable type="text"
            size="medium"
            placeholder="请输入网站地址"
            v-model="sendForm.officeWeb">
          </el-input>
        </el-form-item>
        <div class="btn-contianer m_30T m_30L">
          <el-button type="primary" size="medium" @click="commit">提交</el-button>
        </div>
      </el-form>
  </div>
</template>

<script>
import { getWelfares, addCompany } from '@/api'
export default {
  props: ['comInfo'],
  data () {
    return {
      welfares: [],
      sendForm: {
        _id: '',
        welfares: [],
        established: '',
        registeredCapital: '',
        legalRepresentative: '',
        officeWeb: ''
      },
      data: [],
      rules: {
        // welfares: { required: true, message: "请选择", trigger: "blur" },
        established: { required: true, message: "请选择", trigger: "blur" },
        registeredCapital: { required: true, message: "请选择", trigger: "blur" },
        legalRepresentative: { required: true, message: "请选择", trigger: "blur" },
        officeWeb: { required: true, message: "请选择", trigger: "blur" },
      }
    }
  },
  created () {
    this._getWelfares()
    if (this.comInfo) {
      this.sendForm._id = this.comInfo._id
      this.sendForm.welfares = this.comInfo.welfares
      this.comInfo.established && (this.sendForm.established = this.comInfo.established)
      this.comInfo.registeredCapital && (this.sendForm.registeredCapital = this.comInfo.registeredCapital)
      this.comInfo.legalRepresentative && (this.sendForm.legalRepresentative = this.comInfo.legalRepresentative)
      this.comInfo.officeWeb && (this.sendForm.officeWeb = this.comInfo.officeWeb)
    }
  },
  methods: {
    async _getWelfares() {
      let { data } = await getWelfares()
      this.welfares = data
    },
    async commit() {
      let _send = this.$tool.obCopy(this.sendForm)
      const valid = await this.$refs["sendForm"].validate();
      if (!valid) return
      // _send.welfares = _send.welfares.join(',')
      addCompany(_send).then(res => {
        this.$emit('update:comInfo', res.data)
        this.$parent.$parent.dialogVisible = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.formSe {
  /deep/ .el-input {
    width: 50%;
  }
  /deep/ .el-select {
    // display: block;
    width: 50%;
    .el-input {
      width: 100% !important;
    }
  }
}
</style>