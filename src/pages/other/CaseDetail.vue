<template>
  <div class="case-detail-main">
    <div class="main-title">
      <i class="iconfont">&#xe62f;</i>&nbsp;
      {{ caseDetail.title }}
    </div>
    <div class="main-content" v-html="caseDetail.content"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      caseDetail: ''
    }
  },
  created() {
    this.getCaseDetail()
  },
  methods: {
    getCaseDetail() {
      this.$Indicator.open()
      this.request('AddressInfo', {}).then(res => {
        const { code, data } = res
        if (code === 20000 && data) {
          this.caseDetail = data
        }

        this.$Indicator.close()
      }, err => {
        this.$Indicator.close()
        this.$Toast(err)
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.case-detail-main {
  .main-title {
    padding: 30/@rem;
    padding-bottom: 0;
    font-size: 30/@rem;
    font-weight: bold;
    i {
      font-size: 30/@rem;
    }
  }
  img {
    width: 100%;
  }
}
</style>