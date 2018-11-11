import Vue from 'vue'
import Vuex from 'vuex'
import cache from './modules/cache'
import post from './modules/post'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cache,
    post
  }
})

export default store
