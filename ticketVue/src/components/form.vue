<template>
  <el-col :span="18" class="block">
    <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" v-loading="listLoading">
      <el-form-item label="请填写标题" prop="summary">
        <!-- <el-input placeholder="请填写标题" :value="tagsString" ref="newtitle"></el-input> -->
        <input class="el-input__inner" placeholder="请填写标题" :value="tagsString" ref="newtitle" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工单类别" prop="issue_type_id">
            <el-select v-model="ruleForm.issue_type_id" placeholder="请选择工单类别">
              <el-option v-for="(type,index) in list.issue_types" :value="type.id" :label="type.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
        <el-form-item label="工单优先级" prop="issue_priority_id">
          <el-select v-model="ruleForm.issue_priority_id" placeholder="工单优先级">
            <el-option v-for="(priority,index) in list.issue_priorities" :value="priority.id" :label="priority.name"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发布部门" prop="from_department_id">
            <el-select v-model="ruleForm.from_department_id" placeholder="请选择发布部门">
              <el-option v-for="(team,index) in list.fabuteams" :value="team.id" :label="team.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
        <el-form-item label="分配给" prop="assigned_to_id">
          <el-select v-model="ruleForm.assigned_to_id" placeholder="请选择部门">
            <el-option v-for="(fenpei,index) in list.fabuteams" :value="fenpei.id" :label="fenpei.name"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工单来源" prop="issue_source">
            <el-select v-model="ruleForm.issue_source"  placeholder="">
              <el-option v-for="(source,index) in list.issue_sources" :value="source.id" :label="source.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="责任部门" prop="duty_group_id">
            <el-select v-model="ruleForm.duty_group_id" placeholder="">
              <el-option v-for="(duty,index) in list.duty_groups" :value="duty.id" :label="duty.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单号" prop="order_nr">
            <el-input v-model="ruleForm.order_nr" placeholder="请填写订单号" @blur="ordersnBlur" :maxlength='14'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="所属城市" prop="city">
            <el-select v-model="ruleForm.city"  placeholder="">
              <el-option v-for="(city,index) in list.cities" :value="city" :label="city"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div>16042199736158</div>
      <div style="height: 10px"></div>

      <!-- 衣物详情订单关系 start-->
      <table class="tableStyle"  style="border-collapse: collapse;width: 100%; text-align: center" v-if="fanxi_order && tableShow">
        <tr>
          <th>订单关系</th>
          <th>订单号</th>
        </tr>
        <tr>
          <td>
            原订单号
          </td>
          <td>{{fanxi_order[0].ordersn}}</td>
        </tr>
        <tr v-if="index>0" v-for="(order, index) in fanxi_order">
          <td>
            {{index}}次返洗单
          </td>
          <td>
          {{order.ordersn}}
        </td>
        </tr>
      </table>
      <div style="height: 20px"></div>
      <!-- 衣物详情订单关系 over-->
      <!-- 衣物详情 -->
      <el-table
        :data="tableData.order_clothes_lists"
        style="width: 100%"
        border
        v-if="tableShow"
      >
        <el-table-column type="expand">
          <template scope="scope">
              <el-col :span="8" v-for="(problem,index) in problemTagArray(scope.$index)" style="margin-top: 4px">
                <input :checked="problem.checked" type="checkbox" class="el-checkbox__inner" :value="problem.id" @click="problemCheck(scope.$index, problem)">{{problem.name}}</el-checkbox>
              </el-col>
          </template>
        </el-table-column>
        <el-table-column
          prop="clothes_name"
          label="衣物名称"
          width="180"
        >
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
          prop="problemString"
          label="衣物备注">
        </el-table-column>
      </el-table>
       <div class="">

       </div>
      <!-- 衣物详情 over -->

      <div style="height: 20px"></div>
      <el-form-item label="具体描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" size="small" @click.prevent="submitForm('ruleForm')">确认提交</el-button>
      <!-- <el-button type="primary" size="small" plain @click="resetForm('ruleForm')">继续新建工单</el-button> -->
    </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
import { getClothesLists, postOrderForm } from '../api/api'
export default {
  props: ['list', 'problemTags'],
  data () {
    return {
      labelPosition: 'top',
      is_show_problem: false,
      tableShow: false,
      listLoading: false,
      clothing_id: '',
      ruleForm: {
        summary: '',
        description: '',
        issue_priority_id: '',
        issue_source: '',
        issue_type_id: '',
        from_department_id: '',
        assigned_to_id: '',
        duty_group_id: '',
        city: '',
        order_nr: '',
        issue_labels_attributes: [],
        issue_clothings: []
      },
      tableData: [],
      fanxi_order: {},
      rules: {
        issue_type_id: [
          { type: 'number', required: true, message: '请选择工单类别', trigger: 'change' }
        ],
        assigned_to_id: [
          { type: 'number', required: true, message: '请选择分配给', trigger: 'change' }
        ],
        order_nr: [
          { required: true, message: '请输入订单号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 标题拼接字符串
    tagsString () {
      var tags = ''
      var labelsNew = []
      for (var i = 0; i < this.list.showtag.length; i++) {
        var tag = this.list.showtag[i].name
        var tagId = this.list.showtag[i].id
        if (this.list.showtag.length - 1 === i) {
          tags += tag
        } else {
          tags += tag + ','
        }
        // this.is_show_problem = this.list.showtag[i].is_show_problem
        labelsNew.push({'label_id': tagId})
        this.ruleForm.issue_labels_attributes = labelsNew
      }
      if (this.ruleForm.order_nr) {
        tags += '-' + this.ruleForm.order_nr
      }
      return tags
    }
  },
  methods: {
    // 提交表单发起请求  start
    submitForm (ruleForm) {
      // 处理衣物问题 数组转化为服务端接口所需类型
      var issueArray = []
      for (var issue in this.ruleForm.issue_clothings) {
        var problemArray = this.ruleForm.issue_clothings[issue]
        for (var i = 0; i < problemArray.length; i++) {
          var problem = problemArray[i]
          if (problem.checked) {
            issueArray.push({'clothing_id': issue, 'problem_id': problem.id})
          }
        }
      }
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          var allParam = JSON.parse(JSON.stringify(this.ruleForm))
          allParam.issue_clothings = issueArray
          var newName = this.$refs.newtitle.value
          allParam.summary = newName
          let para = {
            issue: allParam
          }
          postOrderForm(para).then((response) => {
            this.listLoading = true
            if (response.data.ret) {
              this.listLoading = false
              this.$message({
                message: '表单提交成功',
                type: 'success',
                duration: 2000
              })
              setTimeout(() => window.location.reload(), 1000)
            } else {
              this.listLoading = false
              this.$message({
                message: response.data,
                type: 'error',
                duration: 2000
              })
              return false
            }
          })
        }
      })
    },
    // 提交表单发起请求  over
    // 失去焦点时发起请求 params: ordersn
    ordersnBlur () {
      // 获取衣物明细 param: ordersn
      let para = {
        ordersn: this.ruleForm.order_nr
      }
      getClothesLists(para).then((response) => {
        if (response.data.ret) {
          this.tableShow = true
          var dataAr = response.data.data
          this.ruleForm.tel = dataAr.tel
          this.ruleForm.username = dataAr.username
          this.tableData = dataAr
          this.fanxi_order = dataAr.order_list
          var clothList = dataAr.order_clothes_lists
          var problemTagInfo = {}
          for (var i = 0; i < clothList.length; i++) {
            var cloth = clothList[i]
            // 衣物备注信息处理
            cloth.problemString = ''
            var problemArr = cloth.problems
            // this.clothRemark = problemList[i].problems
            for (var j = 0; j < problemArr.length; j++) {
              var problem = problemArr[j]
              cloth.problemString += problem.name
              cloth.problemString += ' '
            }
            // 衣物问题标签选择处理
            problemTagInfo[cloth.id] = JSON.parse(JSON.stringify(this.problemTags))
          }
          this.ruleForm.issue_clothings = problemTagInfo
        } else {
          this.tableData = false
          this.fanxi_order = ''
          this.$message({
            message: response.data.error_msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 设置issue_clothings 衣服问题 start
    problemCheck (clothIndex, problem) {
      problem.checked = !problem.checked
    },
    // 衣物问题tag数组
    problemTagArray (index) {
      var allInfo = this.ruleForm.issue_clothings
      var clothArr = this.tableData.order_clothes_lists
      var cloth = clothArr[index]
      var clothId = cloth.id
      return allInfo[clothId]
    },
    // 设置issue_clothings 衣服问题结束 over
    resetForm (ruleForm) {
      this.$refs[ruleForm].resetFields()
    }
  }
}

</script>
<style scoped>
.el-select {
  width: 100%
}
.tableStyle td {
  line-height: 2;
  border: 1px solid #eee;
}
.tableStyle th {
  background: #eef1f6;
  line-height: 2.5;
}

</style>
