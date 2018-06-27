<template>
  <el-container>
    <el-header>{{greet}}</el-header>
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
      greet: 'Hello, World.'
    }
  },
  components: {AsideMenu}
}
</script>

<style scoped>
.content{
  min-height: 768px;
  border: 1px solid crimson;
}
</style>
