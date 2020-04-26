<template>
  <el-upload
    ref="upload"
    class="avatar-uploader dIb"
    :action="$tool.upload.img()"
    :disabled="disabled"
    :data="uploadData"
    :show-file-list="false"
    :multiple="false"
    :on-success="onSuccess"
    :on-error="onError">
    <img v-if="showUrl" class="avatar" :src="showUrl">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <!-- <img class="avatar" src="../../imgs/loginBg.png" alt=""> -->
  </el-upload>
</template>

<script type="text/ecmascript-6">
  import mixinByUpload from '@/mixin/mixinByUpload'

  export default {
    name: 'uploadOne',
    props: ['showUrl'],
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
  .avatar-uploader .el-upload {
    // border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    // width: 150px;
    // height: 150px;
    // line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
