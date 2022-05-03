import axios from '../../axios'

/* 
 * 课程实例教学团队模块
 */

 const preUrl = "course/instance/teacher/";

// 查询Assistant助教
export const findAllAssistant = (params) => {
  return axios({
    url: preUrl + 'findAll',
    method: 'get',
    params
  })
}
// 添加助教
export const addAssistant = (data) => {
  return axios({
    url: preUrl + 'insert',
    method: 'post',
    data
  })
}
// 修改助教信息
export const updateAssistant = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'post',
    data
  })
}
// 删除助教信息
export const delTarget = (params) => {
  return axios({
    url: preUrl + 'delete',
    method: 'get',
    params
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