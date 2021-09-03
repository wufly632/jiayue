<template>
  <div class="home-main">
    <div class="category-list">
      <router-link 
        v-for="(item, index) in stylesData"
        :key="index"
        :to="{ path: '/category/' + item.id  }">
        <img :src="item.bigPicture && item.bigPicture.ossimg()" />
      </router-link>
    </div>
  </div>
</template>

<script>
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
  mounted() {},
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


