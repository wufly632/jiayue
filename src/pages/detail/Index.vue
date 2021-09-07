<template>
  <div class="detail-main">
    <div class="share-icon" @click="isShowShare = false" v-show="isShowShare">
      <div class="icon">
        <i class="iconfont">&#xe640;</i>
         <div>去分享&nbsp;&nbsp;</div>
      </div>
    </div>
    <div class="detail-top-bar">
      <div class="detail-top-bar-center">
        <div class="back" @click="()=> { this.$router.go(-1) }">
          <i class="iconfont">&#xe62f;</i>
        </div>
        <div class="share" @click="handleShare" :data-clipboard-text="wurl">
          <i class="iconfont">&#xe617;</i>
        </div>
      </div>
    </div>

    <div class="detail-swipe">
      <Swipe class="my-swipe img-swipe" :showIndicators="false" :showNum="true">
        <SwipeItem v-for="(img, index) in productData.pictures" :key="index">
          <img :src="img && img.formatOssimg(400)" :preview="index">
        </SwipeItem>
      </Swipe>
    </div>

    <div class="detail-goods mb18" >
      <div class="icon-fav" @click="handleFav">
        <img v-if="!productData.hasFollowed" src="../../images/icon_add_fav.png" />
        <img v-else src="../../images/icon_faved.png" />
      </div>
      
      <div class="title f-b">{{ productData.productModel }}</div>
      <div class="sub-title">{{ productData.materialChangeAble ? '材质可换' : '' }}</div>
    </div>

    <div class="detail-imagelist" v-if="productData.pictures">
      <div class="title">产品详情</div>
      <img v-for="(item,index) in productData.detailPictures" :key="index" :preview="index" v-lazy="item && item.formatOssimg(400)"/>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'components/swipe'
import vLogin from 'mixins/validateLogin'
import { share, isWechat } from 'utils/share'

export default {
  components: {
    Swipe,
    SwipeItem,
  },
  mixins: [vLogin],
  data () {
    return {
      productData: {},
      wurl: window.location.href,
      isShowShare: false,
    }
  },
  created () {
    this.getDetailData()
  },
  mounted () {
    
  },
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
      // this.$Indicator.open()
      this.request('ProductDetail', {
        // id: this.$route.params.id || ''
      }, '/' + this.$route.params.id).then(res => {
        const { code, data } = res
        if (code === 20000 && data) {
          this.productData = data
          // 微信分享
          share({
            that: this,
            title: 'Inside co 迦悦生活',
            content: this.productData.productModel,
            shareImage: this.productData.pictures[0],
          })
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },

    resetData() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.productData = {}
    },

    // handlePageBack() {
    //   this.$router.go(-1)
    // },
    handleFav() {
      // 登录验证
      if (!this.validateLogin()) return 

      this.request('Fave', {
        productId: this.productData.id
      }).then(res => {
        const { code, data } = res
        if (code === 20000) {
          this.productData.hasFollowed = !this.productData.hasFollowed
        }
      }, err => {
        this.$Toast(err)
      })
    },

    handleShare() {
      let isWec = isWechat()
      if (isWec) {
        this.isShowShare = true
      } else {
        this.handleCopy()
        setTimeout(() => {
          window.open('weixin://')
        }, 1500)
      }
    },
    handleCopy() {
      let self = this
      let clipboard = new this.clipboard('.share')
      clipboard.on('success', function() {
        self.$Toast('已复制链接，去微信分享给好友')
      });
      clipboard.on('error', function() {
        // self.$Toast('复制失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";

.detail-main {
  position: relative;

  .share-icon {
    position: fixed;
    z-index: 10;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    color: #fff;
    .icon {
      position: absolute;
      right: 0;
    }
    i {
      font-size: .8rem;
    }
    > div {
      font-size: .28rem;
    }
  }

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
      right: 50/@rem;
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
