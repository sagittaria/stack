<template>
  <div class="post-editor">
    <div class="post-edit">
      <div class="post-edit-category-and-title">
        <el-select class="post-category" v-model="post.category" clearable>
          <el-option v-for="c in categories" v-bind:key="c" :label="c" :value="c"></el-option>
        </el-select>
        <el-input class="post-body" v-model="post.title"/>
      </div>
      <el-input type="textarea" :autosize="{ minRows: 32, maxRows: 32}" class="post-body" v-model="post.body"/>
    </div>
    <div class="post-preview" v-html="postPreviewHtml"></div>
  </div>
</template>

<script>
import util from '@/assets/util.js'

export default {
  data () {
    return {
      categories: ['nonsense', 'boring'],
      post: {
        category: '',
        title: '',
        body: '',
        tags: []
      }
    }
  },
  computed: {
    postPreviewHtml () {
      return util.kits.preview(this.post.body)
    }
  }
}

</script>

<style scoped>
.post-editor, .post-edit-category-and-title{
  display: flex;
}
.post-edit, .post-preview{
  width:50%;
  height:768px;
}
.post-preview{
  text-align: left;
  border-left: 1px solid #f2f2f2;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
