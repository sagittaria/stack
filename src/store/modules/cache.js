import moment from 'moment'

const cacheStateDefault = {
  categoryCount: {
    idea: 0,
    tech: 0,
    other: 0
  },
  tagsCount: [],
  lastCachedAt: 0 // 用时间戳存
}

const cache = {
  state: JSON.parse(sessionStorage.getItem('cacheState')) || cacheStateDefault,
  getters: {
    normalizedLastCachedAt: state => {
      return moment(state.lastCachedAt).utcOffset(moment().utcOffset()).format('HH:mm:ss')
    }
  },
  mutations: {
    UPDATE_CACHED_STUFF: (state, lastCachedStuff) => {
      // state = lastCachedStuff // 别这么写，会碍到aside-menu上{{lastCachedAt}}的响应式表现
      // state.categoryCount = lastCachedStuff.categoryCount // 也别这么写，可能有的分类下为空从而抛undefined
      state.categoryCount.idea = lastCachedStuff.categoryCount.idea || 0
      state.categoryCount.tech = lastCachedStuff.categoryCount.tech || 0
      state.categoryCount.other = lastCachedStuff.categoryCount.other || 0
      state.tagsCount = lastCachedStuff.tagsCount
      state.lastCachedAt = lastCachedStuff.lastCachedAt
      sessionStorage.setItem('cacheState', JSON.stringify(state))
    }
  },
  actions: {
    updateCachedStuff ({commit}, lastCachedStuff) {
      commit('UPDATE_CACHED_STUFF', lastCachedStuff)
    }
  }
}

export default cache
