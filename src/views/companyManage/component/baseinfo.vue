<template>
  <div>
    <div class="flexHfs head">
      <img :src="comInfo.companyAvatar" alt="">
      <div class="p_20L lh30">
        <p class="font24 font5w">{{comInfo.companyName}}</p>
        <p>{{comInfo.companyShortDuce}}</p>
      </div>
    </div>

    <div class="flexHfs bor_B p_30B">
      <div>
        <span>公司规模：</span>
        <span>{{comInfo.companySize | sizeFilter}}</span>
      </div>
      <div class="m_30L">
        <span>融资状况：</span>
        <span>{{comInfo.financingType | financeFilter}}</span>
      </div>
      <el-button class="edit-btn" @click="editBaseInfo">编辑</el-button>
    </div>

    <div class="m_30T poR">
      <el-button class="edit-btn2" @click="editMore">编辑</el-button>

      <div>
        <p>公司福利：</p>
        <div class="p_10TB" v-if="comInfo.welfares && comInfo.welfares.length">
          <span class="welfare" v-for="(item, index) in comInfo.welfares" :key="index">
            {{item}}
            <span v-if="index<comInfo.welfares.length - 1">、</span>
          </span>
        </div>
        <div v-else class="p_10TB">暂无</div>
      </div>

      <div class="m_10T">
        <p>注册信息</p>
        <div class="flexHfs p_10TB">
          <span>
            <span>成立时间：</span>
            <span v-if="comInfo.established">{{comInfo.established | formatDate}}</span>
            <span v-else>未知</span>
          </span>
          <span class="m_30L">
            <span>注册资金：</span>
            <span v-if="comInfo.registeredCapital">{{comInfo.registeredCapital}}万元</span>
            <span v-else>未知</span>
          </span>
          <span class="m_30L">
            <span>法人代表：</span>
            <span v-if="comInfo.legalRepresentative">{{comInfo.legalRepresentative}}</span>
            <span v-else>未知</span>
          </span>
        </div>
      </div>

      <div class="m_10T">
        <p>公司网站</p>
        <div class="p_10TB">
          {{comInfo.officeWeb || '未知'}}
        </div>
      </div>

      <div class="m_10T">
        <p><span v-if="!comInfo.companyAdress" class="colorFe">！</span>公司地址</p>
        <div class="p_10TB" v-if="comInfo && comInfo.companyAdress">
          <div>
            <span>{{comInfo.companyAdress.addressName}}</span>
            <span>({{comInfo.companyAdress.fullAddress}})</span>
            <el-button class="font12 m_20L" type="info" size="mini" @click="getLocation">修改</el-button>
          </div>
        </div>
        <div v-else class="p_10TB">
          <el-button class="font12" type="primary" size="mini" icon="el-icon-add-location" @click="getLocation">点击获取地址</el-button>
        </div>
      </div>

      <div class="m_30T p_20T bor_T">
        <p>公司相册</p>
        <div class="w100 flexHfs image-contianer">
          <div
            class="imgs"
            v-for="(item, index) in comInfo.companyAlbum"
            :key="index"
            @mouseenter="enterImage(index)"
            @mouseleave="leaveImage">
            <img :src="item.url" alt="">
            <div v-show="hoverIndex === index" class="hoverStyle flexHc">
              <i class="iconfont icon-yulan" @click="showImage(item, index)"></i>
              <i class="iconfont icon-shanchu" @click="deleteImage(item, index)"></i>
            </div>
          </div>
          <uploadOne class="head-upload" :uploadData="authData" @onSuccess="uploadSuccess"></uploadOne>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="imageDialog" title="预览图片" width="800px">
      <img class="w100" :src="previewPath" alt="">
    </el-dialog>
    <el-dialog class="map-contianer" :title="comInfo.companyAdress ? '修改地址' : '新增地址'" :visible.sync="mapDialog">
      <Tmap
        v-if="mapDialog"
        :position="comInfo.companyAdress ? comInfo.companyAdress.latlng : ''"
        @commit="confirmAddress"
      ></Tmap>
    </el-dialog>
  </div>
</template>

<script>
import { addAlbumImg, delAlbumImg, addCompany } from '@/api'
export default {
  props: ['comInfo'],
  data () {
    return {
      hoverIndex: -1,
      imageDialog: false,
      mapDialog: false,
      previewPath: '',
      addressSend: {
        addressName: '',
        fullAddress: '',
        shortAddress: '',
        latlng: { latitude: '', longitude: '' },
        country: '',
        province: '',
        city: '',
        area: '',
        street: '',
        No: ''
      },
      authData: { openid: this.$tool.localGet('token') },
    }
  },
  methods: {
    editBaseInfo () {
      this.$parent.addCom()
    },
    editMore () {
      this.$parent.dialogVisible = true
    },
    getLocation () {
      this.mapDialog = true
    },
    enterImage(index) {
      this.hoverIndex != index && (this.hoverIndex = index)
    },
    uploadSuccess(list) {
      addAlbumImg({
        _id: this.comInfo._id,
        url: this.$tool.download.img(list[list.length - 1].response.data)
      }).then(res => {
        this.$emit('update:comInfo', res.data)
      }).catch(err => {
        this.$tool.messageErr('添加失败')
      })
    },
    leaveImage() {
      this.hoverIndex = -1
    },
    showImage(item, index) {
      this.previewPath = item.url
      this.imageDialog = true
    },
    async deleteImage(item, index) {
      let { data } = await delAlbumImg({ comId: this.comInfo._id, _id: item._id })
      .catch(err => {
        this.$tool.messageErr('删除失败')
      })
      this.$emit('update:comInfo', data) 
    },
    confirmAddress(data) {
      this.addressSend = {
        addressName: data.formatted_addresses.recommend,
        fullAddress: data.address,
        shortAddress: data.address_component.street_number,
        latlng: { latitude: data.location.lat, longitude: data.location.lng },
        country: data.address_component.nation,
        province: data.address_component.province,
        city: data.address_component.city,
        area: data.address_component.district,
        street: data.address_component.street,
        No: data.address_component.street_number
      }
      addCompany({ _id: this.comInfo._id, companyAdress: this.addressSend }).then(res => {
        this.$emit('update:comInfo', res.data)
        this.mapDialog = false
      })
    }
  },
  filters: {
    sizeFilter(val) {
      if (!val && val != 0) return '未知'
      if (val == 0) return '0-19人'
      if (val == 1) return '20-99人'
      if (val == 2) return '100-499人'
      if (val == 3) return '500-999人'
      if (val == 4) return '1000-9999人'
      if (val == 5) return '10000人以上'
    },
    financeFilter(val) {
      if (!val && val != 0) return '未知'
      if (val == 0) return '不需要融资'
      if (val == 1) return '未融资'
      if (val == 2) return 'A轮'
      if (val == 3) return 'B轮'
      if (val == 4) return 'C轮'
      if (val == 5) return 'D轮及以上'
      if (val == 6) return '已上市'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.head {
  height: 80px;
  line-height: 80px;
  width: 100%;
  flex-wrap: nowrap;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.edit-btn {
  position: absolute;
  top: 30px;
  right: 40px;
}
.edit-btn2 {
  position: absolute;
  top: 0;
  right: 0;
}

.welfare {

}

.image-contianer {
  flex-wrap: nowrap !important;
  overflow-x: scroll;
}

.map-contianer {
  /deep/ .el-dialog {
    margin-top: 10vh !important;
    width: 80%;
  }
}

/* 滚动条 整体 */
.image-contianer::-webkit-scrollbar {
  width: 1px; // 高宽分别对应横竖滚动条的尺寸
  height: 8px;
}

/* 滚动条 滑块 */
.image-contianer::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: rgba(8, 252, 254, 0.7);
}

/* 滚动条 轨道 */
.image-contianer::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgb(96, 126, 239);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}

.head-upload {
  width: 80px;
  height: 80px !important;
  line-height: 88px;
  padding: 0 !important;
  background-color: #efefef;
}

.imgs, .head-upload {
  position: relative;
  height: 80px;
  margin: 10px 10px 10px 0;
  border-radius: 5px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
}

.hoverStyle {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  text-align: center;
  padding: 0 8px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, .5);
  i {
    font-size: 20px !important;
    width: 50%;
    color: #999999;
  }
}
.icon-yulan:hover {
  cursor: pointer;
  color: #fff;
}
.icon-shanchu:hover {
  cursor: pointer;
  color: #fff;
}
</style>