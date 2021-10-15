<template>
  <div class="category-main">
    <!-- 分类 -->
    <div class="filter-list" @click="()=> {
      this.isShowFilterContent = !this.isShowFilterContent
    }">
      <div>产品分类</div>
      <i class="iconfont" v-if="!isShowFilterContent">&#xe623;</i>
      <i class="iconfont" v-else>&#xe60c;</i>
    </div>
    <ul class="filter-content a-fadeinT-s" v-if="isShowFilterContent">
      <li 
        v-for="(item,index) in productTypes"
        :key="index"
        :class="{'actived': item.id === categoryActiveId}" 
        @click="handleCategory(item)" 
        >
        <span></span>
        <font>{{ item.name }}</font>&nbsp;\&nbsp;{{ item.enName }}
      </li>
    </ul>

    <!-- 产品 -->
    <div 
      class="products-category"
      v-for="(item, index) in productData"
      :key="index">
      <div class="title-main">{{ item.name }} <span>({{ item.products.length }})</span></div>
      <div class="product-list">
        <router-link 
          v-for="(productItem, productIndex) in item.products"
          :key="productIndex"
          :to="{ path: `/detail/${productItem.id}`}" >
          <div class="img">
            <img v-lazy="productItem.mainPicture && productItem.mainPicture.formatOssimg(750)" />
          </div>
          <div class="text">
            <div class="title">{{ productItem.productModel }}</div>
            <div class="sub-title">{{ productItem.name }}</div>
          </div>
        </router-link>
      </div>
    </div>


    <div class="goto-top rotate180" @click="handleToTop" v-if="isShowGotoTop">
      <i class="iconfont">&#xe611;</i>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isShowFilterContent: false,
      isShowGotoTop: false,
      // 分类
      productTypes: [],
      categoryActiveId: -2,

      // 产品
      productData: [],
      productDataAll: []
    }
  },
  computed: {},
  created() {},
  watch: {
    $route: {
      handler: function(route) {
        const { id } = route.params
        if (id) {
          this.getList()
        }
      },
      immediate: true
    }
  },
  created() {
    this.getTpyes()
  },
  mounted() {
    window.addEventListener('scroll', this.scollFunction, true)
  },
  methods: {
    getTpyes() {
      const { id } = route.params
      this.request('ProductTypes', {styleId: this.$route.params.id}).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { types } = data
          this.productTypes = [{
            id: -1,
            name: "全部",
            enName: "All",
            isAll: true
          }].concat(types)
        }
      }, err => {
        this.$Toast(err)
      })
    },
    getList() {
      this.request('ProductList', {
        styleId: this.$route.params.id,
      }).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          this.productData = data
          this.productDataAll = data
        }
      }, err => {
        this.$Toast(err)
      })
    },
    handleCategory(item) {
      this.categoryActiveId = item.id
      this.isShowFilterContent = !this.isShowFilterContent
      // 如果是全部
      if (item.id === -1) {
        this.productData = this.productDataAll
        return
      }

      this.productData = {
        [item.id]: this.productDataAll[item.id]
      }
    },
    scollFunction() {
      let scollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.isShowGotoTop = scollTop > 200 // 回到顶部
    },
    handleToTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scollFunction, true)
  }
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.category-main {
  .filter-list {
    position: relative;
    .flex-between();
    background-color: #f1f1f1;
    align-items: center;
    height: 72/@rem;
    padding: 0 30/@rem;
    font-size: 28/@rem;
    color: rgba(0, 0, 0, 0.6);
    i {
      color: rgba(0, 0, 0, 0.6);
      font-size: 26/@rem;
    }   
  }
  .filter-content {
    display: block;
    font-size: 26/@rem;
    li {
      padding: 0 20/@rem;
      height: 72/@rem;
      background-color: #f9f9f9;
      text-transform: uppercase;
      font-size: 26/@rem;
      display: flex;
      align-items: center;
      position: relative;
      span {
        position: relative;
        display: inline-block;
        margin-right: 24/@rem;
        width: 22/@rem;
        height: 22/@rem;
        background-color: #e5e5e5;
      }
      font {
        color: rgba(0, 0, 0, 0.6);
      }

      &.actived {
        span::after {
          position: absolute;
          top: 4/@rem;
          left: 4/@rem;
          width: 14/@rem;
          height: 14/@rem;
          background-color: #000;
          content: '';
        }
      }
    }
  }
  
  .products-category {
    padding: 30/@rem;

    .title-main {
      margin-bottom: 30/@rem;
      font-size: 30/@rem;
    }
    .product-list {
      display: flex;
      flex-wrap: wrap;
      a {
        width: 50%;
        display: block;
        margin-bottom: 20/@rem;
        padding-right: 10/@rem;
        &:nth-child(2n) {
          padding-left: 10/@rem;
          padding-right: 0;
        }
      }
      .img {
        position: relative;
        height: 240/@rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }
      .text {
        padding: 10/@rem;
        .title {
          .line1();
          font-size: 30/@rem;
          font-weight: bold;
        }
        .sub-title {}
      }
    }
  }

  .goto-top {
    position: fixed;
    right: 0;
    bottom: 130/@rem;
    width: 100/@rem;
    height: 100/@rem;
    border-radius: 50%;
    background-color: #fff;
    .flex-center();
    i {
      font-size: 60/@rem;
      color: #999;
    }
    transition: all .3s;
  }
}
</style>


