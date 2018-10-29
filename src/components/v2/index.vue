<template>
  <el-container>
    <el-header style="z-index:999;width:100%;background-color:#622954CC;
        display:flex;justify-content:center;">
      <div class="header-item motto hidden-sm-and-down">{{motto}}</div>
      <div class="header-item category-list">
        <div class="category">idea({{categoryCount.idea}})</div>
        <div class="category">tech({{categoryCount.tech}})</div>
        <div class="category">other({{categoryCount.other}})</div>
      </div>
    </el-header>
    <el-main style="padding-top:70px;">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import axios from 'axios'
import util from '@/assets/util.js'
import 'element-ui/lib/theme-chalk/display.css' // class="hidden-sm-and-down" 小屏幕下隐藏

export default {
  name: 'index',
  data () {
    return {
      motto: '本性不移',
      expirationMinutes: 5 // 缓存失效时间（分钟）
    }
  },
  computed: {
    categoryCount () {
      return this.$store.state.cache.categoryCount
    },
    tagsCount () {
      return this.$store.state.cache.tagsCount
    },
    lastCachedAt () {
      return this.$store.getters.normalizedLastCachedAt
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.updateCachedStuffIfNeeded()
    })
  },
  methods: {
    updateCachedStuffIfNeeded () {
      let self = this
      let now = new Date().getTime()
      if (now - self.$store.state.cache.lastCachedAt > self.expirationMinutes * 60 * 1000) { // 如果已超时，去数据库里重新捞一把
        axios.get(util.api.postCache).then(resp => {
          let lastCachedStuff = resp.data
          lastCachedStuff.lastCachedAt = now
          self.$store.dispatch('updateCachedStuff', lastCachedStuff)
        })
      }
    }
  }
}
</script>

<style scoped>
.header-item{
  color:white;
  line-height: 60px;
}
.motto{
  position: absolute;
  left: 30px;
}
.category-list{
  min-width:280px;
  display: flex;
  justify-content: space-between;
}
</style>
