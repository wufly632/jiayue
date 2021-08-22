<template>
  <div class="fav-main">
    <div class="product-list">
      <router-link 
        v-for="(item, index) in favs"
        :key="index"
        to="/detail/1" >
        <div class="img">
          <img :src="item.image" />
        </div>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="sub-title">{{ item.subTitle }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 产品
      favs: [
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
        
    }
  },
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.fav-main {
  padding: 10/@rem 30/@rem;
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
</style>