<template>
  <el-col :span="5" class="block"  :offset="1">
    <el-col :span="24">
      <h4 style="color:#666;margin-bottom: 15px;">点击添加标签</h4>
      <div class="tag" :dataid="tag.id" v-for="(tag,index) in taglist" @click="addtag(tag)" :style="{ background: tag.show? tag.colour:'#fff', color: tag.show? '#fff':'' }">{{tag.name}}</div>
    </el-col>
  </el-col>
</template>

<script>
  export default {
    props: ['taglist'],
    data () {
      return {
        // apiUrl: 'http://api.douban.com/v2'
      }
    },
    methods: {
      addtag (tag) {
        tag.show = !tag.show
        var showtag = []
        for (var i = 0; i < this.taglist.length; i++) {
          if (this.taglist[i].show) {
            showtag.push(this.taglist[i])
          }
        }
        this.$emit('my-event', showtag)
      }
    }
}

</script>
<style scoped>
.block {
  background: #fff;
  box-shadow: 0 0 4px 2px #ddd;
  border-radius: 4px;
  padding: 15px;
}
.tag {
  width: 100%;
  background: none;
  color: #666;
  margin-top: 8px;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  padding: 2px 0;
}
.button-new-tag {
  border: 0;
  color: #20A0FF;
  padding: 0
}
</style>
