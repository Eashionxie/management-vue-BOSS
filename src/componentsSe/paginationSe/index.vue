<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :current-page.sync="pageData.current"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-size.sync="pageData.size"
    :total="total"
    @current-change="$emit('currentChange')"
    @size-change="$emit('sizeChange')">
  </el-pagination>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'paginationSe',
    props: ['pageData', 'total'],
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
