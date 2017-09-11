<template>
  <div class="">
    <el-row style="padding: 20px">
      <sidebar :sidebar="leftMenu" @my-event="getMyEvent"></sidebar>

      <el-col :span="14" :offset="1">
        <el-col :span="6" style="margin-top: 6px">
          <router-link to="/new"><el-button type="primary" size="small">创建</el-button></router-link>
          <!-- <el-button type="" size="small">刷新</el-button> -->
          <el-button type="" size="small" @click="refresh">刷新</el-button>
        </el-col>
        <el-col :span="18">
          <el-input
            placeholder="关键字或日期（格式：2014-01-01）搜索"
            icon="search"
            v-model="search"
            :on-icon-click="handleIconClick">
          </el-input>
        </el-col>
        <div id="app">
          <transition name="fade"
  		            mode="out-in">
      			<router-view :list="searchData" :listLoading="listLoading" ></router-view>
      		</transition>
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total"
            v-if="list.ret"
            >
          </el-pagination>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import sidebar from './sidebar'
import { getListData } from '../api/api'
import { cacheConfig } from '../data/cacheData'
export default {
  data () {
    return {
      search: '',
      listLoading: false,
      pageSize: 10,
      currentPage: 1,
      // 列表数据及配置信息
      list: {
      },
      leftMenu: [
        {title: '所有工单'},
        {title: '待处理工单'},
        {title: '处理中工单'},
        {title: '已申请关闭工单'},
        {title: '已确认关闭工单'},
        {title: '我提交的待处理工单'},
        {title: '我提交的处理中工单'},
        {title: '我提交的已申请关闭工单'},
        {title: '我提交的已确认关闭工单'},
        {title: '7天未关闭工单'}
      ]
    }
  },
  created () {
    cacheConfig()
  },
  methods: {
    getMyEvent () {
      // this.state = state
      // var params = this.$route.query
      // console.log(params)
      // this.getFetchData()
    },
    getFetchData () {
      const params = this.$route.query
      console.log(params)
      let para = {
        state: params.state,
        title: params.title
      }
      this.listLoading = true
      getListData(para).then((response) => {
        // var dataAr = response.data
        this.listLoading = false
      })
    },
    getList () {
      this.listLoading = true
      let para = {
        page_index: this.currentPage,
        page_size: this.pageSize
      }
      getListData(para).then(response => {
        var dataAr = response.data
        this.list = dataAr
        this.listLoading = false
        console.log(dataAr)
      })
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      console.log(`发起请求， 当前页为: ${this.currentPage} 每页数据:${this.pageSize}条`)
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`发起请求， 当前页为: ${this.currentPage} 每页数据:${this.pageSize}条`)
      this.getList()
    },
    refresh () {
      this.currentPage = 1
      this.getList()
    }
  },
  mounted () {
    // 生命周期 默认进来请求数据
    this.getList()
  },
  computed: {
    searchData () {
      var search = this.search
      console.log(this.search)
      if (search) {
        return this.list.data.filter(function (product) {
          console.log(product)
          return Object.keys(product).some(function (key) {
            return String(product[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.list.data
    }
  },
  components: {sidebar}
}
</script>
<style scoped>
#app {
	-webkit-font-smoothing: antialiased;
  margin-top: 50px;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
</style>
