<template>
  <div class="order_details">
    <el-col :span="17" :offset="1">
    <ul class="state-info">
      <li>状态：</li>
      <li>
        <span v-if="ischange" style="margin:0;">{{changestate_name}}</span>
        <span v-else style="margin:0;">{{rightdata.state_name}}</span>
        <span>|</span>
      </li>
      <li class="selectouter">转变为：
        <el-select v-model="selectarr.changestate" size="mini" placeholder="请选择"  @change="selectOrderStateChange">
          <el-option
            v-for="(issue,index) in rightdata.issue_states"
            :label="issue.name"
            :value="issue.value">
          </el-option>
        </el-select>
      <span>|</span>
      </li>
      <li>改派为：
        <el-select v-model="rightdata.dataArry.assigned_to_name" size="mini" placeholder="请选择" @change="selectOrderAssignedToName">
          <el-option
            v-for="teams in rightdata.teams"
            :label="teams.name"
            :value="teams.name">
          </el-option>
        </el-select>
      <span>|</span>
      </li>
      <li>工单来源：
        <el-select v-model="rightdata.dataArry.issue_source_name" size="mini" placeholder="请选择" @change="selectIssueSources">
          <el-option
            v-for="(source,index) in rightdata.issue_sources"
            :label="source.name"
            :value="source.name">
          </el-option>
        </el-select>
      <span>|</span></li>
      <li>工单城市：
        <el-select v-model="rightdata.dataArry.city" size="mini" placeholder="请选择" @change="selectCity">
          <el-option
            v-for="item in rightdata.cities"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      <span>|</span></li>
      <li>未关单原因：
        <el-select v-model="rightdata.dataArry.notclose_reason" size="mini" placeholder="请选择" @change="selectNotCloseReason">
          <el-option
            v-for="(reasons,index) in rightdata.notclose_reasons"
            :label="reasons.name"
            :value="reasons.name">
          </el-option>
        </el-select>
      <span>|</span></li>
      <li>责任部门：
        <el-select v-model="rightdata.dataArry.duty_group" size="mini" placeholder="请选择" @change="selectDutyGroup">
          <el-option
            v-for="(duty_groups,index) in rightdata.duty_groups"
            :label="duty_groups.name"
            :value="duty_groups.name">
          </el-option>
        </el-select>
      </li>
    </ul>
  </el-col>
    <el-col :span="17" class="block" :offset="1">
      <h4>{{ rightdata.dataArry.summary }}</h4>
      <p class="p_info">{{ rightdata.dataArry.description }}</p>
      <div class="">
        <!-- 状态 btn-->
        <el-button size="mini" :title="'工单状态：' + rightdata.dataArry.issue_type" class="defaultbutton">{{rightdata.dataArry.issue_type}}</el-button>
        <el-button size="mini" :title="'优先级：' + rightdata.dataArry.issue_priroity" class="defaultbutton">{{rightdata.dataArry.issue_priroity}}</el-button>
        <el-button size="mini" class="defaultbutton" style="color:#fff;background-color:#555">{{ rightdata.dataArry.summary}}</el-button>
        <!-- 状态 -->
      </div>
      <div class="p_info">订单编号：<router-link to='/siebar' class="co_blue">{{ rightdata.dataArry.summary }}</router-link></div>

      <!-- 衣物详情订单关系 start-->
      <table class="tableStyle"  style="border-collapse: collapse;width: 100%; text-align: center;margin-bottom:10px;" v-if="rightdata.isFanxi">
        <tr>
          <th>订单关系</th>
          <th>订单号</th>
        </tr>
        <tr>
          <td>
            原订单号
          </td>
          <td>{{rightdata.clotheslist.order_list[0].ordersn}}</td>
        </tr>
        <tr v-if="index>0" v-for="(order, index) in rightdata.clotheslist.order_list">
          <td>
            {{index}}次返洗单
          </td>
          <td>
          {{order.ordersn}}
        </td>
        </tr>
      </table>
      <!-- 衣物详情订单关系 over-->
      <p>衣物明细：</p>
      <el-table
        :data="rightdata.clotheslist.order_clothes_lists"
        stripe
        style="width: 100%">
        <el-table-column
          prop="clothes_name"
          label="衣物名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="color"
          label="衣物颜色"
          width="180">
        </el-table-column>
        <el-table-column
          prop="brand"
          label="衣物品牌">
        </el-table-column>
        <el-table-column
         label="衣物备注"
         prop="clothes"
         >
       </el-table-column>
       <el-table-column
        prop="flaw"
        label="问题类别">
      </el-table-column>
      </el-table>
      <div class="comment">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">{{ rightdata.dataArry.comments_count }} 条评论</span>
          </el-tab-pane>
          <div class="p_info" v-for="(coms, index) in rightdata.dataArry.comments">
            <p>
              <span class="co_blue fon_blod"> {{ coms.user_name }}</span>
              <span class="comment-date">{{ coms.created_at }} </span>
            </p>
            <p>{{ coms.message }}</p>
            <div class="borderD"></div>
          </div>
          <p class="fon_blod margin14">* Message</p>
          <el-form ref="form" :model="form">
            <el-form-item label="">
              <!-- <el-input
                type="textarea"
                :rows="4"
                v-model="form.textarea">
              </el-input> -->
              <div class="commentsarea">
                <markdown-editor v-model="form.comment.message" ref="markdownEditor"></markdown-editor>
              </div>
                <p class="margin14">Markdown enabled</p>
              <el-button @click='onSubmit'>Create Comment</el-button>
            </el-form-item>
          </el-form>
        </el-tabs>
      </div>
    </el-col>
  </div>
</template>
<script>
import { markdownEditor } from 'vue-simplemde'
import {
  postaddComments,
  postOrderStateChange,
  postOrderAssignedToName,
  postIssueSources,
  postCity,
  postNotCloseReason,
  postDutyGroup
} from '../api/api'

export default {
  props: ['rightdata'],
  data () {
    return {
      changestate_name: '',
      ischange: false,
      selectarr: {
        changestate: '',
        assigned_to_id: '',
        issue_sources_id: '',
        city: '',
        notclose_reasons_id: '',
        duty_group_id: ''
      },
      form: {
        comment: {
          issue_id: '',
          message: ''
        }
      },
      beizhu: ''
    }
  },
  methods: {
    selectOrderStateChange (ele) {
      let params = {
        orderId: this.$route.params.id,
        selected: ele
      }
      // 修改工单状态
      postOrderStateChange(params).then((response) => {
        if (response.data.ret) {
          this.changestate_name = ele
        } else {
          console.log(response.data.error_msg)
        }
      })
    },
    // 该派给  ！！！返回false error_msg":{"assigned_to":["must exist"]}}
    selectOrderAssignedToName (ele) {
      for (let i in this.rightdata.teams) {
        if (Object.prototype.hasOwnProperty.call(this.rightdata.teams, i)) {
          console.log(i, ':', this.rightdata.teams[i].name)
          if (this.rightdata.teams[i].name === ele) {
            this.selectarr.assigned_to_id = i
            break
          }
        }
      }
      let params = {
        orderId: this.$route.params.id,
        selected: this.selectarr.assigned_to_id
      }
      // console.log(params)
      postOrderAssignedToName(params).then((response) => {
        if (response.data.ret) {
          console.log(response.data.ts)
        } else {
          console.log(response.data.error_msg)
        }
      })
    },
    // 工单来源
    selectIssueSources (ele) {
      for (let i in this.rightdata.issue_sources) {
        if (Object.prototype.hasOwnProperty.call(this.rightdata.issue_sources, i)) {
          if (this.rightdata.issue_sources[i].name === ele) {
            this.selectarr.issue_sources_id = i
            break
          }
        }
      }
      let params = {
        orderId: this.$route.params.id,
        selected: this.selectarr.issue_sources_id
      }
      postIssueSources(params).then((response) => {
        if (response.data.ret) {
          console.log(response.data.ts)
        } else {
          console.log(response.data.error_msg)
        }
      })
    },
    // 工单城市
    selectCity (ele) {
      let params = {
        orderId: this.$route.params.id,
        selected: ele
      }
      postCity(params).then((response) => {
        if (response.data.ret) {
          console.log(response.data.ts)
        } else {
          console.log(response.data.error_msg)
        }
      })
    },
    // 工单未关闭原因
    selectNotCloseReason (ele) {
      for (let i in this.rightdata.notclose_reasons) {
        if (Object.prototype.hasOwnProperty.call(this.rightdata.notclose_reasons, i)) {
          if (this.rightdata.notclose_reasons[i].name === ele) {
            this.selectarr.notclose_reasons_id = i
            break
          }
        }
      }
      let params = {
        orderId: this.$route.params.id,
        selected: this.selectarr.notclose_reasons_id
      }
      postNotCloseReason(params).then((response) => {
        if (response.data.ret) {
          console.log(response.data.ts)
        } else {
          console.log(response.data.error_msg)
        }
      })
    },
    // 工单责任部门
    selectDutyGroup (ele) {
      for (let i in this.rightdata.duty_groups) {
        if (Object.prototype.hasOwnProperty.call(this.rightdata.duty_groups, i)) {
          if (this.rightdata.duty_groups[i].name === ele) {
            this.selectarr.duty_group_id = i
            break
          }
        }
      }
      // 获取路由参数
      let orderId = this.$route.params.id
      let params = {
        orderId: orderId,
        selected: this.selectarr.duty_group_id
      }
      console.log(params)
      postDutyGroup(params).then((response) => {
        if (response.data.ret) {
          console.log(response.data.ts)
        } else {
          console.log(response.data.error_msg)
        }
      })
    },
    onSubmit (form) {
      this.form.comment.issue_id = this.rightdata.dataArry.id
      console.log(this.form)
      var formData = this.form
      console.log(formData)
      postaddComments(formData).then((response) => {
        console.log(response.ret)
      })
    }
  },
  components: {markdownEditor}
}
</script>

<style>
.commentsarea {
  border-radius: 4px;
}
 .commentsarea .CodeMirror
{
  height: 100px;
  min-height: 100px;
}
.commentsarea .editor-statusbar {
  padding: 0 10px;
}
</style>
<style scoped>
.state-info {
  font-size: 14px;
  color: #333;
}
.state-info .el-select {
  width: 100px;
}
.state-info li {
  margin-bottom: 10px;
  float: left;
}
.state-info span{
  margin: 0 12px;
}
.block {
  box-shadow: 0 0 4px 2px #ddd;
  border-radius: 4px;
  line-height: 2;
  font-size: 13px;
}
.p_info p {
  margin-left: 66px;
}
.ul_state li{
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #b8b8b8;
  font-size: small;
  border: 1px solid #ddd;
  min-width: 100px;
  display: inline-block;
  text-align: center;
  margin-right: 10px;
}
.comment{
  margin-top: 10px;
}
.fon_blod{
  font-weight: bold;
}
.co_blue{
  color: #08c;
  text-decoration: none;
}
.borderD {
  border-bottom:1px dashed #ddd;
  width: 100%;
}
.tableStyle td {
  line-height: 2;
  border: 1px solid #eee;
}
.tableStyle th {
  background: #eef1f6;
  line-height: 2.5;
}
.defaultbutton {
  border-color: #ddd;
  cursor: default;
  background: #f0f0f0;
  color: #b8b8b8;
  padding: 4px 15px
}
</style>
