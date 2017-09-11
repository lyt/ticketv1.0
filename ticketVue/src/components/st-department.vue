<template>
  <el-col :span="24" class="block" :offset="1">
    <span>分配给部门</span>
    <div style="height: 10px"></div>
    <select id="department" multiple name="state[]" v-model="state">
      <option :value="tag.value" v-for="tag in options" @click="addepartment">{{tag.label}}</option>
    </select>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      state: [],
      options: [
        {
          value: '0',
          label: '地推服务态度'
        },
        {
          value: '2',
          label: '价格调整问题'
        },
        {
          value: '3',
          label: '加工店服务态度'
        },
        {
          value: '4',
          label: '地推服务态度'
        },
        {
          value: '5',
          label: '地推服务态度'
        }
      ],
      value: ''
    }
  },
  methods: {
    addepartment (tag) {
      // this.state = statefor
      this.$emit('my-event', this.state)
    }
  }
}
</script>
<style scoped>
#department {
  min-height: 200px;
}
</style>
