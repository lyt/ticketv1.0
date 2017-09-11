<template>
  <el-col :span="6" class="block">
    <el-collapse v-model="activeName">
      <el-collapse-item title="人员" name="1">
        <div>提交者：<span class="co_blue">{{ leftdata.reported }}</span></div>
        <div>分配者：<span class="co_blue">{{ leftdata.assigned_to_name }}</span></div>
      </el-collapse-item>
      <el-collapse-item title="日期" name="2">
        <div>提交时间：<span>{{ leftdata.created_at }}</span></div>
        <div>上次更新：<span>{{ leftdata.updated_at }}</span></div>
      </el-collapse-item>
      <el-collapse-item title="工作流程" name="3">
        <div>状态：<span>{{ leftdata.state_name }}</span></div>
      </el-collapse-item>
  </el-collapse>
</el-col>
</template>
<script>
export default {
  props: ['leftdata'],
  data () {
    return {
      activeName: ['1', '2', '3']
    }
  }
}
</script>

<style scoped>
.block {
  box-shadow: 0 0 4px 2px #ddd;
  border-radius: 4px;
}
.co_blue {
  color: #08c;
}
.item-title {
  color: #688586;
}
.col-item{
  text-decoration: none;
  padding-left:10px;
  font-size: 14px;
  line-height:2;
}
.hand {
  cursor: pointer;
}
</style>
