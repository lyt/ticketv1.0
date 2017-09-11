<template>
  <el-col :span="16" :offset="1">
    <div class="grid-content bg-purple block">
      <ul class="rightlist">
        <li  v-for="list in orderlist">
          <el-row>
              <el-col :span="1" >
                <img :src="list.imgurl">
              </el-col>
              <el-col :span="22" :offset="1">
                  <p>{{list.date}} age</p>
                  <p>{{list.detail}}</p>
              </el-col>
          </el-row>
        </li>
      </ul>
    </div>
  </el-col>
</template>
<script>
export default {
  props: ['orderlist']
}
</script>
<style scoped>
.rightlist li:nth-child(even) {
  background: #f1f1f1;
  border-radius:1px;
  margin-right:5px;
}
.rightlist li:nth-child(odd) {
  background-color:#fff;

}
.rightlist li:first-child {
  padding-top: 0
}
.rightlist li {
  line-height: 1.4;
  margin-left: 5px;
  padding: 15px;
}
.rightlist {
  font-size: 14px;
  color: #888;
}
.rightlist p:first-child {
  font-size: 13px;
  color: #aaa;
}
img {
  margin-top: 7px;
}
</style>
