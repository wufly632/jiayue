<template>
  <div class="global-back-top-bar">
    <div class="top-bar-center">
      <div class="back" @click="()=> { this.$router.go(-1) }">
        <i class="iconfont">&#xe62f;</i>
      </div>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    clickPageBack() {
      if (this.isBack) {
        this.callback && this.callback()
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
@import '~less/tool.less';
// topbar
.global-back-top-bar {
  position: relative;
  width: 100%;
  padding: 20/@rem;
  background-color: #f8f8f8;
  
  .top-bar-center {
    position: relative;
    width: 100%;
    margin: 0 auto;
    max-width: 750/@rem;
    display: flex;
    align-items: center;
  }
  
  .back {
    .whl(60, 60);
    border-radius: 50%;
    top: 24/@rem;
    background-color: @red;
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    i {
      font-size: 36/@rem;
    }
    left: 30/@rem;
  }
  .text {
    font-size: 30/@rem;
    margin-left: 20/@rem;
  }
}
</style>
