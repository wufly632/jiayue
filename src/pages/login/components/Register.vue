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
            placeholder="Please enter a valid phone number"
            v-model.trim="params.mobile" />
        </div>
        <div class="error-message">{{ errorMsg.mobile }}</div>
      </div>

      <div class="login-line">
        <div class="label">VERIFICATION CODE</div>
        <div 
          class="request-code"
          :class="{'active': sendCodeWord !== 'REQUESTCODE'}"
          @click="handleRequestCode">{{ sendCodeWord }}</div>
        <input 
          type="number"
          class="f-b"
          placeholder="Click send, you will receive a verification code, and fill in here"
          v-model.trim="params.code" />
        
        <div class="error-message">{{ errorMsg.code }}</div>
      </div>

      <div class="login-line">
        <div class="label">PASSWORD</div>
        <input 
          :type="passwordType"
          placeholder="Please enter a password, at least eight characters"
          class="f-b"
          v-model.trim="params.password" />
        <img 
          class="i-eye"
          v-show="showCloseEye" 
          @click="handleEye(true)"
          src="../../../images/login/icon_close_eye.png" />
         <img 
          class="i-eye"
          v-show="!showCloseEye" 
          @click="handleEye(false)"
          src="../../../images/login/icon_open_eye.png" />

        <div class="error-message sp">{{ errorMsg.password }}</div>
      </div>

      <div class="login-line">
        <div class="label">PASSWORD CONFIRMATION</div>
        <input 
          :type="passwordType"
          placeholder="Please enter the password again"
          class="f-b"
          v-model.trim="params.passwordConfirmation" />
        <img 
          class="i-eye"
          v-show="showCloseEye" 
          @click="handleEye(true)"
          src="../../../images/login/icon_close_eye.png" />
         <img 
          class="i-eye"
          v-show="!showCloseEye" 
          @click="handleEye(false)"
          src="../../../images/login/icon_open_eye.png" />
          
        <div class="error-message sp">{{ errorMsg.passwordConfirmation }}</div>
      </div>
      <div class="aggree" v-if="!isForgot">
        <i class="iconfont" v-show="isAgree" @click="() => isAgree = false">&#xe645;</i>
        <div class="circle" v-show="!isAgree"  @click="() => isAgree = true"></div>
        <div class="word">
          <span class="other-word">I agree to the</span>
          <router-link to="/privacycookie">Privacy & Cookie Policy</router-link>
        </div>
        <div class="error-message">{{ errorMsg.agree }}</div>
      </div>
    </div>
    
    <div class="btn-login f-b" @click="handleRegisterReset">SUBMIT</div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isForgot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAgree: true, // 同意协议
      showCloseEye: true,
      passwordType: 'password',
      sendCodeWord: 'REQUESTCODE',
      isSend: false,
      params: {
        mobile: '',
        code: '',
        password: '',
        passwordConfirmation: '',
        areaCode: '234',
      },
      // 错误信息
      errorMsg: {
        mobile: '',
        code: '',
        password: '',
        passwordConfirmation: '',
        agree: ''
      }
    }
  },
  created() {
    this.$Indicator.close()
  },
  watch: {
    'isShow': function() {
      this.isAgree = true
      this.showCloseEye = true
      // this.passwordType = 'password'
      // this.sendCodeWord ='REQUESTCODE'
      this.isSend = false,
      this.params = {
        mobile: '',
        code: '',
        password: '',
        passwordConfirmation: '',
        areaCode: '234',
      }
      // 错误信息
      this.errorMsg = {
        mobile: '',
        code: '',
        password: '',
        passwordConfirmation: '',
        agree: ''
      }
    }
  },
  methods: {
    // 验证码
    handleRequestCode() {
      if (!this.params.mobile) return this.errorMsg.mobile = 'Invalid mobile phone number'

      if (this.isSend) return
      this.isSend = true
      // 倒计时后之后释放
      this.countDownSeconds(60)

      this.request('UserSendCode', {
        mobile: this.params.mobile,
        areaCode: '234',
        scene: !this.isForgot ? 'register' : 'reset'
      }).then(res => {
        const { code, message } = res
        if (code === 20000) {
          // TODO STH
        } else {
          this.resetCode()
          this.$Toast(message)
        }
      }, err => {
        this.resetCode()
        this.$Toast(err)
      }).catch(() => {})
    },
    // 重置code
    resetCode() {
      this.sendCodeWord = `REQUESTCODE`
      this.isSend = false
    },
    // 倒计时 - 60s
    countDownSeconds(leftTime) {
      if (leftTime > 0) {
        let s = Math.floor((leftTime) % 60) || leftTime
        leftTime = leftTime - 1
        // 递归每秒调用countDown方法，显示动态时间效果
        setTimeout(() => {
          this.countDownSeconds(leftTime)
        }, 1000)
        
        this.sendCodeWord = `Left time ${s}s`
      } else {
        this.resetCode()
      }
    },
    // 注册
    handleRegisterReset() {
      const url = !this.isForgot ? 'Register' : 'UserReset'
      const msg = !this.isForgot ? 'register' : 'reset password'
      // 验证表单
      if (this.validateForm()) return

      this.$Indicator.open()
      this.request(url, this.params).then((res) => {
        const { code } = res
        if (code === 20000) {
          this.$router.push('/login')
          this.$Toast(`Successful ${msg}, please login!`)
          // 埋点
          !this.isForgot && window.fbq && fbq('track', 'CompleteRegistration')
        }
        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },
    // 验证表单
    validateForm() {
      let hasError = false
      // 非空判定
      if (!this.params.mobile) {
        this.errorMsg.mobile = 'Invalid mobile phone number'
        hasError = true
      } else {
        this.errorMsg.mobile = ''
      }

      if (!this.params.code) {
        this.errorMsg.code = 'Verification code error'
        hasError = true
      } else {
        this.errorMsg.code = ''
      }

      if (!this.params.password || 
        (this.params.password && this.params.password.length < 8)) {
        this.errorMsg.password = 'At least eight characters'
        hasError = true
      } else {
        this.errorMsg.password = ''
      }

      if (!this.params.passwordConfirmation ||
        this.params.passwordConfirmation !== this.params.password) {
        this.errorMsg.passwordConfirmation = 'Inconsistent passwords'
        hasError = true
      } else {
        this.errorMsg.passwordConfirmation = ''
      }

      if (!this.isAgree && !this.isForgot) {
        this.errorMsg.agree = 'Please check the Service Agreement first!'
        hasError = true
      } else {
        this.errorMsg.agree = ''
      }

      return hasError
    },
    // @param type {Boolean}
    handleEye(type) {
      this.showCloseEye = !type
      this.passwordType = !type ? 'password' : 'text'
    },
  }
}
</script>