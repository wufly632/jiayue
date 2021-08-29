
<template>
  <div class="my-main">
    <div class="login-word-main" v-if="!isLogin">
      <div v-if="isShowLogin">
        <div class="title">Inside co 迦悦生活登录区</div>
        <div class="sub-title">为了访问这些内容，你需要注册用户并登录网站输入您的用户名和密码.</div>
        <Login :isShow="isShowLogin" @callback="handleSuccessLogin"/>
      </div>
      <div v-else>
        <div class="title">Inside co 迦悦生活注册区</div>
        <div class="sub-title">通过在此区域的注册，您将可以访问专门为您的业务选择的一组文档，例如立即下载高分辨率的图片。</div>
        <Register :isShow="!isShowLogin" @callback="isShowLogin = true"/>
      </div>

      <ul class="login-links">
        <li @click="isShowLogin = true">登录<i class="iconfont">&#xe62e;</i></li>
        <li @click="isShowLogin = false">注册<i class="iconfont">&#xe62e;</i></li>
      </ul>

    </div>

    <div v-else class="login-word-main">
      <div class="title">Inside co 迦悦生活登录区</div>
      <div class="sub-title">您已登录，欢迎您！</div>
      <div class="sub-title" @click="handleLogout">退出登录 / 切换账号</div>
      <div class="word-center">
        <router-link to="/index">
          <div class="go-btn">去首页</div>
        </router-link>
        <router-link to="/case">
          <div class="go-btn">精品案例</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import vLogin from 'mixins/validateLogin'
export default {
  components: {
    Login,
    Register
  },
  mixins: [vLogin],
  data() {
    return {
      isLogin: false,
      isShowLogin: true,
    }
  },
  created() {
    // 验证登录
    this.isLogin = this.validateLogin(true)
  },
  watch: {},
  methods: {
    handleSuccessLogin() {
      // 哪里来回那里去
      const { redirect } = this.$route.query
      if (redirect === undefined || redirect === 'undefined') {
        this.isLogin = true
      } else {
        this.$router.push({
          path: decodeURIComponent(redirect)
        })
      }
    },
    handleLogout() {
      localStorage.removeItem('jiayue_token')
      this.isLogin = false
      this.isShowLogin = true
    }
  }
}
</script>

<style lang="less">
@import '~less/tool.less';
@import './components/common.less';

.login-word-main {
  .title {
    font-size: 45/@rem;
    font-weight: bold;
    padding: 30/@rem;
  }
  .sub-title {
    padding: 30/@rem;
    padding-top: 0;
  }
  .word-center {
    .flex-center();
    .go-btn {
      margin-top: 30/@rem;
      margin-right: 30/@rem;
      width: 200/@rem;
      padding: 10px 0;
      .flex-center();
      border: 1px solid #ececec;
      color: #666;
      border-radius: 5/@rem;
    }
  }
  .login-links {
    display: block;
    padding: 30/@rem;

    li {
      .flex-between();
      height: 80/@rem;
      border-bottom: 1px solid #ececec;
      align-items: center;
      font-size: 28/@rem;
      i {
        font-size: 28/@rem;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>