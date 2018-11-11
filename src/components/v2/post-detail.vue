<template>
  <div class="post-detail">
    <div class="post-head">{{post.title}}</div>
    <div class="post-body" v-html="postBodyHtml"></div>
  </div>
</template>

<script>
import util from '@/assets/util.js'

export default {
  name: 'post-detail',
  data () {
    return {}
  },
  computed: {
    post () {
      let ts = this.$route.params.ts
      return this.$store.getters.extract(ts)
    },
    postBodyHtml () {
      return util.filters.md2htmlFilter(this.post.body)
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
