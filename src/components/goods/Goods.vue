<template>
  <div class="goods-main mt16" v-if="params.length">
    <div class="goods-list">
      <router-link 
        class="goods-link" 
        v-for="(item, index) in params"
        :key="index"
        :to="{ path: '/detail/' + item.productId }">
        <div 
          class="goods-img"
          :class="{'fav-active': item.isFave}">
          <img v-lazy="item.mainPicture && item.mainPicture.formatOssimg(200)"/>
          <div class="img-active"></div>
          <div class="activity-img" v-if="item.sellingPrice && percentage(item.comparePrice - item.sellingPrice, item.comparePrice)">
            <div class="word" >-{{ percentage(item.comparePrice - item.sellingPrice, item.comparePrice) }}%</div>
          </div>

          <div class="fav" v-if="isShowFav" @click.prevent="(e) => handleFav(e, item.productId)">
            <div class="i-fav"></div>
          </div>
        </div>
        <div class="goods-desc">
          <p class="title">{{ item.title }}</p>
          <div class="price">
            <div class="current-price">{{ currencyUnit }}{{ toThousands(item.sellingPrice) }}</div>
            <div class="original-price">{{ currencyUnit }}{{ toThousands(item.comparePrice) }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { addClass } from '../swipe/addClass'
import { removeClass } from '../swipe/removeClass'

export default {
  props: {
    // 数据
    params: {
      type: Array,
      default: []
    },
    isShowFav: false
  },
  methods: {
    handleFav(e, productId) {
      // e.preventDefault()
      e.stopPropagation()
      this.$Indicator.open()

      this.request('ProductFave', {
        productId,
      }).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { isFave } = data
          const el = e.target
          const elSlosest = el.closest('.goods-img')
          
          if (isFave) {
            addClass(elSlosest, 'fav-active')
            // 埋点
            window.fbq && fbq('track', 'AddToWishlist', { productId })
          } else {
            removeClass(elSlosest, 'fav-active')
          }
        }
        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";
.goods-main {
  width: 100%;
  padding: 24/@rem;
  
  .bgc-w();
  .goods-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .goods-link {
      display: block;
      width: 330/@rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
    .goods-img {
      position: relative;
      background: #FFFFFF;
      img {
        display: block;
        .wh(330, 330);
      }
      .img-active {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: rgba(0, 0, 0, 0.3);
        transition: all .4s;
      }
      .activity-img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        .wh(84, 42);
        // background: url(../../images/home/home_tag.png) no-repeat;
        background-size: 100% auto;
        
        .word {
          color: #fff;
          .f-scale();
          width: 90/@rem;
          text-align: center;
          padding-top: 4/@rem;
        }
      }

      .fav {
        position: absolute;
        z-index: 2;
        bottom: 16/@rem;
        right: 16/@rem;

        .wh(56, 56);
        background: rgba(255, 255, 255, 0.64);
        .flex-center();
        border-radius: 50%;

        .i-fav {
          transition: all .4s;
          .wh(28, 26);
          background: url(../../images/category/i_fav.png) no-repeat;
          background-size: 100% auto;
        }
      }

      &.fav-active {
        .fav .i-fav {
          background: url(../../images/category/i_fav_fill.png) no-repeat;
          background-size: 100% auto;
        }
      }
    }

    .goods-link:active {
      .img-active {
        opacity: 1;
      }
    }

    .goods-desc {
      padding: 16/@rem 0;
      .title {
        margin-bottom: 8/@rem;
        // text-align: center;
        font-size: 24/@rem;
        .line1();
      }
      .price {
        display: flex;
        align-items: flex-end;
        .hl(32, 32);
        .current-price {
          font-size: 32/@rem;
          font-weight: bold;
          color: @red;
          margin-right: 8/@rem;
        }
        .original-price {
          text-decoration: line-through;
          color: @w24-color;
        }
      }
    }
  }
}
</style>
