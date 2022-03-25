import axios from '../../axios'

/* 
 * 课程实例目标管理模块
 */

 const preUrl = "/course/objective/";

// 查询符合条件课程实例的课程目标
export const findAllTargets = (params) => {
  return axios({
    url: preUrl + 'selectCInstanceObjective',
    method: 'post',
    params
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
export const delTarget = (params) => {
  return axios({
    url: preUrl + 'deleteCInstanceObjective',
    method: 'post',
    params
  })
}