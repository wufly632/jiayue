<template>
  <div class="home-main">
    <div class="category-list">
      <router-link :to="{ path: '/category/1' }">
        <img src="https://www.tikahome.cn/images/wap/wap3_02.jpg" />
      </router-link>
      <router-link :to="{ path: '/category/2' }">
        <img src="https://www.tikahome.cn/images/wap/wap3_08.jpg" />
      </router-link>
      <router-link :to="{ path: '/category/3' }">
        <img src="https://www.tikahome.cn/images/wap/wap3_04.jpg" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  watch: {},
  mounted() {},
  methods: {
    // 获取页面除推荐列表外的数据
    getHomeData() {
      this.$Indicator.open()
      this.request('Home', {}).then((res) => {
        const { code, data } = res

        if (code === 20000 && data) {
          const { banners, categories, ads } = data
          this.imgSwipe = banners || []
          this.categories = categories || []
          this.ads = ads || []
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },
  },
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


