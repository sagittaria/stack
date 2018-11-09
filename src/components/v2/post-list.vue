<template>
  <div class="post-list">
    <div class="post" v-for="p in postList" v-bind:key="p._id">
      <div class="post-head">
        <div class="post-head-title">{{p.title}}</div>
        <div class="post-head-tags-wrapper">
          <el-tag type="info" size="mini" v-for="t in p.tags" v-bind:key="t">{{t}}</el-tag>
        </div>
      </div>
      <div class="post-body">{{p.body}}</div>
      <div class="post-foot">updated @ {{p.updatedAt | formatLocalTime}}</div>
    </div>
    <div style="height:14px;text-align:center;">
      <el-button type="text" size="mini" @click="loadMorePosts" v-show="hasMoreToLoad"> -- {{loadMoreButtonText}} -- </el-button>
      <el-button type="text" size="mini" v-show="!hasMoreToLoad"> -- 我是有底线的 -- </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import util from '@/assets/util.js'

export default{
  name: 'post-list',
  data () {
    return {
      postList: [],
      lastLoadedPage: 1,
      hasMoreToLoad: true,
      loadMoreButtonText: 'Load More'
    }
  },
  filters: {
    formatLocalTime (d) {
      return moment(d).utcOffset(moment().utcOffset()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    this.postList = this.getPosts(1, 7)
  },
  methods: {
    getPosts (page, size) {
      axios.get(util.api.post, {params: {page, size}}).then(resp => {
        // console.log(resp)
        this.postList = resp.data.list
      })
    },
    loadMorePosts () {
      let self = this
      if (!self.hasMoreToLoad) {
        return
      }
      self.loadMoreButtonText = 'Loading please wait...'
      let page = (self.lastLoadedPage + 1)
      let size = 7
      axios.get(util.api.post, {params: {page, size}}).then(resp => {
        // console.log(resp)
        self.lastLoadedPage++
        self.postList.push(...resp.data.list)
        self.hasMoreToLoad = resp.data.list.length === size
        self.loadMoreButtonText = 'Load More'
      })
    }
  }
}
</script>

<style scoped>
.el-tag{
  margin-left: 8px;
}
.post{
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.post-head{
  display: flex;
}
.post-head-title{
  font-size: 24px;
}
.post-body{
  font-size: 15px;
  margin: 15px 0;
  line-height: 1.3rem;
}
.post-foot{
  font-size: 0.8rem;
  text-align: right;
  color: #ccc
}
</style>
