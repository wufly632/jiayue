<template>
  <div class="address-main">
    <p @click="handleMap" class="address">
      <i class="iconfont">&#xe61e;</i>&nbsp;浙江省杭州市萧山区科创中心
    </p>
    <p>Tel.0570-88888888</p>
    <!--接入百度地图-->
    <baidu-map 
      ak="65tosCDVrGImO5wpyGNFsu37a2yL5OGp" 
      :center="center" 
      :zoom="16"
      :scroll-wheel-zoom="true"
      class="map"
      @click="handleMap">
      <bm-navigation ></bm-navigation>
      <bm-marker :position="center" :dragging="true" @click="show = true">
        <bm-info-window :show="show" @close="show = false" @open="show = true" style="font-size:13px">
          杭州迦悦<br><br>
          地址：杭州市萧山区科创中心A座7楼
        </bm-info-window>
      </bm-marker> 
    </baidu-map>
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
    }
  },
  mounted () {
    // this.baiduMap()
  },
  methods: {
    baiduMap() {
      // let marker = new BMap.Marker(point) // 创建标注
      // map.addOverlay(marker)    // 将标注添加到地图中
      // map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
       
      // let point = new BMap.Point( 120.271566, 30.192656) // 创建点坐标
      // map.centerAndZoom(point, 12) // 初始化地图，设置中心点坐标和地图级别
      // let marker = new BMap.Marker(point) // 创建标注
      // map.addOverlay(marker)    // 将标注添加到地图中
      
      // map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      // map.addControl(new BMap.NavigationControl()) // 添加平移缩放控件
      // map.addControl(new BMap.ScaleControl()) // 添加比例尺控件
    },
    // 地图初始化回调
    handleMap({ BMap, map }) {
      console.log(BMap, map)
    }
  },
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.address-main {
  padding: 30/@rem;
  .address {
    cursor: pointer;
    text-decoration: underline;
  }
  p {
    font-size: 28/@rem;
    line-height: 50/@rem;
  }
  .map {
    margin-top: 10/@rem;
    height: 500/@rem;
  }
}
</style>