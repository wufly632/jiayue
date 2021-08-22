<template>
  <div id="app" @click="isShowSelectMenu = false">
    <!-- global-header  -->
    <div class="global-header">
      <div class="nav-left">
        <div class="select-main" @click.stop="isShowSelectMenu = !isShowSelectMenu">
          <div class="select-style">风格选择</div>
          <i class="iconfont" :class="{'rotate180': isShowSelectMenu}">&#xe611;</i>
        </div>
      </div>

      <div v-if="isShowSelectMenu" class="select-menu a-fadeinTX" >
        <div 
          v-for="(item, index) in categoryData" 
          :key="index" 
          @click="handleCategory(item)">
          <div class="content">{{ item.name }}</div>
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
          <li>
            <router-link to="/index">网站首页</router-link>
          </li>
          <li>
            <router-link to="/aboutus">关于我们</router-link>
          </li>
          <li>
            <router-link to="/case">精品案例</router-link>
          </li>
          <li>
            <router-link to="/concatus">联系我们</router-link>
          </li>
          <li>
            <router-link to="/login">登录</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- router content -->
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <div class="global-footer">
      <p>© 2021 JIAYUE</p>
      <p>技术支持：迦悦</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedMenu: '风格选择',
      isShowSelectMenu: false,
      isShowNavSide: false,
      categoryData: [
        {
          categoryId: 1,
          name: '现代风'
        },
        {
          categoryId: 2,
          name: 'Daviny'
        }
      ]
    }
  },
  created() {},
  methods: {
    handleSelect() {
      this.isShowSelectMenu = !this.isShowSelectMenu
    },
    handleCategory(item) {
      this.selectedMenu = item.name
      this.isShowSelectMenu = !this.isShowSelectMenu
      this.$router.push({path: '/category/' + item.categoryId })

      console.log('/category/' + item.categoryId )
    },
    handleGoto(url) {
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

.global-header {
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
      display: flex;
      align-items: center;
      width: 200/@rem;
      .select-style {}
      i {
        font-weight: bold;
        font-size: 30/@rem;
        color: #cecece;
        margin-left: 10/@rem;
      }
    }
  }
  .select-menu {
    position: absolute;
    left: 0;
    top: 88/@rem;
    z-index: 98;
    font-size: 32/@rem;
    font-weight: bold;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
    .content {
      padding: 20/@rem 30/@rem;
      background-color: #ffffff;
      border-bottom: 1px solid #ececec;
      border-right: 1px solid #ececec;
      min-width: 2rem;

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
  height: 80/@rem;
  padding: 0 30/@rem;
  color: #cecece;
}

</style>
