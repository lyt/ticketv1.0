<template>
  <div class="">
    <leftmenu :leftlist="leftlist"></leftmenu>
    <rightmenu :orderlist="lists"></rightmenu>
  </div>
</template>

<script>
import leftmenu from './dashleft'
import rightmenu from './dashright'

export default {
  data () {
    return {
      leftlist: {
        orderNum: 1910,
        itemNum: 1,
        itemTitle: '项目列表',
        listname: 'e袋洗工单'
      },
      lists: [{
        types: 0,
        date: '1分钟之前',
        detail: '上海市普陀区金沙江路 1518 弄',
        imgurl: require('../assets/images/dashicon1.png')
      }, {
        types: 1,
        date: '十五分钟之前',
        detail: '17062586280077 袋洗  闫希  18610310090 深圳-南山区-深圳市南山区南新路 中南海滨大酒店 用户18610310090催送件，要求明天务必送到，表示要离开酒店了，请加急配送 （李荣）',
        imgurl: require('../assets/images/dashicon2.png')
      }, {
        types: 0,
        date: '2016-05-01',
        detail: '取件签收 2017-06-25 17:22:05',
        imgurl: require('../assets/images/dashicon1.png')
      }, {
        types: 1,
        date: '2016-05-03',
        detail: '调度反馈，是用户老公自己拿走的，已经让小e联系用户告知了。关单。',
        imgurl: require('../assets/images/dashicon2.png')
      }]
    }
  },
  components: {leftmenu, rightmenu}
}
</script>

<style lang="css">
</style>
