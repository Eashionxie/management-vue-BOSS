<template>
  <span>
    <a :href="$tool.download.template(uploadData.typeName)">
      <el-button type="primary" icon="el-icon-download">模板</el-button>
    </a>
    <el-upload
      ref="upload"
      class="dIb"
      :action="$tool.upload.template(uploadData.typeName)"
      :disabled="disabled"
      :data="uploadData"
      :show-file-list="false"
      :multiple="false"
      :on-success="onSuccess"
      :on-error="onError">
       <el-button type="primary" icon="el-icon-upload">导入</el-button>
    </el-upload>
  </span>
</template>

<script type="text/ecmascript-6">
  import mixinByUpload from '@/mixin/mixinByUpload'

  export default {
    name: 'uploadTemBtn',
    mixins: [mixinByUpload],
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
