<template>
  <div class="login-register-main a-fadeinTX" v-if="isShow">
    <div class="login-form">
      <div class="login-line">
        <div class="label">* 用户名</div>
        <div class="phone-number">
          <input 
            type="number"
            class="f-b"
            maxlength="11"
            v-model.trim="params.mobile"
            placeholder="请输入您的手机号" />
        </div>
      </div>
      <div class="login-line">
        <div class="label">* 密码</div>
        <input 
          :type="passwordType"
          class="f-b"
          v-model.trim="params.password"
          placeholder="请输入您的密码" />
        <img v-show="!showPassword" class="i-eye" @click="handlePassword('show')" src="../../../images/login/icon_close_eye.png" />
        <img class="i-eye" v-show="showPassword" @click="handlePassword" src="../../../images/login/icon_open_eye.png" />
      </div>
    </div>
    
    <div class="login-wechat">
      <div class="btn-login f-b" @click="handleLogin">登 录</div>
      <div class="qr-container" id="login_container"></div>
      <img @click="handleWechatLogin" src="../../../images/wechat.png" />
    </div>
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
      },
    }
  },
  created() {
    this.$Indicator.close()
    const code = this.$route.query.code
    const state = this.$route.query.state
    code && this.handleWechatLoginApi(code,state)
  },
  watch: {
    'isShow': function() {
      this.showPassword = false
      this.passwordType = 'password'
      this.params = {
        mobile: '',
        password: ''
      }
    },
  },
  methods: {
    checkPhone() { 
      return !(/^1[3456789]\d{9}$/.test(this.params.mobile))
    },
    handleLogin() {
      if (this.params.mobile === '') return this.$Toast('请输入您的手机号码')
      if (this.params.password === '') return this.$Toast('请输入您的密码')
      if (this.checkPhone()) return this.$Toast('请输入有效的手机号码')

      this.$Indicator.open()
      this.request('Login', this.params).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { accessToken } = data
          localStorage.removeItem('jiayue_token')
          // 记录token
          localStorage.setItem('jiayue_token', JSON.stringify({
            token: accessToken
          }))

          this.$emit('callback')
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
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
    handleWechatLogin() {
      if (!this.isWeiXin()) {
        var obj = new WxLogin({
          self_redirect: false,
          id: 'login_container', 
          appid: 'wx80778218fe50bf86', 
          scope: 'snsapi_login', 
          redirect_uri: encodeURIComponent(location.href),
          state:  Math.ceil(Math.random()*1000),
          style: 'black',
          href: ''
        })
      } else {
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2ced69550af66f2f&redirect_uri=https://www.jiayue.store/my&response_type=code&state=test&scope=snsapi_userinfo&state=STATE#wechat_redirect"
      }
      
    },
    handleWechatLoginApi(val,state) {
      this.request('WechatLogin', {
        code: val,
        state:state
      }).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { accessToken } = data
          localStorage.removeItem('jiayue_token')
          // 记录token
          localStorage.setItem('jiayue_token', JSON.stringify({
            token: accessToken
          }))

          this.$emit('callback')
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    }
  },
  isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
}
</script>