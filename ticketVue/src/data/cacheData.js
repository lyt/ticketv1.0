import { getConfig } from '../api/api'
const appconfigKey = 'eDaixiGongdanConfig'
const appConfig = {
  cities: [],                            // 所属城市
  issue_priorities: [],                 // 工单优先级
  issue_sources: [],                    // 工单来源
  issue_state_transitions: [],          // 工单状态转换
  issue_states: [],                     // 工单状态
  issue_types: [],                      // 工单类型
  labels: [],                           // 工单标签
  notclose_reasons: [],                 // 工单未关闭原因
  problems: [],                         // 工单问题原因
  teams: [],                             // 部门 -发布部门-发布部门id
  duty_groups: []                       // 责任部门
}

// 初始化时缓存配置文件
var cacheConfig = () => {
  getConfig().then((response) => {
    console.log(response.data)
    if (response.data.ret) {
      saveConfig(response)
      fixData(response)
    } else {
      alert(response.data.error_msg)
      fixCacheData()
    }
  })
  .catch((error) => {
    console.log(error + 'ceshierror')
    fixCacheData()
  })
}

// 读取缓存数据
function fixCacheData () {
  var response = getItemConfig()
  if (response) {
    fixData(response)
  } else {
    alert('无数据')
  }
}

// 请求回来的数据封装
function fixData (response) {
  var data = response.data.data
  appConfig.cities = data.cities
  appConfig.issue_priorities = data.issue_priorities
  appConfig.issue_sources = data.issue_sources
  appConfig.issue_state_transitions = data.issue_state_transitions
  appConfig.issue_states = data.issue_states
  appConfig.issue_types = data.issue_types
  appConfig.duty_groups = data.duty_groups
  appConfig.teams = data.teams
  appConfig.notclose_reasons = data.notclose_reasons

  appConfig.labels = data.labels
  for (var i = 0; i < data.labels.length; i++) {
    data.labels[i].show = false
  }

  appConfig.problems = data.problems
  for (var p = 0; p < data.problems.length; p++) {
    data.problems[p].checked = false
  }
}

// 缓存数据方法
const saveConfig = (value) => {
  value = JSON.stringify(value)
  localStorage.setItem(appconfigKey, value)
}

// 读取缓存数据方法
const getItemConfig = () => {
  var value = localStorage.getItem(appconfigKey)
  value = JSON.parse(value)
  return value
}

export {appConfig, cacheConfig, saveConfig, fixCacheData}
