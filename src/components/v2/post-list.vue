<template>
  <div class="post-list">
    <div class="post" v-for="p in postList" v-bind:key="p._id">
      <div class="post-head">
        <div class="post-head-title"><small class="fuze-outer" @click="categorized(p.category)">[{{p.category}}]</small>
          <span class="fuze" @click="viewDetail(p._id)">{{p.title}}</span></div>
        <div class="post-head-tags-wrapper">
          <el-tag type="info" size="mini" v-for="t in p.tags" v-bind:key="t">{{t}}</el-tag>
        </div>
      </div>
      <div class="post-body">{{p.body | md2html | html2text | text2truncate}}</div>
      <div class="post-foot">published@ {{p._id | objectId2localTime}} | updated@ {{p.updatedAt | toLocalTime}}</div>
    </div>
    <div style="height:14px;text-align:center;">
      <el-button type="text" size="mini" @click="loadMorePosts" v-show="hasMoreToLoad"> -- {{loadMoreButtonText}} -- </el-button>
      <el-button type="text" size="mini" v-show="!hasMoreToLoad"> -- 我是有底线的 -- </el-button>
    </div>
    <div
      v-show="isLoading"
      style="position:fixed;top:0;left:0; height: 100%;width:100%;background-color:#62295408;
      display: flex;justify-content: center;align-items:center">
      <img src="/static/loading-bars.svg"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import util from '@/assets/util'

export default{
  name: 'post-list',
  data () {
    return {
      postList: [],
      lastLoadedPage: 1,
      hasMoreToLoad: true,
      loadMoreButtonText: 'Loading please wait...',
      isLoading: true
    }
  },
  watch: {
    '$route': function () {
      this.lastLoadedPage = 1
      this.hasMoreToLoad = true
      this.getPosts(1, 48)
    }
  },
  filters: {
    toLocalTime: util.filters.toLocalTime,
    md2html: util.filters.md2html,
    html2text: util.filters.html2text,
    text2truncate: util.filters.text2truncate,
    objectId2localTime: util.filters.objectId2localTime
  },
  created () {
    this.getPosts(1, 48)
  },
  methods: {
    getPosts (page, size) {
      let queryParams = {page, size}
      let category = this.$route.query.category
      if (category) {
        queryParams = {...queryParams, category}
      }
      this.isLoading = true
      axios.get(util.api.post, {params: queryParams}).then(resp => {
        // console.log(resp)
        this.postList = resp.data.list
        this.loadMoreButtonText = 'Load More'
        this.$store.commit('CACHE_POST', this.postList)
        this.isLoading = false
      })
    },
    loadMorePosts () {
      let self = this
      if (!self.hasMoreToLoad) {
        return
      }
      self.loadMoreButtonText = 'Loading please wait...'
      let page = (self.lastLoadedPage + 1)
      let size = 48
      let queryParams = {page, size}
      let category = this.$route.query.category
      if (category) {
        queryParams = {...queryParams, category}
      }
      self.isLoading = true
      axios.get(util.api.post, {params: queryParams}).then(resp => {
        // console.log(resp)
        self.lastLoadedPage++
        self.postList.push(...resp.data.list)
        self.hasMoreToLoad = resp.data.list.length === size
        self.loadMoreButtonText = 'Load More'
        self.$store.commit('CACHE_POST', self.postList)
        self.isLoading = false
      })
    },
    categorized (category) {
      this.$router.push({path: '/', query: (category ? { category } : {}), replace: true})
    },
    viewDetail (id) {
      this.$router.push({path: `/${id}`})
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
  line-height: 1.5rem;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.post-foot{
  font-size: 0.8rem;
  text-align: right;
  color: #ccc
}
.fuze-outer, .fuze{
  cursor: pointer
}
.fuze:hover{
  color: #622954
}
.fuze-outer{
  color: #909399
}
.fuze-outer:hover{
  color: #62295455
}
</style>
