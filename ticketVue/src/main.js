// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Home from './Home'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueSimplemde from 'vue-simplemde'

window.www = new Vue()

// 开启debug模式
Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueSimplemde)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#home',
  router,
  template: '<Home/>',
  components: { Home }
})
