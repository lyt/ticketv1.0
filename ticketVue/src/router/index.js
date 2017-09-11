import Vue from 'vue'
import Router from 'vue-router'
import dashboardscomponent from '@/components/dashboard'
import contentcomponent from '@/components/contentcomponent'
import rightList from '@/components/rightList'
import newcomponent from '@/components/newcomponent'
import excelcomponent from '@/components/excelcomponent'
import detailcomponent from '@/components/orderDetailList'
Vue.use(Router)

// const Firstcomponent = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home/list'
    },
    {
      path: '/home/list',
      name: 'home',
      component: contentcomponent,
      children: [
        {path: '/home/list', component: rightList}
      ]
    },
    {
      path: '/dashboard',
      component: dashboardscomponent
    },
    {
      path: '/home/detail/:id/:ordersn',
      component: detailcomponent
    },
    {
      path: '/new',
      component: newcomponent
    },
    {
      path: '/excel',
      component: excelcomponent
    }
  ]
})
