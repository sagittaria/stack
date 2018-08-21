<template>
  <div>
    <div class="filter-bar">
      <el-select v-model="filter.category" placeholder="category" size="mini" clearable>
        <el-option v-for="c in categories" v-bind:key="c" :label="c" :value="c"></el-option>
      </el-select>
      <el-input v-model="filter.title" class="filter-bar-title" placeholder="keywords" size="mini" suffix-icon="el-icon-search"/>
      <el-date-picker v-model="filter.formDate" placeholder="start from" type="date" size="mini"/>
    </div>
    <div class="post-list">
      <el-table :data="postList">
        <el-table-column prop="category" label="category"></el-table-column>
        <el-table-column prop="title" label="title"></el-table-column>
        <el-table-column label="tags">
          <template slot-scope="scope">
            <el-tag v-for="t in scope.row.tags" v-bind:key="t" type="warning" size="mini">{{t}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="updated">
          <template slot-scope="scope">
            <span>{{format(scope.row.updatedAt)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="operate">
          <template slot-scope="scope">
            <el-button type="danger" @click="edit(scope.row._id)" icon="el-icon-edit-outline" size="mini" circle plain></el-button>
            <el-button type="info" @click="del(scope.row._id)" icon="el-icon-delete" size="mini" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import util from '@/assets/util'
import axios from 'axios'

export default {
  data () {
    return {
      categories: ['nonsense', 'boring'],
      filter: {
        category: '',
        title: '',
        fromDate: ''
      },
      postList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPosts()
    })
  },
  methods: {
    getPosts () {
      axios.get(util.api.post).then(resp => {
        // console.log(resp)
        this.postList = resp.data
      })
    },
    edit (id) {
      // console.log(id)
      this.$router.push({name: 'post-edit', params: {id: id}})
    },
    del (id) {
      // console.log(id)
      let self = this
      self.$confirm('do you really want to delete this post?', 'warning!').then(() => {
        axios.delete(util.api.post + id).then(resp => {
          self.$message({message: '删除成功', type: 'success'})
          self.getPosts()
        })
      }).catch(() => {})
    },
    format (d) {
      return util.kits.moment(d).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
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
  .el-table {
    text-align: left;
  }
  .el-tag{
    margin-right:6px;
  }
</style>
