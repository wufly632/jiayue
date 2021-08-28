<template>
  <div class="address-main">
    <p @click="isShowAddressModal = true" class="address">
      <span>地址：浙江省杭州市萧山区科创中心</span>
      <i class="iconfont a-breathing">&#xe61e;</i>
    </p>
    <p>Tel.0570-88888888</p>
    <!--接入百度地图-->
    <baidu-map 
      ak="65tosCDVrGImO5wpyGNFsu37a2yL5OGp" 
      :center="center" 
      :zoom="16"
      :scroll-wheel-zoom="true"
      class="map">
      <bm-navigation ></bm-navigation>
      <bm-marker :position="center" :dragging="true" @click="show = true">
        <bm-info-window :show="show" @close="show = false" @open="show = true" style="font-size:13px">
          杭州迦悦<br><br>
          地址：杭州市萧山区科创中心A座7楼
        </bm-info-window>
      </bm-marker> 
    </baidu-map>

    <!-- modal -->
    <div class="address-modal" v-if="isShowAddressModal" @click="isShowAddressModal = false">
      <div class="modal-content a-fadeinB" @click.stop="isShowAddressModal = true">
        <div class="address-status">高德地图</div>
        <div class="address-status">百度地图</div>
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
      center: {lng: 120.271566,lat: 30.192656}, //经纬度
      show: false,
      isShowAddressModal: false,
    }
  },
  mounted () {
    
  },
  methods: {
    // handleAddress() {
    //   this.isShowAddressModal = !this.isShowAddressModal
    // }
  },
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.address-main {
  padding: 30/@rem;
  .address {
    cursor: pointer;
    // text-decoration: underline;
    .flex-between();
    i {
      font-size: 32/@rem;
    }
  }
  p {
    font-size: 28/@rem;
    line-height: 50/@rem;
  }
  .map {
    margin-top: 10/@rem;
    height: 500/@rem;
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
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
      .hl(100, 100);
      text-align: center;
    }
  }
}
</style>