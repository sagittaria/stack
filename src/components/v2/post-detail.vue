<template>
  <div class="post-detail">
    <div class="post-head">{{post.title}}</div>
    <div class="post-body" v-html="postBodyHtml" v-highlight></div>
  </div>
</template>

<script>
import util from '@/assets/util.js'
import axios from 'axios'

export default {
  name: 'post-detail',
  data () {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
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
  methods: {
    getPost () {
      let p = this.$store.getters.extract(this.$route.params.id)
      if (p) {
        this.post = p
      } else {
        axios.get(util.api.post + this.$route.params.id).then(resp => {
          this.post = resp.data.post
        })
      }
    }
  }
}
</script>

<style scoped>
.post-head{
  font-size: 24px;
}
.post-body{
  font-size: 15px;
}
</style>
