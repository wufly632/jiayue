
export default {
  methods: {
    // 登录校验
    validateLogin(isMy) {
      try {
        // 是否存在地址
        let localInfoData = localStorage.getItem('jiayue_token')
        console.log(this.$router.currentRoute.fullPath)
        if (!localInfoData) {
          !isMy && this.$router.replace({
            path: '/my',
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          })

          return false
        } else {
          return true
        }
      } catch(e) {
        return false
      }
    },
  }
}