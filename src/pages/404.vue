<template>
  <div class="error-main">
    <topbar title="404"></topbar>
    <div class="global-top-bar-placeholder"></div>
    <div class="error-img">
      <img src="../images/404_bg.png" />
    </div>
    <div class="desc">
      <p class="title">404</p>
      <p class="sub-title">Error page!</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~less/tool.less';
.error-main {
  width: 100%;
  height: 100vh;
  .bgc-w();
  .error-img {
    img {
      margin-top: 55/@rem;
      .wh(750, 508);
    }
  }
  .desc {
    margin: 0 auto;
    width: 380/@rem;
    margin-top: 50/@rem;
    text-align: center;
    .title {
      height: 38/@rem;
      font-size: 42/@rem;
      line-height: 48/@rem;
      margin-bottom: 28/@rem;
    }
    .sub-title {
      height: 75/@rem;
      font-size: 30/@rem;
      color: #666666;
      line-height: 48/@rem;
    }
  }
} 
</style>

