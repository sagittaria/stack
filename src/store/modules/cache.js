import util from '@/assets/util.js'

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
      let moment = util.kits.moment
      return moment(state.lastCachedAt).utcOffset(moment().utcOffset()).format('HH:mm:ss')
    }
  },
  mutations: {
    UPDATE_CACHED_STUFF: (state, lastCachedStuff) => {
      // state = lastCachedStuff // 别这么写，会碍到aside-menu上{{lastCachedAt}}的响应式表现
      state.categoryCount = state.categoryCount
      state.tagsCount = state.tagsCount
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
