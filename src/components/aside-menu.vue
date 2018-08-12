<template>
  <div class="aside-menu">
    <div class="aside-menu-block">
      <div class="aside-menu-bar"><i class="el-icon-goods"></i> Category</div>
      <div class="aside-menu-content">
        <div class="post-category"> - idea</div>
        <div class="post-category"> - tech</div>
        <div class="post-category"> - other</div>
      </div>
    </div>
    <div class="aside-menu-block">
      <div class="aside-menu-bar"><i class="el-icon-star-off"></i> Tags</div>
      <div class="aside-menu-content">
        <el-tag type="danger" size="mini">琵琶</el-tag>
      </div>
    </div>
    <div class="aside-menu-block">
      <div class="aside-menu-bar"></div>
      <div class="aside-menu-content">
        <el-input prefix-icon="el-icon-search" size="mini"></el-input>
      </div>
    </div>
  </div>
</template>

<script>

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
  }
</style>
