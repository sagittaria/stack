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
  </div>
</template>

<script>
import util from '@/assets/util.js'
import axios from 'axios'

export default {
  data () {
    return {
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
        this.postList = resp.data
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
      return util.kits.moment(d).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
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
