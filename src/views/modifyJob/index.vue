<template>
  <div class="full">
    <el-form ref="sendForm" class="formSe p_20A" :model="sendForm" :rules="rules" label-width="80px" label-position="right">
      <el-form-item class="flex1" prop="jobName" label="职位名称">
        <el-input
          clearable type="text"
          size="medium"
          placeholder="请输入"
          v-model="sendForm.jobName">
        </el-input>  
      </el-form-item>
      <el-form-item class="flex1" prop="city" label="所在城市">
        <el-cascader
          v-model="jobCity"
          :options="citys"
          :show-all-levels="false"
          :props="{ label: 'name', children: 'citys', value: 'name' }"
          @change="cityChange"
          >
        </el-cascader>
      </el-form-item>
      <el-form-item class="flex1 salary" prop="minSalary" label="薪资范围">
        <el-select v-model="sendForm.minSalary" @change="choosedMin" placeholder="请选择">
          <el-option
            v-for="item in salaryColumns"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
        <span class="dIb tac" style="width: 6%">至</span>
        <el-select v-model="sendForm.maxSalary" :disabled="sendForm.minSalary ? false : true" placeholder="请选择">
          <el-option
            v-for="item in salaryColumns2"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="flex1" prop="salaryType" label="薪资类型">
        
      </el-form-item>
      <el-form-item class="flex1" prop="workExp" label="经验要求">
        <el-select v-model="sendForm.workExp" placeholder="请选择">
          <el-option
            v-for="item in exps"
            :key="item.key"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="flex1" prop="eduLeve" label="学历要求">
        <el-select v-model="sendForm.eduLeve" placeholder="请选择">
          <el-option
            v-for="item in edus"
            :key="item.key"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="flex1" prop="jobTypeId" label="职位类型">
        <el-cascader
          v-model="jobType"
          :options="jobTypes"
          :show-all-levels="false"
          :props="{ label: 'childTypeName', children: 'childTypes', value: '_id' }"
          @change="jobTypeChange"
        >
          <template slot-scope="{ node, data }">
            <span>{{ data.typeName }}</span>
            <span v-if="!node.isLeaf"> ({{ data.childTypes.length }}) </span>
            <span v-if="node.isLeaf">{{ data.childTypeName }}</span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item class="flex1" prop="tags" label="岗位标签">
        
      </el-form-item>
      <el-form-item class="w100" label="详细位置">
        <span v-if="sendForm.exactAddress" class="dIb font14 bor_B">{{sendForm.exactAddress.name}}</span>
        <el-button v-if="!sendForm.exactAddress || !sendForm.exactAddress.name" type="warning" size="mini" @click="useComLoc">使用公司位置</el-button>
        <el-button class="m_20L" type="primary" size="mini" icon="el-icon-add-location" @click="mapDialog = true">选择位置</el-button>
      </el-form-item>
      <el-form-item class="w100" prop="detail" label="职位详情">
        <Tinymce v-model="sendForm.detail" height="300" style="margin-top: 38px"></Tinymce>
      </el-form-item>
      <div class="posRT">
        <el-button type="primary" size="medium" @click="commit">保存</el-button>
      </div>
    </el-form>

    <el-dialog class="map-contianer" title="选择地址" :visible.sync="mapDialog">
      <Tmap
        v-if="mapDialog"
        :position="sendForm.exactAddress.lat ? { latitude: sendForm.exactAddress.lat, longitude: sendForm.exactAddress.lng } : ''"
        @commit="confirmAddress"
      ></Tmap>
    </el-dialog>
  </div>
</template>

<script>
import { getComInfo, getJobDetail, addJob } from '@/api'
import { getCitys, getJobTypes } from '@/api/common'
import salaryColumns from '../../utilsSe/salarys'
const _exps = [
  {
    value: '经验不限',
    key: 0
  },
  {
    value: '1-3年',
    key: 1
  },
  {
    value: '3-5年',
    key: 2
  },
]
const _edus = [
  {
    value: '学历不限',
    key: 0
  },
  {
    value: '初中',
    key: 1
  },
  {
    value: '中专/中技',
    key: 2
  },
  {
    value: '大专',
    key: 3
  },
  {
    value: '本科',
    key: 4
  },
  {
    value: '硕士',
    key: 5
  },
]
export default {
  data() {
    return {
      mapDialog: false,
      sendForm: {},
      rules: {
        jobName: { required: true, message: "必填", trigger: "blur" },
        city: { required: true, message: "必填", trigger: "blur" },
        minSalary: { required: true, message: "必填", trigger: "blur" },
        // salaryType: { required: true, message: "必填", trigger: "blur" },
        workExp: { required: true, message: "必填", trigger: "blur" },
        eduLeve: { required: true, message: "必填", trigger: "blur" },
        jobTypeId: { required: true, message: "必填", trigger: "blur" },
        detail: { required: true, message: "必填", trigger: "blur" },
      },
      exps: _exps,
      edus: _edus,
      jobCity: [],
      jobType: [],
      jobTypes: [],
      salaryColumns: salaryColumns.salaryColumns,
      citys: [],
      salaryColumns2 : []
    }
  },
  created() {
    this.$route.query._id && this._getJobDetail()
    !this.$route.query._id && this._initSend({})
  },
  methods: {
    async _getJobDetail() {
      let { data } = await getJobDetail({ jobId: this.$route.query._id })
      this._initSend(data)
      let _index = this.salaryColumns.findIndex(v => { return v.key === data.minSalary })
      this.salaryColumns2 = this.salaryColumns.slice(_index)
    },
    _initSend(data) {
      this.sendForm = {
        companyId: this.$route.query._id ? data.companyId._id : this.$store.getters.userInfo.companyId,
        publisherId: this.$route.query._id ? data.publisherId._id : this.$store.getters.userInfo._id,
        jobName: data.jobName || '',
        city: data.city || '',
        minSalary: data.minSalary || '',
        maxSalary: data.maxSalary || '',
        salaryType: data.salaryType || '',
        workExp: data.workExp || '',
        eduLeve: data.eduLeve || '',
        jobTypeId: data.jobTypeId || '',
        exactAddress: data.exactAddress || {},
        detail: data.detail || ''
      }
      this._getCity()
      this._getJobTypes()
    },
    async _getCity() {
      let { data } = await getCitys()
      this.citys = data.provinces
      if (this.$route.query._id) {
        let _province = this.citys.map(v => {
          if (v.citys.filter(c => { return c.name === this.sendForm.city }).length) return v
        })
        _province.map(v => {
          if (v) this.jobCity = [v.name, this.sendForm.city]
        })
      }
    },
    async _getJobTypes() {
      let { data } = await getJobTypes()
      this.jobTypes = data
      if (this.$route.query._id) {
        let parentId = this.jobTypes.map(v => {
          if (v.childTypes.filter(c => { return c._id === this.sendForm.jobTypeId }).length) return v
        })
        parentId.map(v => {
          if(v) this.jobType = [v._id, this.sendForm.jobTypeId]
        })
      }
    },
    choosedMin(val) {
      let index = this.salaryColumns.findIndex(v => { return v.key == val })
      if (index === 0) {
        this.salaryColumns2 = this.salaryColumns2.concat(this.salaryColumns[0])
        this.sendForm.maxSalary = 0
      } else {
        this.salaryColumns2 = this.salaryColumns.slice(index + 1)
        this.sendForm.maxSalary = ''
      }
    },
    cityChange(val) {
      this.sendForm.city = val[1]
    },
    jobTypeChange(val) {
      this.sendForm.jobTypeId = val[1]
    },
    async useComLoc() {
      let { data } = await getComInfo({ _id: this.$store.getters.userInfo.companyId })
      this.sendForm.exactAddress = {
        name: data.companyAdress.fullAddress,
        lat: data.companyAdress.latlng.latitude,
        lng: data.companyAdress.latlng.longitude
      }
    },
    confirmAddress(data) {
      this.sendForm.exactAddress = {
        name: data.address,
        lat: data.location.lat,
        lng: data.location.lng
      }
      this.mapDialog = false
    },
    async commit() {
      const valid = await this.$refs["sendForm"].validate();
      if (!valid) return
      this.$route.query._id && (this.sendForm.jobId = this.$route.query._id)
      addJob(this.sendForm).then(res => {
        this.$tool.messageSuccess('新增职位成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.formSe {
  display: flex;
  flex-wrap: wrap;
  background-color: #f9f9f9;
  /deep/ .el-form-item__content {
    width: 60%;
  }
  /deep/ .el-input {
    width: 100%
  }
  /deep/ .el-select, /deep/ .el-cascader {
    width: 100%;
  }
  .salary {
    /deep/ .el-select {
      width: 36% !important;
      .el-input {
        width: 100%;
      }
    }
  }
}
.posRT {
  top: 30px;
  right: 20px;
}
.flex1 {
  width: 50%;
}

.map-contianer {
  /deep/ .el-dialog {
    margin-top: 10vh !important;
    width: 100%;
  }
}
.w100 {
  width: 100%;
  /deep/ .el-form-item__content {
    width: 80%;
  }
}
</style>