<template>
  <div class="post-detail">
    <div class="post-head">
      <div class="title-and-tags">
        {{post.title}}
        <el-tag type="info" size="mini" style="margin-left:7px;" v-for="t in post.tags" v-bind:key="t">{{t}}</el-tag>
      </div>
      <div class="updated-at">@ {{post.updatedAt | toLocalTime}}</div>
    </div>
    <div class="post-body" v-html="postBodyHtml" v-highlight></div>
    <div id="div-comment"></div>
  </div>
</template>

<script>
import util from '@/assets/util.js'
import axios from 'axios'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import cmt from '@/comment'

export default {
  name: 'post-detail',
  data () {
    return {
      post: {
        title: '',
        body: '',
        updatedAt: '',
        tags: []
      },
      gitalk: null
    }
  },
  filters: { toLocalTime: util.filters.toLocalTime },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPost()
    })
  },
  computed: {
    postBodyHtml () {
      return util.filters.md2html(this.post.body)
    }
  },
  mounted () {
    this.gitalk = new Gitalk({
      clientID: cmt.client_id,
      clientSecret: cmt.client_secret,
      repo: 'stack-comment',
      owner: 'sagittaria',
      admin: ['sagittaria'],
      id: window.location.hash.substr(2),
      distractionFreeMode: false
    })
  },
  methods: {
    getPost () {
      let p = this.$store.getters.extract(this.$route.params.id)
      if (p) {
        this.post = p
        this.gitalk.render('div-comment')
      } else {
        axios.get(util.api.post + this.$route.params.id).then(resp => {
          this.post = resp.data.post
          this.gitalk.render('div-comment')
        })
      }
    }
  }
}
</script>

<style scoped>
.post-head{
  display: flex;
  justify-content: space-between;
  font-size: 30px;
}
.post-body{
  font-size: 15px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  margin: 15px 0;
  padding: 20px 5px;
  line-height: 1.5rem;
  min-height: 500px;
}
.updated-at{
  font-size: 0.8rem;
  text-align: right;
  color: #ccc
}
</style>
<style>
  .post-body p > code{
    border-radius: 3px;
    padding: .2em .4em;
  }
  .post-body p > code,
  .post-body ol > li > code,
  .post-body ul > li > code,
  .post-body th {
    background-color: rgba(27,31,35,.05);
  }
  .post-body > blockquote{
    background-color: rgba(27,31,35,.03);
    padding-left: 15px;
    border-left: 3px solid #62295488;
    line-height: 3em;
    margin-left: 0;
    margin-right: 0;
  }
  .post-body table {
    border-collapse: collapse;
  }
  .post-body table, .post-body th, .post-body td {
    border: 1px solid black;
  }
  .post-body th, .post-body td{
    padding: 10px;
  }
</style>
