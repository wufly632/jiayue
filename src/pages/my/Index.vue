
<template>
  <div class="my-main">
    <div class="login-word-main">
      <div v-if="isShowLogin">
        <div class="title">迦悦登录区</div>
        <div class="sub-title">为了访问这些内容，你需要注册用户并登录网站输入您的用户名和密码.</div>
        <Login :isShow="isShowLogin"/>
      </div>
      <div v-else>
        <div class="title">迦悦注册区</div>
        <div class="sub-title">通过在此区域的注册，您将可以访问专门为您的业务选择的一组文档，例如立即下载高分辨率的图片。</div>
        <Register :isShow="!isShowLogin" />
      </div>

      <ul class="login-links">
        <li @click="isShowLogin = true">登录<i class="iconfont">&#xe62e;</i></li>
        <li @click="isShowLogin = false">注册<i class="iconfont">&#xe62e;</i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Register from './components/Register.vue'

export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      isShowLogin: true,
    }
  },
  created() {},
  watch: {},
  methods: {
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