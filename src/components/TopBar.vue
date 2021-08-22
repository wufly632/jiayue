<template>
  <div class="global-top-bar">
    <div class="global-top-bar-center">
      <div class="back" v-if="!hidenBack" @click="clickPageBack">
        <i class="iconfont">&#xe604;</i>
      </div>
      <div class="title">{{ title }}</div>
      <router-link v-if="showHome" :to="{ path: '/index'}" class="home">
        <i class="iconfont">&#xe6f3;</i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    hidenBack: {
      type: Boolean,
      default: false
    },
    isBack:{
      type: Boolean,
      default: false
    },
    showHome: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default: () => {}
    }
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
