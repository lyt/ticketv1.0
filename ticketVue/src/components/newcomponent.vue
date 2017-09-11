<template>
  <el-row style="padding: 20px">
    <formcomponent :list="list" :problemTags='list.problems'></formcomponent>
    <tagcomponent :taglist="list.labels" @my-event="getMyEvent"></tagcomponent>
  </el-row>
</template>
<script>
import formcomponent from './form'
import tagcomponent from './tag'
import { appConfig, fixCacheData } from '../data/cacheData'
export default {
  data () {
    return {
      list: {
        showtag: [],
        fabuteams: appConfig.teams,
        issue_sources: appConfig.issue_sources,
        issue_priorities: appConfig.issue_priorities,
        issue_types: appConfig.issue_types,
        bumenOptions: appConfig.teams,
        cities: appConfig.cities,
        labels: appConfig.labels,
        problems: appConfig.problems,
        duty_groups: appConfig.duty_groups
      }
    }
  },
  created () {
    // console.log(appConfig.labels)
  },
  beforeCreate () {
    fixCacheData()
  },
  methods: {
    getMyEvent (showtag) {
      this.list.showtag = showtag
      console.log(this.list.showtag)
    }
  },
  components: {formcomponent, tagcomponent}
}
</script>
