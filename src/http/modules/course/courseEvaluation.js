import axios from '../../axios'

/* 
 * 课程实例目标管理模块
 */

 const preUrl = "/course/evaluation/";


 // 分页查询
export const findPage = (data) => {
  return axios({
    url: preUrl + 'findPage',
    method: 'post',
    data
  })
}
// 分页查询详情考核评价
export const findDetailedPage = (data) => {
  return axios({
    url: preUrl + 'findDetailedPage',
    method: 'post',
    data
  })
}

// 增加修改或者删除考核评价
export const saveEvaluation = (data) => {
  return axios({
    url: preUrl + 'saveEvaluation',
    method: 'post',
    data
  })
}
// 增加修改或者删除考核评价
export const saveDetailedEvaluation = (data) => {
  return axios({
    url: preUrl + 'saveDetailedEvaluation',
    method: 'post',
    data
  })
}
// 添加课程实例的课程目标
export const addTarget = (params) => {
  return axios({
    url: preUrl + 'addCInstanceObjective',
    method: 'post',
    params
  })
}
// 修改课程实例的课程目标
export const updateTarget = (params) => {
  return axios({
    url: preUrl + 'updateCInstanceObjective',
    method: 'post',
    params
  })
}
// 删除课程实例的课程目标
export const delTarget = (data) => {
  return axios({
    url: preUrl + 'deleteCInstanceObjective',
    method: 'post',
    data
  })
}
// 发布课程实例的课程目标
export const releaseTarget = (data) => {
  return axios({
    url: preUrl + 'release',
    method: 'post',
    data
  })
}