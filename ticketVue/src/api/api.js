import axios from 'axios'

// 获取工单基本配置
let base = 'http://ticket_api01.edaixi.cn:81'

export const getConfig = params => {
  return axios.get(`${base}/v1/projects`, { params: params })
}
// 获取工单详情列表
export const getOrderdetail = params => {
  return axios.get(`${base}/v1/issues/${params}`, { params: params })
}
// 获取工单列表
export const getListData = params => {
  return axios.get(`${base}/v1/issues`, { params: params })
}

// 提交添加评论
export const postaddComments = params => {
  return axios.post(`${base}/v1/comments`, params)
}

// 订单衣物信息
export const getOrderClothesInfo = params => {
  return axios.get(`${base}/v1/orders?ordersn=${params}`, params)
}

// 获取工单衣物信息
export const getClothesLists = params => {
  return axios.get(`${base}/v1/orders`, { params: params })
}

// post新建工单
export const postOrderForm = params => {
  return axios.post(`${base}/v1/issues`, params)
}

// 提交工单状态修改
export const postOrderStateChange = params => {
  return axios.post(`${base}/v1/issues/${params.orderId}/change_state?issue_state=${params.selected}`)
}

// 提交工单状态修改
export const postOrderAssignedToName = params => {
  return axios.post(`${base}/v1/issues/${params.orderId}/change_assign_to?assign_to_id=${params.selected}`)
}

// 提交工单来源
export const postIssueSources = params => {
  return axios.post(`${base}/v1/issues/${params.orderId}/change_source?issue_source_id=${params.selected}`)
}

// 提交工单城市
export const postCity = params => {
  return axios.post(`${base}/v1/issues/${params.orderId}/change_city?city=${params.selected}`)
}

// 提交工单未关闭原因
export const postNotCloseReason = params => {
  return axios.post(`${base}/v1/issues/${params.orderId}/change_notclose_reason?notclose_reason_id=${params.selected}`)
}

// 提交工单责任部门
export const postDutyGroup = params => {
  return axios.post(`${base}/v1/issues/${params.orderId}/change_duty_group?duty_group_id=${params.selected}`)
}
