<template>

  <div class="grid-content bg-purple">
    <ul id="repeat-object" style="margin-top: 10px" v-loading="listLoading">
      <li v-for="(item,index) in list"  class="rightListLi">
        <h4 style="color: #1D8CE0">

          <a :href="'/home/detail/' + item.id+ '/' + item.order_nr" target="_blank">
            {{item.summary}}
          </a>

          <el-button type="primary" size="mini" style="float: right;padding-right: 10px;padding-left: 10px">{{item.assigned_to_name}}</el-button>
        </h4>
        <small class="graycolor">
          {{item.description}}
        </small>

        <div class="">
          <!-- 状态 btn-->
          <el-button size="mini" :title="'工单状态：' + item.state" class="defaultbutton">{{item.issue_type}}</el-button>
          <el-button size="mini" :title="'工单状态：' + item.state" :class="item.state === '正在处理'? 'success':''" class="defaultbutton">
            {{item.state}}
          </el-button>
          <el-button size="mini" :title="'优先级：' + item.issue_priroity" class="defaultbutton">{{item.issue_priroity}}</el-button>
          <el-button size="mini" class="defaultbutton">{{item.reported}}</el-button>
          <el-button size="mini" class="defaultbutton">{{item.created_at | formatDate}}</el-button>
          <el-button size="mini" :class="item.comments_count > 0 ? 'comments-present':''" class="defaultbutton">{{item.comments_count}}条评论</el-button>
          <!-- 状态 -->
        </div>

      </li>
    </ul>
  </div>
  <!-- <pagination :pageSize="pageSize" :total="total" :currentPage="currentPage"></pagination> -->
  <!-- <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="list.currentPage"
    :page-sizes="[10, 25, 50, 100]"
    :page-size="list.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="list.total"
    v-if="list.ret"
    >
  </el-pagination> -->

</template>
<script>
import {formatDate} from '../utils/date'
export default {
  props: ['list', 'listLoading'],
  data () {
    return {
      search: ''
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
  }
}
</script>
<style scoped>
li{
  line-height: 2
}
.rightListLi {
  background: #fff;
  border-radius: 4px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-left: 6px solid #13CE66;
  margin-bottom: 5px;
  line-height: 1.4
}
.defaultbutton {
  border-color: #ddd;
  cursor: default;
  background: #f0f0f0;
  color: #b8b8b8;
  padding: 4px 15px
}
button.comments-present {
  color: #333;
  background-color: #FCFCE9;
  font-weight: bold;
}
button.success {
  color: #468847;
  background-color: #d6e9c6;
}
</style>
