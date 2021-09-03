import Vue from "vue"

const state = {
  stylesData: []
}

const mutations = {
  SET_STYLES: (state, styles) => {
    state.stylesData = styles
  }
}

const actions = {
  getStylesData({ commit }, callback) {
    return new Promise((resolve, reject) => {
      Vue.prototype.request('ProductStyle', {}).then((res) => {
        const { code, data, message } = res
        if (code === 20000 && data) {
          const { styles } = data
          commit('SET_STYLES', styles)

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
