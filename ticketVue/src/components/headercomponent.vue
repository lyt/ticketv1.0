<template>
  <div class="">
  <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <el-menu-item index="1">
          <router-link to="/">e袋洗工单系统</router-link>
        </el-menu-item>
      </el-col>
      <el-col :span="12">
      <el-menu-item index="2" style="float: right">
          <div class="grid-content bg-purple">
            <router-link to="/new">新建工单</router-link>
            <a :href="link" target="_blank" style="margin-left: 15px">导出Excel</a>
            <!-- <router-link to="/excel">
              导出Excel
            </router-link> -->

            <!-- <a :href="/excel" target="_blank" style="margin-left: 15px">导出Excel</a> -->
            <el-dropdown trigger="click" style="margin-left: 15px">
                  <span class="el-dropdown-link">
                      {{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="loginout">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </div>
      </el-menu-item>
      </el-col>
    </el-row>
  </el-menu>
</div>
</template>

<script>
  export default {
    data () {
      return {
        link: '/excel',
        username: '吴迪'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
<style scoped>
a {
  text-decoration: none;
  color: #bfcbd9;
},
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    color: #bfcbd9;
}
</style>
