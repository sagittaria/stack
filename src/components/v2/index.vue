<template>
  <div class="index-layout"><!--不要套el-container了，会影响内部样式-->
    <el-header style="z-index:999;width:100%;background-color:#622954CC;
        display:flex;justify-content:center;">
      <div class="header-item motto hidden-sm-and-down">{{motto}}</div>
      <div class="header-item category-list">
        <div class="category" @click="categorized()">Hot50</div>
        <div class="category" @click="categorized('idea')">Idea<small>({{categoryCount.idea}})</small></div>
        <div class="category" @click="categorized('tech')">Tech<small>({{categoryCount.tech}})</small></div>
        <div class="category" @click="categorized('other')">Other<small>({{categoryCount.other}})</small></div>
      </div>
    </el-header>
    <el-scrollbar style="height:calc(100vh - 60px)">
      <el-main style="padding-top:70px;">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'
import util from '@/assets/util.js'
import 'element-ui/lib/theme-chalk/display.css' // class="hidden-sm-and-down" 小屏幕下隐藏

export default {
  name: 'index',
  data () {
    return {
      motto: 'Avenir',
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
    },
    categorized (category) {
      this.$router.push({path: '/', query: (category ? { category } : {}), replace: true})
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
.category{
  cursor: pointer;
}
</style>
<style>
.index-layout .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
