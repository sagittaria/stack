<template>
  <el-container>
    <el-header>
      <div style="line-height:60px;">{{blogName}}</div>
      <div><img title="[泪目] --By熊阿噜<咸鱼的日常>" src="/static/lacrimal.png"/></div>
      <div style="line-height:60px;">{{motto}}</div>
    </el-header>
    <el-main>
      <el-row type="flex" justify="center" :gutter="40">
        <el-col :span="12"><router-view class="content"/></el-col>
        <el-col :span="4"><aside-menu/></el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/aside-menu.vue'
import axios from 'axios'
import util from '@/assets/util.js'

export default {
  components: {AsideMenu},
  data () {
    return {
      blogName: 'Fishing Log',
      motto: '三天打鱼，两天晒网',
      expirationMinutes: 5 // 缓存失效时间（分钟）
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.updateCachedStuffIfNecessary()
    })
  },
  methods: {
    updateCachedStuffIfNecessary () {
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
.el-header{
  width: 66%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.content{
  min-height: 768px;
}
</style>
