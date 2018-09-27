import Vue from 'vue'
import Vuex from 'vuex'
import cache from './modules/cache'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cache
  }
})

export default store
