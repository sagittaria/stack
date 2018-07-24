<template>
  <el-container>
    <el-header>
      <div style="line-height:60px;">{{blogName}}</div>
      <el-menu mode="horizontal" :router="true"
               :default-active="activeMenuItem"
               :active="activeMenuItem">
        <el-menu-item index="/"><i class="el-icon-news"></i></el-menu-item>
        <el-menu-item index="idea">道</el-menu-item>
        <el-menu-item index="tech">术</el-menu-item>
      </el-menu>
      <div style="line-height:60px;">还不知道这边放什么好</div>
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
      blogName: 'Origin'
    }
  },
  computed: {
    activeMenuItem () {
      return this.$route.path.split('/')[1] ? this.$route.path.split('/')[1] : '/'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getBlogName()
    })
  },
  methods: {
    getBlogName () {
      let self = this
      axios.get(util.api.getBlogName).then(resp => {
        self.blogName = resp.data.blogName
        console.log(resp)
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.el-header{
  display: flex;
  justify-content: space-between;
}
.el-menu{
  /*width:60%;*/
  display: flex;
  justify-content: center;
}
.content{
  min-height: 768px;
  border: 1px solid crimson;
}
</style>
