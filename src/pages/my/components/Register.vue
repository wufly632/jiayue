<template>
  <div class="login-register-main a-fadeinTX" v-if="isShow">
    <div class="login-form">
      <div class="login-line">
        <div class="label">用户名</div>
        <div class="phone-number">
          <input 
            type="number"
            class="f-b"
            placeholder="请输入您的手机号"
            v-model.trim="params.mobile" />
        </div>
        <div class="error-message">{{ errorMsg.mobile }}</div>
      </div>

      <div class="login-line">
        <div class="label">密码</div>
        <input 
          :type="passwordType"
          placeholder="请输入您的密码"
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
    </div>
    
    <div class="btn-login f-b" @click="handleRegisterReset">注 册</div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showCloseEye: true,
      passwordType: 'password',
      isSend: false,
      params: {
        mobile: '',
        password: '',
      },
      // 错误信息
      errorMsg: {
        mobile: '',
        password: '',
      }
    }
  },
  created() {
    this.$Indicator.close()
  },
  watch: {
    'isShow': function() {
      this.showCloseEye = true
      this.isSend = false,
      this.params = {
        mobile: '',
        password: '',
      }
      // 错误信息
      this.errorMsg = {
        mobile: '',
        password: '',
      }
    }
  },
  methods: {
    // 注册
    handleRegisterReset() {
      // 验证表单
      if (this.validateForm()) return

      this.$Indicator.open()
      this.request('Register', this.params).then((res) => {
        const { code } = res
        if (code === 20000) {
          this.$Toast(`注册成功，请登录`)
          this.$emit('callback', true)
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
        this.errorMsg.mobile = '手机号不能为空'
        hasError = true
      } else {
        this.errorMsg.mobile = ''
      }

      if (!(/^1[3456789]\d{9}$/.test(this.params.mobile))) {
        this.errorMsg.mobile = '请输入有效的手机号'
        hasError = true
      } else {
        this.errorMsg.mobile = ''
      }

      if (!this.params.password || 
        (this.params.password && this.params.password.length < 6)) {
        this.errorMsg.password = '密码至少6位'
        hasError = true
      } else {
        this.errorMsg.password = ''
      }
    
      // if (!this.isAgree && !this.isForgot) {
      //   this.errorMsg.agree = 'Please check the Service Agreement first!'
      //   hasError = true
      // } else {
      //   this.errorMsg.agree = ''
      // }

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