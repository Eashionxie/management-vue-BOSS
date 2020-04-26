<template>
  <div class="full">
    <div ref="Tmap" class="container"></div>
    <div
      v-if="address && address.formatted_addresses"
      class="p_30T text m_20L">
      <span class="bor_B p_10B dIb">当前选择：{{address.formatted_addresses.recommend}}</span>
      <el-button class="m_30L" type="primary" size="middle" @click="commit">确定选择</el-button>
    </div>
  </div>
</template>

<script>
import { coordinate2Address } from '@/api/common'

export default {
  props: ['position'],
  data() {
    return {
      map: '',
      marker: '',
      address: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let center = new qq.maps.LatLng(39.916527,116.397128)
      this.map = await new qq.maps.Map(this.$refs.Tmap, {
        zoom: this.position ? 16 : 10,
        center: center
      })
      if (!this.position) {
        let citylocation = new qq.maps.CityService({
          complete: async result => {
            this.map.setCenter(result.detail.latLng)
            center = new qq.maps.LatLng(result.detail.latLng.lat,result.detail.latLng.lng)
            new qq.maps.Marker({ position: center, map: this.map })
            let { data } = await coordinate2Address({ location: `${result.detail.latLng.lat},${result.detail.latLng.lng}` })
            this.address = data
          }
        })
        //调用searchLocalCity();方法    根据用户IP查询城市信息。
        citylocation.searchLocalCity() 
      } else {
        let _center = new qq.maps.LatLng(this.position.latitude, this.position.longitude)
        this.map.setCenter(_center)
        new qq.maps.Marker({ position: _center, map: this.map })
        let { data } = await coordinate2Address({ location: `${this.position.latitude},${this.position.longitude}` })
        this.address = data
      }
      qq.maps.event.addListener(this.map, 'click', async (event) => {
        let { data } = await coordinate2Address({ location: `${event.latLng.getLat()},${event.latLng.getLng()}` })
        this.address = data
      })
    },
    commit() {
      this.$emit('commit', this.address)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
.container {
  width: 100%;
  height: 60vh;
}
.text {
  font-size: 20px;
  font-weight: 500;
}
</style>