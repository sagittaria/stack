<template>
  <el-container>
    <el-header>{{motto}}</el-header>
    <el-container>
      <el-aside>
        <el-menu :router="true"
          :default-active="activeMenuItem"
          :active="activeMenuItem">
          <el-menu-item index="/master/statistic">统计</el-menu-item>
          <el-menu-item index="/master/post">文章</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      motto: '本性不移'
    }
  },
  methods: {
  },
  computed: {
    activeMenuItem () {
      return '/master/' + this.$route.path.split('/')[2]
    }
  }
}
</script>
