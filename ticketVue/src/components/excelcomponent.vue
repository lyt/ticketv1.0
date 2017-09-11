<template>
  <el-row :span="24" style="padding: 20px">
    <div style="padding-bottom: 20px;text-align:right">
      <el-button type="primary" @click="handleDownload">导出Excel</el-button>
    </div>
    <datetime></datetime>
    <stPublic :list="list.tags" title="标签" offset="1" id="tags"></stPublic>

    <stPublic :list="list.states" title="订单状态" id="states"></stPublic>

    <stPublic :list="list.departments" title="分配给部门" id="departments"></stPublic>

  </el-row>
</template>

<script>
import datetime from './datetime'
import stPublic from './st-public'
import { appConfig, fixCacheData } from '../data/cacheData'
export default {
  data () {
    return {
      list: {
        departments: appConfig.teams,
        tags: appConfig.labels,
        states: appConfig.issue_states
      }
    }
  },
  beforeCreate () {
    fixCacheData()
  },
  methods: {
    getMyEvent (state) {
      this.state = state
      console.log(this.state)
    },
    handleDownload () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../vendor/Export2Excel')
        const tHeader = ['日期', '提交部门', '责任部门', '问题类型', '状态', '订单号', '联系人-电话', '问题描述', '具体描述', '处理日期-处理结果', '提交人', '工单类别-标签', '衣物问题']
        const filterVal = ['label', 'fabuteams', 'duty', 'type', 'state', 'ordersn', 'tel', 'desc', 'desc2', 'date', 'update', 'name', 'tag', 'problems']
        const list = this.list.departments
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '工单列表')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  components: {datetime, stPublic}
}
</script>
<style scoped>
td {
  vertical-align: top;
}
</style>
