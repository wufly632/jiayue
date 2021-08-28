<template>
  <div class="aboutus-main">
    <div v-html="aboutInfo"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutInfo: ''
    }
  },
  created() {
    this.getAboutInfo()
  },
  methods: {
    getAboutInfo() {
      this.request('AboutInfo', {}).then((res) => {
        const { code, data } = res
        if (code === 20000 && data) {
          const { content } = data
          this.aboutInfo = content
        }
      }, err => {
        this.$Toast(err)
      })
    }
  },
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.aboutus-main {
  padding: 30/@rem;
}
</style>