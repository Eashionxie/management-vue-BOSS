<template>
  <div>
    <el-button v-if="sendData.companyId && sendData.companyId != ''" type="primary" @click="addJob">添加职位</el-button>
    <el-table
      :data="records"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="jobName"
        label="职位名称">
      </el-table-column>
      <el-table-column
        prop="city"
        width="80"
        label="所在城市">
      </el-table-column>
      <el-table-column
        width="100"
        label="薪资待遇">
        <template slot-scope="scope">
          {{scope.row.minSalary + 'k' + '-' + scope.row.maxSalary + 'k'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="workExp"
        width="120"
        label="工作经验">
      </el-table-column>
      <el-table-column
        prop="eduLeve"
        width="100"
        label="学历要求">
      </el-table-column>
      <el-table-column
        label="发布日期">
        <template slot-scope="scope">
          {{scope.row.creatTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="发布人">
        <template slot-scope="scope">
          {{scope.row.publisherId.nickName}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteJob(scope.row._id)">删除</el-button>
          <el-button type="info" size="mini" @click="editJob(scope.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import { getJobList, delJob } from '@/api'
import mixinPage from '../../mixin/mixinByPage' 
export default {
  mixins: [mixinPage],
  data() {
    return {
      sendData: {
        current: 1,
        size: 10,
        companyId: this.$store.getters.userInfo.companyId
      }
    }
  },
  created() {
    this._getPageList()
  },
  methods: {
    _getPageList(current) {
      if (!this.sendData.companyId) return this.$tool.message('请先到<公司信息管理>中创建一个公司')
      this.getPageList(current, getJobList)
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return ''
    },
    addJob() {
      this.$router.push({ name: 'modifyJob' })
    },
    deleteJob(id) {
      delJob({ _id: id }).then(res => {
        this.$tool.messageSuccess('删除成功')
        this._getPageList()
      })
    },
    editJob(id) {
      this.$router.push({ name: 'modifyJob', query: { _id: id } })
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
</style>