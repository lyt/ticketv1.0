<template>
  <el-row style="padding: 20px">
    <orderDetailSidebar :leftdata = "orderdata.dataArry"></orderDetailSidebar>
    <orderDetailMain :rightdata = "orderdata"></orderDetailMain>
  </el-row>
</template>

<script>
import orderDetailSidebar from './orderDetailSidebar'
import orderDetailMain from './orderDetailMain'
import { getOrderdetail, getOrderClothesInfo } from '../api/api'
import { appConfig, fixCacheData } from '../data/cacheData'

export default {
  data () {
    return {
      ordersn: '',
      orderdata: {
        pro: [],
        state_name: '',
        dataArry: '',
        clotheslist: [],
        isFanxi: false,
        issue_states: '', // 工单状态
        issue_sources: appConfig.issue_sources, // 工单来源
        notclose_reasons: appConfig.notclose_reasons, // 未关闭原因
        duty_groups: appConfig.duty_groups, // 责任部门
        cities: appConfig.cities, // 城市选择
        teams: appConfig.teams // 改派给
      }
    }
  },
  components: {orderDetailSidebar, orderDetailMain},
  methods: {
    fetchData () {
      // 获取路由参数
      var orderId = this.$route.params.id
      var ordersn = this.$route.params.ordersn
      // 获取订单详情
      getOrderdetail(orderId).then((response) => {
        var dataArry = response.data.data
        this.orderdata.state_name = dataArry.state_name
        this.orderdata.dataArry = dataArry
        // 工单状态下一步选择
        this.orderdata.issue_states = appConfig.issue_state_transitions[this.orderdata.dataArry.state]
        console.log(this.orderdata.dataArry)
      })
      // 获取衣物信息列表
      getOrderClothesInfo(ordersn).then((response) => {
        var clothesLists = response.data.data
        // 是否有返洗列表
        if (clothesLists.order_list.length > 1) {
          this.orderdata.isFanxi = true
        }
        for (var i = 0; i < clothesLists.order_clothes_lists.length; i++) {
          var temp = clothesLists.order_clothes_lists[i]
          temp.clothes = ''
          for (var j = 0; j < clothesLists.order_clothes_lists[i].problems.length; j++) {
            this.orderdata.pro.push(clothesLists.order_clothes_lists[i].problems[j].name)
          }
          temp.clothes = this.orderdata.pro.join(' ')
          this.orderdata.pro = []
        }
        this.orderdata.clotheslist = clothesLists
        // console.log(this.orderdata.clotheslist)
      })
    }
  },
  created () {
    this.fetchData()
  },
  beforeCreate () {
    fixCacheData()
  }
}
</script>
<style>

</style>
