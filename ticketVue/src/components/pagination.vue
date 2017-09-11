<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 25, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>
<script>
  export default {
    props: ['pageSize', 'total', 'currentPage'],
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        // this.pageSize = val
        // this.currentPage = '1'
        console.log(`发起请求， 当前页为: ${this.currentPage} 每页数据:${this.pageSize}条`)
      },
      handleCurrentChange (val) {
        // this.currentPage = val
        console.log(`发起请求， 当前页为: ${this.currentPage} 每页数据:${this.pageSize}条`)
      }
    },
    data () {
      return {
        // pagesize: 25,
        // total: 100,
        // currentPage: 1
      }
    }
  }
</script>
