<template>
  <div class="detail-main">
    <div class="detail-top-bar">
      <div class="detail-top-bar-center">
        <div class="back" @click="()=> { this.$router.go(-1) }">
          <i class="iconfont">&#xe62f;</i>
        </div>
        <router-link to="/share" class="share">
          <i class="iconfont">&#xe617;</i>
        </router-link>
      </div>
    </div>

    <div class="detail-swipe">
      <Swipe class="my-swipe img-swipe" :showIndicators="false" :showNum="true">
        <SwipeItem v-for="(img, index) in imgSwipe" :key="index">
          <img :src="img && img.formatOssimg(400)">
        </SwipeItem>
      </Swipe>
    </div>

    <div class="detail-goods mb18" >
      <div class="icon-fav" @click="handleFav">
        <img v-if="!isFav" src="../../images/icon_add_fav.png" />
        <img v-else src="../../images/icon_faved.png" />
      </div>
      
      <div class="title f-b">SM-TV07 </div>
      <div class="sub-title">Sideboards</div>
    </div>

    <div class="detail-imagelist" v-if="goodsData.imageList">
      <div class="title">产品详情</div>
      <img v-for="(item,index) in goodsData.imageList" :key="index" v-lazy="item && item.formatOssimg(400)"/>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'components/swipe'

export default {
  props: {},
  components: {
    Swipe,
    SwipeItem,
  },
  data () {
    return {
      goodsData: {},
      imgSwipe: [], // 大图
      isFav: false, // 收藏
    }
  },
  created () {
    this.getDetailData()
  },
  mounted () {},
  watch: {
    '$route.params.id': function(val) {
      if (val) {
        this.resetData()
        this.getDetailData()
      }
    }
  },
  methods: {
    // 获取详情页基础数据
    getDetailData() {
      this.$Indicator.open()

      this.request('ProductDetail', {
        id: this.$route.params.id || ''
      }).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          this.goodsData = data || {}
          this.isFav = this.goodsData.isFave
          this.imgSwipe =  this.goodsData.images
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },

    resetData() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.goodsData = {}
      this.imgSwipe = [] // 大图
      this.isFav = false // 收藏
    },

    // handlePageBack() {
    //   this.$router.go(-1)
    // },
    handleFav() {
      this.isFav = !this.isFav
    },
    
    // 登录校验
    validateLogin() {
      try {
        // 是否存在地址
        let localInfoData = localStorage.getItem('mall_token_info')

        if (!localInfoData) {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          })

          return false
        } else {
          return true
        }
      } catch(e) {
        return false
      }
    },

  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";

.detail-main {
  position: relative;
  .detail-swipe {
    .img-swipe {
      height: 500/@rem;
      img {
        display: block;
        width: 100%;
      }
    }
  }

  .detail-goods {
    position: relative;
    .bgc-w();
    padding: 25/@rem 24/@rem 20/@rem;
    .icon-fav {
      position: absolute;
      top: 40/@rem;
      right: 40/@rem;
      cursor: pointer;
      img {
        .wh(68, 68);
      }
    }
    
    .title {
      width: 100%;
      font-size: 40/@rem;
    }
    .sub-title {
      font-size: 30/@rem;
    }

    &.detail-skeleton {
      height: 166/@rem;
      > div {
        background-color: #ECECEC;
        border-radius: 5/@rem;
      }
      .skeleton1 {
        width: 40%;
        height: 45/@rem;
      }
      .skeleton2 {
        width: 20%;
        height: 28/@rem;
        margin: 5/@rem 0; 
      }
      .skeleton3 {
        width: 80%;
        margin-top: 15/@rem;
        height: 28/@rem;
      }
    }
  }

  // topbar
  .detail-top-bar {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    width: 100%;
    height: 80/@rem;
    
    .detail-top-bar-center {
      position: relative;
      width: 100%;
      margin: 0 auto;
      max-width: 750/@rem;
    }
    
    .back,
    .share {
      position: absolute;
      z-index: 2;
      .whl(60, 60);
      border-radius: 50%;
      top: 24/@rem;
      background-color: @red;
      text-align: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      i {
        font-size: 36/@rem;
      }
    }
    .back {
      left: 30/@rem;
    }
    .share {
      right: 30/@rem;
    }
  }

  .detail-imagelist {
    .title {
      padding: 0 30/@rem;
      font-weight: bold;
      font-size: 32/@rem;
      margin-top: 30/@rem;
    }
    img {
      width: 100%;
    }
  }
}
</style>
