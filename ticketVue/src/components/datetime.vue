<template>
  <el-col :span="6" class="block">
    <div>
      <span class="demonstration">创建时间</span>
      <div style="height: 10px"></div>
      <el-date-picker
        v-model="value4"
        type="daterange"
        :picker-options="pickerOptions"
        placeholder="选择时间范围"
        align="right">
      </el-date-picker>
    </div>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }]
      },
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: ''
    }
  }
}
</script>
<style scoped>
.el-date-editor--datetimerange.el-input {
  width: 100%
}
.el-date-range-picker.has-sidebar {
}
</style>
