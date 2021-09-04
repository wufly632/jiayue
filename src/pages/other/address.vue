<template>
  <div class="address-main">
    <div 
      v-for="item in addressInfo"
      :key="item"
      >
      <div v-if="item.content">
        <div @click="handleAddress(item)" class="info address">
          <span>地址：{{ item.content }}</span>
          <i class="iconfont a-breathing">&#xe61e;</i>
        </div>
        <div class="info">
          <div>联系方式：</div><div v-html="contactInfo"></div>
        </div>
        <!--接入百度地图-->
        <baidu-map 
          ak="65tosCDVrGImO5wpyGNFsu37a2yL5OGp" 
          :center="{lng: item.longitude,lat: item.latitude}" 
          :zoom="16"
          :scroll-wheel-zoom="true"
          class="map">
          <bm-navigation ></bm-navigation>
          <bm-marker :position="{lng: item.longitude,lat: item.latitude}" :dragging="true" @click="show = true">
            <bm-info-window :show="show" @close="show = false" @open="show = true" style="font-size:13px">
              {{ item.title }}<br><br>
              地址：{{ item.content }}
            </bm-info-window>
          </bm-marker> 
        </baidu-map>
      </div>
    </div>

    <!-- modal -->
    <div class="address-modal" v-if="isShowAddressModal" @click="isShowAddressModal = false">
      <div class="modal-content a-fadeinB" @click.stop="isShowAddressModal = true">
        <a class="address-status" :href="baiduUrl" target="_blank">百度地图</a>
        <a class="address-status" :href="gaodeUrl" target="_blank">高德地图</a>
      </div>
    </div>
  </div>
</template>

<script>
import { BaiduMap, BmMarker, BmInfoWindow, BmNavigation } from 'vue-baidu-map'

export default {
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmNavigation
  },
  data() {
    return {
      // center: {lng: 120.271566,lat: 30.192656}, //lng经度 lat纬度
      show: false,
      isShowAddressModal: false,
      contactInfo: '',
      addressInfo: '',

      baiduUrl: '',
      gaodeUrl: ''
    }
  },
  created() {
    this.getContactInfo()
    this.getAddressInfo()
  },
  mounted () {},
  methods: {
    getContactInfo() {
      this.request('ContactInfo', {}).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { content } = data
          this.contactInfo = content
        }
      }, err => {
        this.$Toast(err)
      })
    },

    getAddressInfo() {
      this.request('AddressInfo', {}).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { address } = data
          this.addressInfo = address
        }
      }, err => {
        this.$Toast(err)
      })
    },

    handleAddress(item){
      this.isShowAddressModal = true
      this.baiduUrl = `http://api.map.baidu.com/marker?location=${item.latitude},${item.longitude}&title=${item.title}&content=${item.content}&output=html`
      this.gaodeUrl =`https://uri.amap.com/marker?position=${item.longitude},${item.latitude}&name=${item.title}&content=${item.content}&output=html`
    }
  },
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.address-main {
  padding: 30/@rem;
  .info {
    font-size: 28/@rem;
    line-height: 50/@rem;
    display: flex;
  }
  .address {
    .flex-between();
    cursor: pointer;
    i {
      font-size: 32/@rem;
    }
  }
  
  .map {
    margin-top: 10/@rem;
    height: 400/@rem;
    margin-bottom: 50/@rem;
  }
  .address-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    .modal-content {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 200/@rem;
      padding: 0 30/@rem;
      background-color: #fff;
    }
    .address-status {
      display: block;
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
      .hl(100, 100);
      text-align: center;
    }
  }
}
</style>