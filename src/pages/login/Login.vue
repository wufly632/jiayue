<template>
  <div class="login-register-layout">
    <i class="iconfont i-close" @click="handleClose">&#xe62e;</i>
    <div class="title-name f-b">Palmbuy</div>
    
    <div class="tab-list" v-if="!isForgot">
      <div 
        class="tab f-b" 
        v-for="(item, index) in tabs"
        :key="index"
        :class="{'active': activeIndex === index}"
        @click="handleTabs(index)">{{ item.name }}</div>
    </div>

    <Login :isShow="isShowLogin"/>
    <Register :isShow="!isShowLogin" :isForgot="isForgot" />
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
      tabs: [
        {
          name: 'LOG IN'
        },
        {
          name: 'SIGN UP'
        }
      ],
      activeIndex: 0,
      isShowLogin: true,
      isForgot: false, // 是否是注册
    }
  },
  created() {
    this.$Indicator.close()
    // 如果是忘记密码
    if (this.$route.query.forgot === 'true' || this.$route.query.forgot === true) {
      this.isShowLogin = false
      this.activeIndex = 1
      this.isForgot = true
    }
  },
  watch: {
    '$route.query.forgot': function(val) {
      if (val) {
        this.isShowLogin = false
        this.activeIndex = 1
        this.isForgot = true
      } else {
        this.isShowLogin = true
        this.activeIndex = 0
        this.isForgot = false
      }
    }
  },
  methods: {
    handleTabs(index) {
      this.activeIndex = index
      this.isShowLogin = !index

      const { redirect } = this.$route.query
      let path = ''
      if (redirect === undefined || redirect === 'undefined') {
        path = ''
      } else {
        path = '/login?redirect=' + redirect
      }
      
      this.$router.push({
        path,
      })
    },
    handleClose() {
      const { redirect, forgot } = this.$route.query
      
      if (forgot === 'true' || forgot === true) {
        this.$router.push({
          path: '/login'
        })
        return
      }
      
      if (redirect === undefined || 
        redirect === 'undefined' ||
        (redirect && !redirect.includes('detail'))) { // 非详情页
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$router.push({
          path: decodeURIComponent(redirect)
        })
      }
    },
  }
}
</script>

<style lang="less">
@import '~less/tool.less';
@import './components/common.less';
</style>