const post = {
  state: {
    cachedPostList: []
  },
  getters: {
    extract: (state) => (ts) => {
      let post = state.cachedPostList.find(p => { return new Date(p.updatedAt).getTime() / 1000 === Number(ts) })
      return post
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
