//  状态管理单模块

// 状态存储
const state = {
  cookieKey: ''
}

//修改公共状态
const mutations = {
  SET_TOKEN: (state, key) => {
    state.cookieKey = key
  }
}

const actions = {
}

//模块化导出
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
