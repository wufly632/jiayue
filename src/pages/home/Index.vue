<template>
  <div class="home-main">
    <div class="category-list">
      <router-link 
        v-for="(item, index) in stylesData"
        :key="index"
        :to="{ path: '/category/' + item.id  }">
        <img :src="item.bigPicture && item.bigPicture.formatOssimg(750)" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { share } from 'utils/share'
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  watch: {},
  computed: mapState({
    stylesData: state => state.styles.stylesData
  }),
  mounted() {
    // 微信分享
    share({
      that: this,
      title: 'Inside co 迦悦生活',
      content: 'Inside co 迦悦生活 首页',
      shareImage: 'https://wufly.oss-cn-hangzhou.aliyuncs.com/jiayue/logo_wechat.png',
    })
  },
  methods: {},
  destroyed() {}
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.home-main {
  .category-list {
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>


