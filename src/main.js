import Vue from "vue"
import App from "./App"
import router from "./router"
import initComponents from "./initComponents"
import Http from "./libs/http"
import store from './store'
import clipboard from 'clipboard'

initComponents(Vue)
Vue.use(Http)

// rem 换算
import { remChange } from "./utils/remChange"
remChange()

// checkwebp
import "./utils/checkwebp"

// 复制粘贴
Vue.prototype.clipboard = clipboard
Vue.prototype.currencyUnit = '₦'

// 科学计算法 - 加减乘除
import { returnFloat, accAdd, accSub, accDiv, accMul, percentage, toThousands } from "./utils/math"
Vue.prototype.returnFloat = returnFloat
Vue.prototype.accAdd = accAdd
Vue.prototype.accSub = accSub
Vue.prototype.accDiv = accDiv
Vue.prototype.accMul = accMul
Vue.prototype.percentage = percentage
Vue.prototype.toThousands = toThousands

// 组件库
import { Toast, Indicator, MessageBox } from 'mint-ui'
Vue.prototype.$Toast = Toast
Vue.prototype.$Indicator = Indicator
Vue.prototype.$MessageBox = MessageBox
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI, {
  lazyload: {
    preLoad: 1.3,
    loading: '',
    // attempt: 1,
  }
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
})
