<template>
  <div>
    <div>
      职位类型：
      <el-cascader
          v-model="jobType"
          :options="jobTypes"
          :show-all-levels="false"
          clearable
          class="p_20R"
          :props="{ label: 'childTypeName', children: 'childTypes', value: '_id' }"
          @change="jobTypeChange"
        >
          <template slot-scope="{ node, data }">
            <span>{{ data.typeName }}</span>
            <span v-if="!node.isLeaf"> ({{ data.childTypes.length }}) </span>
            <span v-if="node.isLeaf">{{ data.childTypeName }}</span>
          </template>
        </el-cascader>
        起止日期：
        <el-date-picker
          v-model="filterDate"
          @change="chooseDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
    </div>
    <el-table
      :data="records"
      style="width: 100%; margin-top: 30px"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="头像"
        align="center"
        width="80">
        <template slot-scope="scope">
          <img class="head-img" :src="scope.row.user.avatarUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="姓名">
        <template slot-scope="scope">
          {{scope.row.user.nickName}}
        </template>
      </el-table-column>
      <el-table-column
        label="职位名称">
        <template slot-scope="scope">
          {{scope.row.job.jobName}}
        </template>
      </el-table-column>
      <el-table-column
        label="学历">
        <template slot-scope="scope">
          <span v-if="scope.row.user.eduLeve">{{scope.row.user.eduLeve === '学历不限' ? '暂无' : scope.row.user.eduLeve}}</span>
          <span v-else>暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="工作经验">
        <template slot-scope="scope">
          <span v-if="scope.row.user.workExp">{{scope.row.user.workExp === '经验不限' ? '暂无' : scope.row.user.workExp}}</span>
          <span v-else>暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="简历状态">
        <template slot-scope="scope">
          <span v-if="scope.row.deliveryType == '0'" class="color99">{{'未读'}}</span>
          <span v-if="scope.row.deliveryType == '1'" class="colorBl">{{'已读'}}</span>
          <span v-if="scope.row.deliveryType == '2'" class="colorLs">{{'已通过'}}</span>
          <span v-if="scope.row.deliveryType == '3'" class="colorFe">{{'未通过'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投递日期">
        <template slot-scope="scope">
          {{scope.row.creatTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toDetail(scope.row._id)">查看</el-button>
          <el-button type="info" size="mini" @click="previewResume(scope.row)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog fullscreen :visible.sync="showDialog">
      <preview v-if="showDialog && delivery" :delivery="delivery" @closeAndRefresh="closeAndRefresh"></preview>
    </el-dialog>
    <paginationSe
      :pageData="sendData"
      class="m_20T"
      :total="total"
      @currentChange="_getPageList()"
      @sizeChange="_getPageList(1)"
    />
  </div>
</template>

<script>
import { getDeliveryList } from '@/api'
import { getJobTypes } from '@/api/common'
import mixinPage from '../../mixin/mixinByPage' 
import preview from './components/preview'
export default {
  mixins: [mixinPage],
  components: {
    preview
  },
  data() {
    return {
      jobType: [],
      jobTypes: [],
      filterDate: '',
      showDialog: false,
      delivery: '',
      sendData: {
        current: 1,
        size: 10,
        jobType: '',
        startTime: '',
        endTime: '',
        companyId: this.$store.getters.userInfo.companyId
      },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },
  created() {
    this._getPageList()
    this._getJobTypes()
  },
  methods: {
    _getPageList(current) {
      if (!this.sendData.companyId) return this.$tool.message('请先到<公司信息管理>中创建一个公司')
      this.getPageList(current, getDeliveryList)
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
    jobTypeChange(val) {
      this.sendData.jobType = val[1]
      this._getPageList(this.sendData.current)
    },
    chooseDate(val) {
      if (val) {
        this.sendData.startTime = val[0].getTime()
        this.sendData.endTime = val[1].getTime()
        this._getPageList(this.sendData.current)
      } else {
        this.sendData.startTime = ''
        this.sendData.endTime = ''
        this._getPageList(this.sendData.current)
      }
    },
    toDetail(id) {
      
    },
    previewResume(item) {
      this.delivery = item
      this.showDialog = true
    },
    downLoadResume() {
      window.open('http://at.maguaxie.cn/简历-谢龙山.pdf')
    },
    closeAndRefresh() {
      this._getPageList()
      this.showDialog = false
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
/deep/ .el-table .warning-row {
  background: oldlace
}

/deep/ .el-table .success-row {
  background: #f0f9eb
}
.head-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
/deep/ .el-dialog__body {
  height: 90%;
}
</style>