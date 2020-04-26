<template>
  <el-upload
    ref="upload"
    drag
    :action="$tool.upload.img()"
    :disabled="disabled"
    :data="uploadData"
    :file-list="fileList"
    :multiple="false"
    :on-success="onSuccess"
    :on-error="onError"
    :on-preview="onPreview">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <el-dialog
      class="dialogSe"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :width="dialogWidth">
      <img v-if="fileUrl" class="w100" :src="fileUrl"/>
    </el-dialog>
  </el-upload>
</template>

<script type="text/ecmascript-6">
  import mixinByUpload from '@/mixin/mixinByUpload'

  export default {
    name: 'uploadList',
    props: ['fileList'],
    mixins: [mixinByUpload],
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .el-upload {
    width: 100%;
  }

  .el-upload-dragger {
    width: 100%;
  }
</style>
