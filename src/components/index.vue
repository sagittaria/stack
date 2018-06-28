<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" :router="true"
               :default-active="activeMenuItem"
               :active="activeMenuItem">
        <el-menu-item index="/"><i class="el-icon-news"></i></el-menu-item>
        <el-menu-item index="idea">道</el-menu-item>
        <el-menu-item index="tech">术</el-menu-item>
      </el-menu>
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

export default {
  data () {
    return {
    }
  },
  computed: {
    activeMenuItem () {
      return this.$route.path.split('/')[1] ? this.$route.path.split('/')[1] : '/'
    }
  },
  components: {AsideMenu}
}
</script>

<style scoped>
.el-header{
  display: flex;
  justify-content: center;
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
