<template>
  <div id="app" @click="isShowSelectedStyle = false">
    <div class="global-home-animation a-fadeout" v-if="isShowHomeAnimation"></div>
    <!-- global-header  -->
    <div class="global-header">
      <div class="nav-left">
        <div class="select-main" @click.stop="isShowSelectedStyle = !isShowSelectedStyle">
          <div class="select-style">
            <span v-if="selectedStyle === '风格选择'">风格选择</span>
            <img v-else :src="selectedStyle" />
          </div>
          <i class="iconfont" :class="{'rotate180': isShowSelectedStyle}">&#xe611;</i>
        </div>
      </div>

      <div v-if="isShowSelectedStyle" class="select-menu a-fadeinTX" >
        <div 
          class="content"
          v-for="(item, index) in stylesData" 
          :key="index" 
          @click="handleCategory(item)">
          <img :src="item.smallPicture" />
        </div>
      </div>

      <div class="nav-right">
        <i class="iconfont" @click="handleGoto('address')">&#xe61e;</i>
        <i class="iconfont" @click="handleGoto('fav')">&#xe61f;</i>
        <i class="iconfont" @click="handleGoto('my')">&#xe736;</i>
        <div class="menu" @click="() => { this.isShowNavSide = true }">
          <i class="iconfont">&#xe60f;</i>
        </div>
      </div>
    </div>

    <!-- 导航菜单 -->
    <div class="global-nav-side a-fadeinT" v-if="isShowNavSide">
      <div class="nav-side-content">
        <div class="nav-side-close" @click="() => { this.isShowNavSide = false }">
          <i class="iconfont">&#xe60b;</i>
        </div>
        <ul>
          <li @click="handleGoto('index')">网站首页</li>
          <li @click="handleGoto('aboutus')">关于我们</li>
          <li @click="handleGoto('case')">精品案例</li>
          <li @click="handleGoto('address')">联系我们</li>
          <li @click="handleGoto('my')">登录</li>
        </ul>
      </div>
    </div>
    <!-- router content -->
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <div class="global-footer" style="display: none;">
      <p>© 2021 JIAYUE</p>
      <p>@迦悦 给您幸福的味道</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedStyle: '风格选择',
      isShowSelectedStyle: false,
      isShowNavSide: false,
      stylesData: [],
      isShowHomeAnimation: false
    }
  },
  created() {
    const pathname = window.location.pathname
    if (pathname === '/' || pathname === '/index' || (pathname.split('/index') &&  pathname.split('/index')[0] === '/index'))  {
      this.isShowHomeAnimation = true
    }
    this.getProductStyle()
  },
  methods: {
    getProductStyle() {
      this.request('ProductStyle', {}).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { styles } = data
          this.stylesData = styles
        }
      }, err => {
        this.$Toast(err)
      })
    },
    handleSelect() {
      this.isShowSelectedStyle = !this.isShowSelectedStyle
    },
    handleCategory(item) {
      this.selectedStyle = item.smallPicture
      this.isShowSelectedStyle = !this.isShowSelectedStyle
      this.$router.push({path: '/category/' + item.id })
    },
    handleGoto(url) {
      this.isShowNavSide = false
      this.isShowNavSide = false 
      this.$router.push({ path: `/${url}` })
    }
  }
}
</script>

<style lang="less">
@import "~less/base";
@import "~less/mint";
@import "~less/animate";
@import "~less/font";

img[lazy=loading],
img[lazy=error] {
  background: url("./images/lazy.png") no-repeat center center;
  background-size: 50% auto;
}

.global-home-animation {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  background: url(https://www.tikahome.cn/images/wap/wap4.jpg) center center no-repeat #000000;
}

.global-header {
  position: sticky;
  top: 0;
  z-index: 6;
  width: 100%;
  height: 100/@rem;
  background-color: #FFF;
  border-bottom: 1px solid #ececec;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 0 30/@rem;
  font-size: 28/@rem;

  .flex-between();
  .nav-left {
    font-size: 32/@rem;
    font-weight: bold;

    .select-main {
      position: relative;
      .flex-between();
      align-items: center;
      width: 200/@rem;
      .select-style {
        img {
          height: 40/@rem;
        }
      }
      i {
        font-weight: bold;
        font-size: 30/@rem;
        color: #cecece;
        // margin-left: 20/@rem;
      }
    }
  }
  .select-menu {
    position: absolute;
    left: 0;
    top: 98/@rem;
    z-index: 98;
    font-size: 32/@rem;
    font-weight: bold;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
    .content {
      padding: 20/@rem 30/@rem;
      background-color: #ffffff;
      border-bottom: 1px solid #ececec;
      border-right: 1px solid #ececec;
      min-width: 2.4rem;

      img {
        height: 40/@rem;
      }
    }
  } 
  .nav-right {
    display: flex;
    
    i {
      margin-right: 30/@rem;
      color: #cecece;
      font-size: 40/@rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.global-nav-side {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color:rgba(0, 0, 0, 0.5);
  
  .nav-side-content {
    // width: 100%;
    margin-left: 180/@rem;
    height: 100%;
    background-color: #fff;
  }
  .nav-side-close {
    position: absolute;
    right: 30/@rem;
    top: 30/@rem;
    i {
      font-size: 40/@rem;
    }
  }
  ul {
    display: block;
    padding: 30/@rem;
  }

  li {
    font-size: 28/@rem;
    line-height: 80/@rem;
    font-weight: bold;
  }
}

.global-footer {
  .flex-between();
  align-items: center;
  height: 50/@rem;
  padding: 0 30/@rem;
  color: #cecece;

  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

</style>
