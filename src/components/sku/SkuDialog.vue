<template>
  <div class="sku-dialog" v-if="isShow">
    <div class="dialog-content a-fadeinS">
      <div class="goods-info">
        <div @click="handleShowSwipe">
          <img class="big-img" :src="params.productInfo.mainPicture && params.productInfo.mainPicture.ossimg()" />
          <div class="swipe-open">
            <img src="../../images/cart/icon_open.png" />
          </div>
        </div>
        <div class="price">
          <div class="selling-price f-b" v-if="params.productInfo.sellPrice">{{ currencyUnit }}{{ toThousands(params.productInfo.sellPrice) }}</div>
          <div class="compare-pirce" v-if="params.productInfo.comparePrice">{{ currencyUnit }}{{ toThousands(params.productInfo.comparePrice) }}</div>
        </div>
        <div class="title">{{ params.productInfo.title }}</div>
        <img class="i-close" src="../../images/cart/icon_del.png" @click="handleClose" />
      </div>

      <div class="goods-sku-layout">
        <div class="goods-sku">
          <div class="sku-attr">
            <div class="attr-con" v-for="(item, index) in params.styles" :key="index">
              <div class="attr-title f-b">
                {{ item.name }}
                <div class="pos-right" v-if="selectedGoodsStock && index === 0 && selectedGoodsStock <= 10">Stock: {{ selectedGoodsStock }}</div>
              </div>
              <ul class="attr-des">
                <li v-for="(itemVal, $index) in item.values" :key="$index">
                  <a 
                    :class="{'cur': itemVal.cur, 'disabled': itemVal.disabled, 'first-sku': index === 0, 'other-sku': index !== 0}" 
                    href="javascript:;" 
                    @click="handleSku(item, itemVal)">
                    <span v-if="index === 0">
                      <img :src="itemVal.mainPicture && itemVal.mainPicture.ossimg()" />
                    </span>
                    <span v-else>{{ itemVal.name }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="goods-quantity mb30">
          <div class="name f-b">Qty</div>
          <div class="operation">
            <div class="reduce" :class="{'disabeld': selectedGoodsParams.num === 1}" @click="handleReduce"><i class="iconfont">&#xe6cc;</i></div>
            <div class="quantity">{{ selectedGoodsParams.num }}</div>
            <div class="add" :class="{'disabeld': selectedGoodsParams.num === selectedGoodsStock}" @click="handleAdd"><i class="iconfont">&#xe611;</i></div>
          </div>
        </div>
      </div>

    </div>
    <div class="dialog-btn f-b">
      <div class="btn" @click="handleAddToBag">OK</div>
    </div>
    <div class="bg-mask"></div>

    <!-- swipe -->
    <div class="cart-swipe a-fadeinCt" v-if="imgSwipe.length && isShowSwipe">
      <img class="operation-close" src="../../images/cart/icon_close.png" @click="handleCloseSwipe" />
      <Swipe 
        class="my-swipe big-img-swipe" 
        ref="bigImgSwipeRef" 
        :showIndicators="false" 
        :showNum="true" 
        :isCustom="true"
        :nextCallback="nextCallback"
        >
        <SwipeItem 
          v-for="(img, index) in imgSwipe"
          :key="index">
          <div class="flex-center">
            <img :src="img && img.ossimg()">
          </div>
        </SwipeItem>
      </Swipe>

      <div class="icon-images">
        <div 
           v-for="(img, index) in imgSwipe" 
          :key="index"
          class="icon-border"
          :class="{'active': iconImageActive === index }"
          @click="handleIconImage(index)">
          <img :src="img && img.ossimg()" class="icon-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'components/swipe'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    // 购物车 - 更换sku
    selectedPropPath: {
      type: String,
      default: ''
    },
    selectedOldSkuId: null,
    params: {
      type: Object,
      default: {
        productInfo: {},
        skuCore: {},
        styles: [],
        skus: [],
      }
    },
    num: {
      type: Number,
      default: 1
    }
  },
  components: {
    Swipe,
    SwipeItem,
  },
  data() {
    return {
      skuObj: {}, // 用来记录选中的obj
      skuArr: [], // 用来记录选中的sku
      skuNameArr: [], // 选择的sku name

      selectedGoodsStock: 999999, // 库存

      selectedGoodsParams: { // 选中的商品信息
        skuId: '', // 选中的SKUID
        num: 1, // 数量
      },
      
      selectToastInstanse: null, // toast提示
      submitLock: false, // 提交锁

      // --- swipe --- //
      imgSwipe: [],
      isShowSwipe: false,
      iconImageActive: 0, // 高亮图标
      curImgIndex: 0, // 选中的color sku
    }
  },
  watch: {
    selectedPropPath(val) {
      if (val) {
        const arr = val.split(',')
        arr.map(v => {
          let pid = v.split(':')[0]
          let vid = v.split(':')[1]
          this.skuArr.push(+pid)
          this.skuObj[pid] = {}
          this.skuObj[pid].vid = vid
        })

        this.handleRenderSkuInfo()
      }
    },
    isShow(val) {
      if (val && this.num) {
        this.selectedGoodsParams.num = this.num || 1
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:isShow', false)
    },

    handleAdd() {
      if (this.selectedGoodsStock && this.selectedGoodsParams.num >= this.selectedGoodsStock) return this.selectedGoodsParams.num = this.selectedGoodsStock
      this.selectedGoodsParams.num++
    },
    handleReduce() {
      if (this.selectedGoodsParams.num <= 1) return
      this.selectedGoodsParams.num--
    },

    // ------------------------ sku start  ------------------------ //
    // 选择sku
    // @param item
    // @param itemVal
    // @param index 索引
    handleSku(item, itemVal) {
      // stock无法选择
      if (itemVal.disabled !== undefined && itemVal.disabled) return
      // 选中高亮SKU
      this.handleSkuHighlight(item, itemVal)
      // 渲染SKU信息 title、price、icon
      this.handleRenderSkuInfo()
    },
    // 选中dom
    handleSkuHighlight(item, itemVal) {
      const { pid } = item
      const { vid } = itemVal

      this.skuObj[pid] = {}
      this.skuObj[pid].vid = vid
      this.skuArr.push(pid)
      this.skuArr = [...new Set(this.skuArr)]
      this.skuNameArr.push(item.name)
      this.skuNameArr = [...new Set(this.skuNameArr)]

      this.params.styles.map((v, index) => {
        if (v.pid === pid) {
          v.values.map((v2, $index) => {

            if (v2.vid === vid) {
              v2.cur = !v2.cur
              if (!v2.cur) {
                this.$delete(this.skuObj, pid)
                this.skuArr = this.skuArr.filter(el => el !== pid)
                this.skuNameArr = this.skuNameArr.filter(el => el !== item.name)
              }
              if (v2.mainPicture) {
                this.params.productInfo.mainPicture = v2.mainPicture
                this.curImgIndex = $index // 用于swipe
              }
              this.$set(this.params.styles, index, v)
            } else {
              v2.cur = false
            }
          })
        }
        // 清理disabled
        if (this.params.styles.length > 1) {
          v.values.map(v2 => {
            v2.disabled = false
          })
        }
      })
    },

    // 渲染标题和图片
    handleRenderSkuInfo() {
      // 清空skuId
      this.selectedGoodsParams.skuId = ''

      // 计算选中的sku
      let skuObjProp = []
      let arrRule = [] // 顺序
      // 注意sku的顺序
      this.params.styles.map(v => {
        arrRule.push(v.pid)
      })

      arrRule.map(v => {
        if (this.skuObj[v]) {
          skuObjProp.push(v + ':' + this.skuObj[v].vid)
        }
      })

      this.params.skus.map(v => {
        // 选中所有：sku属性，这种情况下需要改变价格和icon
        let { propPath, skuId } = v
        let sku = this.params.skuCore[skuId]
        let { stock } = sku
  
        // 处理stock为0的数据
        if (stock === 0) {
          let propPathArr = propPath.split(',')
          
          // 一个sku
          this.params.styles.map((v2, index) => {
            v2.values.map(v3 => {
              let comparePropPath = v2.pid + ':' + v3.vid
              
              if (comparePropPath === propPath) {
                v3.disabled = true
                this.$set(this.params.styles, index, v2)
              }
            })
          })

          // 二个SKU
          if (this.skuArr.length) {
            // 数据 - disabled
            for (let key in this.skuObj) {
              let comparePropPath = key + ':' + this.skuObj[key].vid
              if (propPathArr.includes(comparePropPath)) {
                let disabledArr = propPathArr.filter(el => el !== comparePropPath)
                
                disabledArr.map(v2 => {
                  this.params.styles.map((v3, index) => {
                    v3.values.map(v4 => {
                      if (v2 === v3.pid + ':' + v4.vid) {
                        v4.disabled = true
                        this.$set(this.params.styles, index, v3)
                      }
                    })
                  })
                })
              }
            }
          }
        }

        // console.log(this.skuArr, this.skuArr.length, this.params.styles.length, v.propPath, skuObjProp.join(','), 333)
        // 选满
        if (stock !== 0 && this.skuArr.length === this.params.styles.length && v.propPath === skuObjProp.join(',')) {
          // console.log(this.skuArr.length, this.params.styles.length, v.propPath, skuObjProp.join(','), 666)
          this.params.productInfo.sellPrice = sku.sellPrice
          this.params.productInfo.comparePrice = sku.comparePrice
          this.params.productInfo.mainPicture = sku.mainPicture
          
          this.selectedGoodsParams.skuId = v.skuId

          // 数量
          // console.log(sku.stock, 333)
          this.selectedGoodsStock = sku.stock
          if (this.selectedGoodsParams.num >= sku.stock) {
            this.selectedGoodsParams.num = sku.stock
          }
        }
      })

      // 库存数量纠正
      if (this.skuArr.length !== this.params.styles.length) {
        this.selectedGoodsStock = 999999
      }
    },

    // ------------------------ sku end  ------------------------ //

    // 加购
    handleAddToBag() {
      this.selectToastInstanse && this.selectToastInstanse.close()
      
      // 判定是否选择完毕
      if (!this.selectedGoodsParams.skuId) {
        let noCheckName = []
        this.params.styles.map(v => {
          if (this.skuNameArr.length) {
            this.skuNameArr.map(v2 => {
              if (v.name !== v2) {
                noCheckName.push(v.name)
              }
            })
          } else {
            noCheckName.push(v.name)
          }
        })
        
        this.selectToastInstanse = this.$Toast('Please select a ' + noCheckName.join(' & '))
        return
      }

      let defualtApiData = {
        url: 'CartAdd',
        params: this.selectedGoodsParams,
        // toast: 'Add to bag successful'
      }

      // 若是更换SKU，接口 、 提示变更
      if (this.selectedOldSkuId) {
        if (this.selectedOldSkuId !== this.selectedGoodsParams.skuId) {
          defualtApiData = {
            url: 'CartChange',
            params: {
              oldSkuId: this.selectedOldSkuId,
              newSkuId: this.selectedGoodsParams.skuId,
              num: this.selectedGoodsParams.num
            },
            toast: 'Change successful'
          }
        } else {
          // 没变化
          defualtApiData = {
            url: 'CartUpdate',
            params: {
              skuId: this.selectedOldSkuId,
              num: this.selectedGoodsParams.num
            },
            toast: 'Change successful'
          }
        }
      }

      if (this.submitLock) return
      this.submitLock = true
      // loading
      this.$Indicator.open()

      // 发送请求
      this.request(defualtApiData.url, defualtApiData.params).then((res) => {
        const { code, data, message } = res
        if (code === 20000 && data) {
          // 关闭弹层并执行动画
          defualtApiData.toast && this.$Toast(defualtApiData.toast)

          this.$emit('update:isShow', false)
          this.$emit('callback', this.selectedOldSkuId ? data : this.selectedGoodsParams.num) // 执行回调函数
        } else {
          this.$Toast(message || 'System Error')
          
        }
        setTimeout(() => {
          this.submitLock = false
        }, 1000)
        // 关闭 loading
        this.$Indicator.close()
      }).catch(e => {
        this.submitLock = false
        this.$Indicator.close()
      })
    },

    // 轮播
    handleShowSwipe() {
      this.imgSwipe = this.params.productInfo && this.params.productInfo.images || []
      this.isShowSwipe = true
      
      setTimeout(() => {
        this.handleIconImage(this.curImgIndex)
      }, 10)
    },
    // 轮播 - 回调
    nextCallback(index) {
      this.iconImageActive = index
    },
    // 点击图片图标
    handleIconImage(index) {
      this.$refs.bigImgSwipeRef.goto(index)
      this.iconImageActive = index
    },
    handleCloseSwipe() {
      this.imgSwipe = []
      this.isShowSwipe = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";
@import "~less/sku.less";

.sku-dialog {
  position: relative;
  .dialog-content {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 12;
    width: 100%;
    max-height: 1175/@rem;
    min-height: 960/@rem;
    .bgc-w();
    border-radius: 20/@rem 20/@rem 0 0;
    // padding: 0 24/@rem;
  }

  .goods-info {
    position: relative;
    text-align: center;
    padding: 40/@rem 100/@rem 30/@rem;
    border-bottom: 1px solid #f0f0f0;
    
    .big-img {
      border: 1px solid #f0f0f0;
      .wh(376, 376);
      border-radius: 16/@rem;
    }
    .swipe-open {
      position: absolute;
      left: 505/@rem;
      top: 355/@rem;
      cursor: pointer;
      img {
        .wh(38, 38);
      }
    }
    .price {
      margin: 20/@rem 0 10/@rem 0;
      .flex-center();
      align-items: flex-end;
      .selling-price {
        font-size: 30/@rem;
        color: @red;
        margin-right: 12/@rem;
      }
      .compare-pirce {
        color: #C9C9C9;
        text-decoration: line-through;
      }
    }
    .title {
      color: #666;
      .line1();
    }

    .i-close {
      position: absolute;
      top: 24/@rem;
      right: 24/@rem;
      .wh(44, 44);
      cursor: pointer;
    }
  }

  .goods-sku-layout {
    overflow-y: scroll;
    // padding-bottom: 140/@rem;
    margin-bottom: 140/@rem;
    max-height: 490/@rem;

    &::-webkit-scrollbar {
      display: block;
      width : 10/@rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10/@rem;
      background: #F5F5F5;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10/@rem;
      background: #FFF;
    }
  }

  .goods-sku {
    padding: 30/@rem 24/@rem 10/@rem;
  }

  .goods-quantity {
    padding: 0 24/@rem;
    .flex-between();
    align-items: center;
    .operation {
      display: flex;
      .wh(270, 62);
      border: 1px solid #E1E1E1;
      .reduce,
      .add,
      .quantity {
        .whl(90, 60);
        text-align: center;
        cursor: pointer;
      }
      .reduce {
        border-right: 1px solid #E1E1E1;
      }
      .add {
        border-left: 1px solid #E1E1E1;
      }
      .disabeld {
        color: #E1E1E1;
      }
    }
  }

  .dialog-btn {
    position: fixed;
    z-index: 12;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 137/@rem;
    padding: 0 24/@rem;
    box-shadow: 0 0 10/@rem 0 rgba(169, 169, 169, 0.35);

    .bgc-w();

    .btn {
      .flex-center();
      width: 100%;
      height: 88/@rem;
      color: #FFFFFF;
      .bgc-b();
      font-size: 30/@rem;
      margin: 22/@rem 0 27/@rem;
    }
  }
}

.cart-swipe {
  position: fixed;
  z-index: 20;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .bgc-b();

  .operation-close {
    position: absolute;
    top: 30/@rem;
    right: 30/@rem;
    z-index: 21;
    .wh(44, 44);
    cursor: pointer;
  }

  .big-img-swipe {
    .flex-center {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    img {
      width: 100%;
      position: absolute;

    }
  }

  .icon-images {
    position: absolute;
    left: 0;
    bottom: 129/@rem;
    width: 100%;
    height: 75/@rem;
    .flex-center();

    .icon-border {
      .wh(51, 51);
      border-radius: 50%;
      margin: 0 20/@rem;
      .bgc-b();
      .flex-center();

      img {
        .wh(51, 51);
        border-radius: 50%;
      }
      &.active {
        .wh(75, 75);
        border: 2px solid #FFF;
        img {
          display: block;
          .wh(58, 58);
          transition: all .2s;
        }
      }
    }
  }
}
</style>

