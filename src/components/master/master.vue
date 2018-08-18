<template>
  <el-container>
    <el-header>{{motto}}</el-header>
    <el-container>
      <el-aside>
        <el-menu :router="true"
          :default-active="activeMenuItem"
          :active="activeMenuItem">
          <el-menu-item index="/master/post/all"><i class="el-icon-view"></i>全部</el-menu-item>
          <el-menu-item index="/master/post/add" v-show="!$route.params.id"><i class="el-icon-circle-plus-outline"></i>新增</el-menu-item>
          <el-menu-item index="/master/post/edit" v-show="$route.params.id" disabled><i class="el-icon-edit"></i>编辑</el-menu-item>
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
      return '/master/post/' + this.$route.path.split('/')[3]
    }
  }
}
</script>
<style scoped>
  .el-main{
    padding-top: 0;
  }
</style>
