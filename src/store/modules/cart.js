import Vue from "vue"

const state = {
  cartnum: 0
}

const mutations = {
  SET_NUM: (state, num) => {
    state.cartnum = num
  }
}

const actions = {
  // 获取cartnum
  getCartNum({ commit }, callback) {
    return new Promise((resolve, reject) => {
      Vue.prototype.request('CartNum', {}).then((res) => {
        const { code, data, message } = res
        if (code === 20000 && data) {
          const { num } = data
          commit('SET_NUM', num)

          callback && callback()
          resolve(res)
        } else {
          reject(message)
        }
      }, err => {
        this.$Toast(err)
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
