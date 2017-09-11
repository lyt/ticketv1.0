<template>
  <div id="home">
    <navMenu></navMenu>
    <router-view></router-view>
  </div>

</template>
<script>
import navMenu from './components/headercomponent'
export default{
  name: 'home',
  data () {
    return {
    }
  },
  components: { navMenu }
}
</script>
<style>
body {
  background: #f3f3f3;
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
h1,h2,h3,h4,h5,p,ul,li {
  margin: 0;
  padding: 0;
}
.block {
  background: #fff;
  box-shadow: 0 0 4px 2px #ddd;
  border-radius: 4px;
  padding: 15px;
}
h2{
  text-align: center;
}
li {
  list-style: none
}
a {
  color: inherit;
  text-decoration: none;
}
.graycolor {
  color: #D3DCE6
}
.sidebar .el-submenu .el-menu {
  background: 0
}
.sidebar .el-submenu__title {
  background: 0;
  line-height: 36px;
  height: 36px;
}
.itembadge {
  position: absolute;
  right: 0px;
}
.itembadge .el-badge__content {
  background-color: #aaa;
  /*line-height: 1.2;*/
  padding-top: 2px;
}
.el-date-range-picker.has-sidebar {
  margin-left: 20px
}
.itembadge .el-badge__content {
  background-color: #aaa;
}
.el-date-range-picker.has-sidebar {
  margin-left: 20px;
}
.el-table--border td.el-table__expand-column,.el-table--border th.el-table__expand-column {
  border-right: 0;
}
</style>
