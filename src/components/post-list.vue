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
            <div class="a-post-updated-at">{{post.updatedAt}}</div>
          </div>
        </div>
        <div class="a-post-body">
          <span v-if="post.showAll">{{post.body}}</span>
          <span v-else>{{truncatedPostBody(post.body, 100)}}</span>
          <a href="javascript:void(0)" @click="toggleDisplay(post)">{{post.showAll ? 'Less' : 'All'}}</a></div>
      </div>
    </template>
  </div>
</template>

<script>
import util from '@/assets/util.js'

export default {
  data () {
    return {
      postList: [{
        _id: '123',
        category: 'idea',
        title: 'Self introduction from VBPbpd',
        tags: ['瞎搞', '后现代'],
        updatedAt: '2018-08-13 17:00:00',
        body: 'In View,a humble VaudeVillian Veteran cast Vicariously as both Victim and Villain by the Vicissitudes of fate.This Visage,no mere Veneer of Vanity is a Vestige of the Vox populi,now Vacant,Vanished.However,this Valorous Visitation of a bygone Vexation stands Vivified and has Vowed to Vanquish these Venal and Virulent Vermin Vanguarding Vice'
        // showAll: false
      }, {
        _id: '234',
        category: 'tech',
        title: '2nd 部分 of V Self bp 的介绍',
        tags: ['瞎搞', '后现代'],
        updatedAt: '2018-08-12 18:00:00',
        body: ' and Vouchsafing the Violently Vicious and Voracious Violation of Volition.The only Verdict is Vengeance,a Vendetta held as a VotiVe not in Vain,for the Value and Veracity of such shall one day Vindicate the Vigilant and the Virtuous.Verily,this Vichyssoise of Verbiage Veers most Verbose. So let me simply add that it\'s my Very good honor to meet you and you may call me V.'
        // showAll: false
      }, {
        _id: '456',
        category: 'tech',
        title: '2nd 部分 of V Self bp 的介绍',
        tags: ['瞎搞', '后现代'],
        updatedAt: '2018-08-12 18:00:00',
        body: 'So let me simply add that it\'s my Very good honor to meet you and you may call me V.'
        // showAll: false
      }]
    }
  },
  methods: {
    markdownalize (text) {
      let markdownalHtml = text
      // 用意是将text做成markdown格式
      return markdownalHtml
    },
    truncatedPostBody (text, len) {
      return util.kits.truncate(text, len)
    },
    toggleDisplay (post) {
      let self = this
      if (typeof post.showAll === 'undefined') {
        self.$set(post, 'showAll', true) // 必须滴...见https://cn.vuejs.org/v2/guide/reactivity.html
      } else {
        post.showAll = !post.showAll
      }
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
  color:white;
  background-color: #d4002a;
  padding:0 1rem;
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
