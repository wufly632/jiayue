<template>
  <div class="case-main">
    <div class="main-title">精品案例</div>
    <div class="case-list">
      <router-link 
        v-for="(item, index) in caseData"
        :key="index"
        :to="{ path: `/caseDetail/${item.id}`}" >
        <div class="img">
          <img v-lazy="item.mainPicture && item.mainPicture.formatOssimg(750)" />
        </div>
        <div class="text">
          <div class="title">{{ item.title }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caseData: {}
    }
  },
  created() {
    this.getCaseList()
  },
  methods: {
    getCaseList() {
      this.$Indicator.open()
      this.request('CaseList', {}).then(res => {
        const { code, data } = res
        if (code === 20000 && data) {
          this.caseData = data.cases
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
.case-main {
  .main-title {
    padding: 30/@rem;
    padding-bottom: 0;
    font-size: 30/@rem;
    font-weight: bold;
  }
  .case-list {
    padding: 30/@rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
     
    a {
      width: 50%;
      display: block;
      margin-bottom: 20/@rem;
      padding-right: 10/@rem;
      height: 340/@rem;
      &:nth-child(2n) {
        padding-left: 10/@rem;
        padding-right: 0;
      }
    }
    .img {
      position: relative;
      height: 240/@rem;
      display: flex;
      align-items: center;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
      }
    }
    .text {
      padding: 10/@rem 0;
      .title {
        .line2();
        font-size: 28/@rem;
      }
    }
  }
}
</style>