<template>
  <div>
    <div class="filter-bar">
      <el-select v-model="filter.category" placeholder="category" size="mini" clearable>
        <el-option v-for="c in categories" v-bind:key="c" :label="c" :value="c"></el-option>
      </el-select>
      <el-input class="filter-bar-title" placeholder="keywords" size="mini" suffix-icon="el-icon-search"/>
      <el-date-picker v-model="filter.formDate" placeholder="start from" type="date" size="mini"/>
    </div>
    <div class="post-list">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: ['nonsense', 'boring'],
      filter: {
        category: '',
        fromDate: ''
      }
    }
  }
}
</script>

<style scoped>
  .filter-bar{
    display: flex;
  }
  .filter-bar-title{
    margin: auto 6px;
  }
</style>
