<template>
  <div class="checklist-main">
    <ul>
      <li 
        v-for="(item, index) in params"
        :key="index"
        @click="handleCheck(item, index)">
        <div 
          class="check-icon "
          :class="{'active': item.checkedIndex === index }">
          <div class="circle"></div>
          <i class="iconfont">&#xe645;</i>
        </div>
        <div class="check-content">{{ item.value }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    params: {
      type: Array,
      default: []
    },
  },
  data () {
    return {}
  },
  methods: {
    // 计算
    handleCheck(item, index) {
      this.$emit('callback', item, index)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";

.checklist-main {
  padding: 26/@rem 0;
  .clearfix();
  li {
    display: flex;
    .hl(28, 28);
    margin-bottom: 26/@rem;
   
    .check-icon {
      .wh(28, 28);
      margin-right: 18/@rem;
      .circle {
        .wh(26, 26);
        border-radius: 50%;
        border: 1px solid @black;
      }
      i {
        display: none;
      }

      &.active {
        .circle {
          display: none;
        }
        i {
          display: inline-block;
          font-size: 28/@rem;
        }
      }
    }
    .check-content {
      color: @w65-color
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>