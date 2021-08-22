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
        v-for="(item,index) in categories"
        :key="index"
        :class="{'actived': item.categoryId === categoryActiveId}" 
        @click="handleCategory(item)" 
        >
        <span></span>
        <font>{{ item.name }}</font>&nbsp;\&nbsp;{{ item.en }}
      </li>
    </ul>

    <!-- 产品 -->
    <div 
      class="products-category"
      v-for="(item, index) in productData"
      :key="index">
      <div class="title-main">{{ item.categoryName }} <span>({{ item.total }})</span></div>
      <div class="product-list">
        <router-link 
          v-for="(productItem, productIndex) in item.products"
          :key="productIndex"
          to="/detail/1" >
          <div class="img">
            <img :src="productItem.image" />
          </div>
          <div class="text">
            <div class="title">{{ productItem.title }}</div>
            <div class="sub-title">{{ productItem.subTitle }}</div>
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
      categories: [
        {
          categoryId: 1,
          name: '全部',
          en: 'All'
        },
        {
          categoryId: 2,
          name: '新品',
          en: ' News'
        },
        {
          categoryId: 3,
          name: '沙发',
          en: ' Sofas'
        },
        {
          categoryId: 4,
          name: '书柜',
          en: 'Bookshelves'
        },
      ],
      categoryActiveId: 0,

      // 产品
      productData: [
        {
          categoryId: 1,
          categoryName: '新品',
          total: 3,
          products: [
            {
              title: 'SM-D60',
              subTitle: 'Sideboards',
              image: 'https://www.tikahome.cn/upload/20190725/small_201907251357168215.jpg'
            },
            {
              title: 'SM-D60',
              subTitle: 'Sideboards',
              image: 'https://www.tikahome.cn/upload/20190725/small_201907251401398255.jpg'
            },
            {
              title: 'SM-D60',
              subTitle: 'Sideboards',
              image: 'https://www.tikahome.cn/upload/20210719/small_202107191602562005.JPG'
            }
          ]
        },
        {
          categoryId: 2,
          categoryName: '沙发',
          total: 3,
          products: [
            {
              title: 'D-84',
              subTitle: 'Sideboards',
              image: 'https://www.tikahome.cn/upload/20190908/small_201909081102050949.JPG'
            },
            {
              title: 'D-85',
              subTitle: 'Sideboards',
              image: 'https://www.tikahome.cn/upload/20170111/small_201701111119048125.jpg'
            },
            {
              title: 'D-60',
              subTitle: 'Sideboards',
              image: 'https://www.tikahome.cn/upload/20190908/small_201909081103222307.JPG'
            }
          ]
        }
      ]
    }
  },
  computed: {},
  created() {},
  watch: {},
  mounted() {
    window.addEventListener('scroll', this.scollFunction, true)
  },
  methods: {
    getList() {},
    handleCategory(item) {
      // 请求接口
      this.categoryActiveId = item.categoryId
      this.isShowFilterContent = !this.isShowFilterContent
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


