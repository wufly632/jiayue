<template>
  <div class="login-register-main a-fadeinTX" v-if="isShow">
    <div class="login-form">
      <div class="login-line">
        <div class="label">PHONE NUMBER</div>
        <div class="phone-number">
          <div class="area-code f-b">+234</div>
          <input 
            type="number"
            class="f-b"
            v-model.trim="params.mobile"
            placeholder="Please enter a valid phone number" />
        </div>
      </div>
      <div class="login-line">
        <div class="label">PASSWORD</div>
        <input 
          :type="passwordType"
          class="f-b"
          v-model.trim="params.password"
          placeholder="Please enter a valid password" />
        <img v-show="!showPassword" class="i-eye" @click="handlePassword('show')" src="../../../images/login/icon_close_eye.png" />
        <img class="i-eye" v-show="showPassword" @click="handlePassword" src="../../../images/login/icon_open_eye.png" />
      </div>
      <div @click="handleForgot" class="forgot">Forgot your Password?</div>
    </div>
    
    <div class="btn-login f-b" @click="handleLogin">LOG IN</div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPassword: false,
      passwordType: 'password',
      params: {
        mobile: '',
        password: ''
      }
    }
  },
  created() {
    this.$Indicator.close()
  },
  watch: {
    'isShow': function() {
      this.showPassword = false
      this.passwordType = 'password'
      this.params = {
        mobile: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      if (this.params.mobile === '') return this.$Toast('Please enter a valid phone number.')
      if (this.params.password === '') return this.$Toast('Please enter a valid password.')
      localStorage.removeItem('mall_token_info')
      this.$Indicator.open()
      
      this.request('Login', this.params).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { access_token } = data

          // 记录token
          localStorage.setItem('mall_token_info', JSON.stringify({
            token: access_token
          }))

          this.getUserInfo(access_token)
        } else {
          // this.$Toast(message)
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },
    handleClose() {
      const { redirect } = this.$route.query
      
      if (redirect === undefined || redirect === 'undefined') {
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$router.push({
          path: decodeURIComponent(redirect)
        })
      }
    },
    handlePassword(show) {
      if (show === 'show') {
        this.showPassword = true
        this.passwordType = 'text'
      } else {
        this.showPassword = false
        this.passwordType = 'password'
      }
    },
    // 获取用户信息
    getUserInfo(token) {
      this.request('UserInfo', {}).then((res) => {
        const { code, data, message } = res
        if (code === 20000 && data) {
          // data 中有用户信息、姓名、地址等
          const userObj = {
            token,
            data,
          }

          // 记录用户信息
          localStorage.setItem('mall_token_info', JSON.stringify(userObj))
          
          // 哪里来回哪里
          this.handleClose()
        } else {
          this.$Toast(message || 'UserInfo error!')
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },
    // 忘记密码
    handleForgot() {
      const { redirect } = { ...this.$route.query }
      let path = ''
      
      if (redirect === undefined || redirect === 'undefined') {
        path = '/login?forgot=true'
      } else {
        path = '/login?forgot=true&redirect=' + redirect
      }

      this.$router.push({
        path,
      })
    },
  }
}
</script>