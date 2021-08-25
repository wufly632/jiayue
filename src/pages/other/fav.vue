<template>
  <div class="fav-main">
    <backtopbar text="收藏列表" />

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
            <div class="close" @click.prevent="handleFav(productItem.id)"><i class="iconfont">&#xe60b;</i></div>
            <img v-lazy="productItem.mainPicture && productItem.mainPicture.ossimg()" />
          </div>
          <div class="text">
            <div class="title">{{ productItem.productModel }}</div>
            <div class="sub-title">{{ productItem.materialChangeAble ? '材质可换' : '' }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import vLogin from 'mixins/validateLogin'
export default {
  data() {
    return {
      // 产品
      productData: {}
    }
  },
  mixins: [vLogin],
  created() {
    this.getFavList()
  },
  methods: {
    handleFav(productId) {
      this.request('Fave', {
        productId,
      }).then(res => {
        const { code } = res
        if (code === 20000) {
          this.getFavList()
        }
      }, err => {
        this.$Toast(err)
      })
    },
    getFavList() {
      // 登录验证
      if (!this.validateLogin()) return 

      this.$Indicator.open()
      this.request('FaveList', {}).then(res => {
        const { code, data } = res
        if (code === 20000 && data) {
          this.productData = data
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.fav-main {
  .products-category {
    padding: 30/@rem;

    .title-main {
      margin-bottom: 30/@rem;
      font-size: 30/@rem;
    }
    .product-list {
      display: flex;
      flex-wrap: wrap;
      .close {
        cursor: pointer;
        position: absolute;
        right: -10/@rem;
        top: -10/@rem;
        color: #fff;
        .wh(38, 38);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        .flex-center();
      }
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
}
</style>