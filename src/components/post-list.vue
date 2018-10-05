<template>
  <div class="post-list-wrapper">
    <template v-for="post in postList">
      <div class="a-post" v-bind:key="post._id">
        <div class="a-post-head">
          <div class="a-post-head-group">
            <div class="a-post-category">[{{post.category}}]</div>
            <div class="a-post-title">{{post.title}}</div>
            <div class="a-post-tag" v-for="tag in post.tags" v-bind:key="tag">{{tag}}</div>
          </div>
          <div class="a-post-head-group">
            <div class="a-post-updated-at">{{format(post.updatedAt)}}</div>
          </div>
        </div>
        <div class="a-post-body">
          <div v-if="post.showAll" v-html="markdownalize(post.body)"></div>
          <span v-else>{{thumbnail(post.body, 100)}}</span>
          <a href="javascript:void(0)" @click="toggleDisplay(post)">{{post.showAll ? 'Less' : 'View'}}</a></div>
      </div>
    </template>
    <div style="border-bottom:1px solid #f2f2f2;height:14px;">
      <el-button type="text" size="mini" @click="loadMorePosts" v-show="hasMoreToLoad"> -- {{loadMoreButtonText}} -- </el-button>
      <el-button type="text" size="mini" v-show="!hasMoreToLoad"> -- 我是有底线的 -- </el-button>
    </div>
  </div>
</template>

<script>
import util from '@/assets/util.js'
import axios from 'axios'

export default {
  data () {
    return {
      postList: [],
      lastLoadedPage: 1,
      hasMoreToLoad: true,
      loadMoreButtonText: 'Load More'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.postList = []
      vm.getPosts(1, 7)
    })
  },
  methods: {
    getPosts (page, rows) {
      axios.get(util.api.post, {params: {page, rows}}).then(resp => {
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
      let rows = 7
      axios.get(util.api.post, {params: {page, rows}}).then(resp => {
        // console.log(resp)
        self.lastLoadedPage++
        self.postList.push(...resp.data.list)
        self.hasMoreToLoad = resp.data.list.length === rows
        self.loadMoreButtonText = 'Load More'
      })
    },
    markdownalize (srcText) {
      return util.kits.preview(srcText)
    },
    thumbnail (srcText, len) {
      return util.kits.getInnerText(srcText).substr(0, len) + '...'
    },
    toggleDisplay (post) {
      let self = this
      if (typeof post.showAll === 'undefined') {
        self.$set(post, 'showAll', true) // 必须滴...见https://cn.vuejs.org/v2/guide/reactivity.html
      } else {
        post.showAll = !post.showAll
      }
    },
    format (d) {
      let moment = util.kits.moment
      return moment(d).utcOffset(moment().utcOffset()).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>
.a-post{
  border-top:1px solid #f2f2f2;
  text-align: left;
  line-height:1.6rem;
  margin-bottom:24px;
}
.a-post-head{
  margin-top:4px;
  margin-bottom:12px;
  font-size:1.4rem;
  color:#d4002a;
  display: flex;
  justify-content: left;
}
.a-post-head-group{
  display: flex;
}
.a-post-category{
  margin-right: 0.5em;
}
.a-post-title{
  color:#d4002a;
  background-color: rgba(245,108,108,.1);
  padding:0 1rem;
  height: 1.6rem;
}
.a-post-updated-at{
  font-size:0.9rem;
  margin-left: 1em;
}
.a-post-tag{
  font-size:1rem;
  border:1px solid #d4002a;
  padding:0 0.3em;
  border-radius: 0.5em;
  margin-left: 0.5em;
}
.a-post-body{
}
</style>
