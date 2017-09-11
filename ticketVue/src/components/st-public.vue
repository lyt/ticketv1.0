<template>
  <el-col :span="5"  class="block" :offset="1">
    <span>{{title}}</span>
    <div style="height: 10px"></div>
    <select class="tagstate" multiple="multiple" name="state[]" @change="changeSelect">
      <option :value="tag.value?tag.value : tag.id" v-for="tag in list">{{tag.name}}</option>
    </select>
  </el-col>
</template>

<script>
export default {
  props: ['list', 'title'],
  data () {
    return {
    }
  },
  methods: {
    changeSelect (value) {
      console.log(value.currentTarget.value)
    }
  }
}
</script>
<style>
.tagstate {
  min-height: 300px;
  line-height: 26px;
  width: 100%;
  outline: inherit;
  border: 1px solid #ddd;
  padding: 5px;
}
 .tagstate option{
    padding: 3px;
    font-size: 14px;
}
</style>
