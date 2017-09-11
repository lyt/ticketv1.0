<template>
<el-col :span="9">
  <div class="grid-content bg-purple block">
    <ul class="repeat-object">
      <el-alert
        title="根据属性过滤"
        :closable="false"
        type="success"
        >
      </el-alert>
      <div style="margin-bottom:10px"></div>
      <li v-for="(item,index) in sidebar">
         <router-link :to="{path:'/home/list',query: {state: index, title: item.title}}" @click.native="getparams">{{ item.title }}</router-link>
      </li>

    </ul>
    <div style="margin-bottom:10px"></div>
    <!-- <el-alert
      title="根据关键字过滤"
      :closable="false"
      type="success"
      >
    </el-alert> -->
    <!-- <div style="margin-bottom:5px"></div> -->

		<!-- <el-menu default-active='' class="el-menu-vertical-demo sidebar" @open="handleopen" @close="handleclose" @select="handleselect"
			 unique-opened router v-show="!collapsed" style="background: 0">
			<template v-for="(item,index) in list.activeNames" style="background: 0">
				<el-submenu :index="index+''" style="background: 0;">
					<template slot="title">{{item.title}}</template>
					<div v-for="(child,index) in item.children" index="" class="linkState">
            <router-link tag="li" :to="{path:'/home/list',query: {state: index,}}" @click.native="getparams">{{ child.text }}</router-link>
          </div>
				</el-submenu>
			</template>
		</el-menu> -->
  </div>
</el-col>
</template>
<script>
export default {
  props: ['list', 'sidebar'],
  data () {
    return {
    }
  },
  methods: {
    handleopen () {
      // console.log('handleopen')
    },
    handleclose () {
      // console.log('handleclose');
    },
    handleselect: function (a, b) {
    },
    // 折叠导航栏
    // collapse () {
    //   this.collapsed = !this.collapsed
    // },
    getparams () {
      // console.log(this.$route.query.state)
      var state = this.$route.query.state
      this.$emit('my-event', state)
    }
  }
}
</script>
<style scoped>
li{
  line-height: 2.4;
  cursor: pointer;
  font-size: 14px;
}
li a {
  display: block;
  padding-left: 20px;
  border-radius: 4px;
}
li a.router-link-exact-active {
  background: #dff0d8
}
li:hover {
  background: #dff0d8
}
li.el-submenu {
  padding-left: 10px;
  /*text-indent: 10px;*/
  margin-left: 0;
  list-style: none;
}
.is-active {
  color: inherit;
}
.linkState {
  margin-left: 15px;height: 40px; line-height: 40px;
  cursor: pointer;
}
</style>
