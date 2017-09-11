<template>
  <el-col :span="7">
    <div class="grid-content bg-purple block">
      <ul>
        <li>
          <p class="listTitle">{{leftlist.itemTitle}}
            <span style="font-weight:bold;color:#aaa;">({{leftlist.itemNum}})</span>
          </p>
          <p style="padding:10px 0 0 10px; position: relative">
            <router-link to="/home/list" style="color:#498cc8">
              <i class="el-icon-star-on"></i> {{ leftlist.listname }}
              <el-badge :value="leftlist.orderNum" class="itembadge">
              </el-badge>
            </router-link>
          </p>
        </li>
      </ul>
    </div>
  </el-col>
</template>
<script>
export default {
  props: ['leftlist']
}
</script>
<style scoped>
.listTitle {
  background-color:#ddd;
  padding-left: 20px;
  height: 30px;
  line-height: 2;
}
</style>
