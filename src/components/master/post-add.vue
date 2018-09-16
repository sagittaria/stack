<template>
  <div class="post-editor">
    <div class="post-edit">
      <div class="post-edit-category-and-title">
        <el-select class="post-category" v-model="post.category" size="mini">
          <el-option v-for="c in categories" v-bind:key="c" :label="c" :value="c"></el-option>
        </el-select>
        <el-input class="post-title" v-model="post.title" size="mini"/>
        <el-button type="primary" plain size="mini" @click="doSavePost">save</el-button>
      </div>
      <div class="post-tags-row">
        <el-tag :key="tag" v-for="tag in post.tags" type="danger" size="small"
                closable @close="handleClose(tag)">{{tag}}
        </el-tag>
        <el-input style="width:90px;"
          v-if="newTagInputVisible"
          v-model="newTagInputValue"
          ref="saveNewTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else type="default" size="mini" @click="showInput" plain>+ New Tag</el-button>
      </div>
      <el-input type="textarea" :autosize="{minRows: 32, maxRows: 32}" class="post-body" v-model="post.body"/>
    </div>
    <div class="post-preview" v-html="postPreviewHtml"></div>
  </div>
</template>

<script>
import util from '@/assets/util.js'
import axios from 'axios'

export default {
  data () {
    return {
      categories: ['tech', 'idea', 'other'],
      post: {
        category: 'other',
        title: '',
        body: '',
        updatedAt: '',
        tags: []
      },
      newTagInputVisible: false,
      newTagInputValue: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPost()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.resetNewPost()
    next()
  },
  methods: {
    handleClose (tag) {
      this.post.tags.splice(this.post.tags.indexOf(tag), 1)
    },
    showInput () {
      this.newTagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveNewTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let newTag = this.newTagInputValue
      if (newTag) {
        this.post.tags.push(newTag)
      }
      this.newTagInputVisible = false
      this.newTagInputValue = ''
    },
    resetNewPost () { // 先进编辑页面、再到新增，此时已编辑的旧文应该被清空
      this.post = {category: 'other', title: '', body: '', updatedAt: '', tags: []}
    },
    getPost () {
      let self = this
      let id = self.$route.params.id
      if (id) {
        axios.get(util.api.post + id).then(resp => {
          // console.log(resp)
          self.post = resp.data
        })
      }
    },
    doSavePost () { // 保存或更新
      this.post.updatedAt = util.kits.moment.utc().format('YYYY-MM-DD HH:mm:ss') // 按UTC时间存
      let id = this.$route.params.id
      let self = this
      if (id) {
        axios.put(util.api.post + id, self.post).then(resp => {
          // console.log(resp)
          self.$router.push({name: 'post-all'})
        }, err => {
          console.log(err)
        })
      } else {
        axios.post(util.api.post, self.post).then(resp => {
          // console.log(resp)
          self.$router.push({name: 'post-all'})
        }, err => {
          console.log(err)
        })
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
.post-title{
  margin: auto 5px;
}
.post-tags-row{
  text-align: left;
  margin: 6px auto;
}
.el-tag{
  margin-right: 6px;
}
.post-preview{
  text-align: left;
  border-left: 1px solid #f2f2f2;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
