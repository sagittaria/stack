<template>
  <div class="aside-menu">
    <div class="aside-menu-block">
      <div class="aside-menu-bar">
        <i class="el-icon-goods"></i> Category <small style="color:#d3d3d3;float:right;"> - Cached at {{lastCachedAt}}</small>
      </div>
      <div class="aside-menu-content">
        <div class="post-category"> - idea({{categoryCount.idea}})</div>
        <div class="post-category"> - tech({{categoryCount.tech}})</div>
        <div class="post-category"> - other({{categoryCount.other}})</div>
      </div>
    </div>
    <div class="aside-menu-block">
      <div class="aside-menu-bar"><i class="el-icon-star-off"></i> Tags</div>
      <div class="aside-menu-content">
        <el-tag type="danger" size="mini" v-for="t in tagsCount" v-bind:key="t.tag">{{t.tag}}({{t.cnt}})</el-tag>
      </div>
    </div>
    <div class="aside-menu-block">
      <div class="aside-menu-bar"></div>
      <div class="aside-menu-content">
        <el-input prefix-icon="el-icon-search" placeholder=" 有钱的捧个钱场~" size="mini"></el-input>
        <div><img src="/static/card.jpeg" style="width:100%;"/></div>
        <div><i class="el-icon-arrow-right"></i> 没钱的，您也捧个钱场呀~</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  computed: {
    categoryCount () {
      return this.$store.state.cache.categoryCount
    },
    tagsCount () {
      return this.$store.state.cache.tagsCount
    },
    lastCachedAt () {
      return this.$store.getters.normalizedLastCachedAt
    }
  }
}
</script>

<style scoped>
  .aside-menu{
    color: #D4002A;
    text-align: left;
  }
  .aside-menu-block{
    font-size: 1.1rem;
    min-height:120px;
    margin-bottom:1.3em;
  }
  .aside-menu-bar{
    font-size: 1.2rem;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 0.8em;
    margin-bottom: 0.4em;
  }
  .post-category{
    cursor: pointer;
    line-height:2em;
  }
  .el-tag{
    margin: 5px;
  }
</style>
