const post = {
  state: {
    cachedPostList: []
  },
  getters: {
    extract: (state) => (id) => {
      return state.cachedPostList.find(p => { return p._id === id })
    }
  },
  mutations: {
    CACHE_POST: (state, postList) => {
      state.cachedPostList = postList
    }
  },
  actions: {}
}

export default post
