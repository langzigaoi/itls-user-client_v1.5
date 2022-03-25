import axios from '../../axios'

/* 
 * 知识点-审核
 */

 const preUrl = "/knowledge/cpublic/";

 // 本用户最近操作记录列表
export const userList = (params) => {
  return axios({
      url: preUrl + 'userList',
      method: 'get',
      params
  })
}
// (教师、学生)申请添加知识点
export const add = (data) => {
  return axios({
      url: preUrl + 'add',
      method: 'post',
      data
  })
}
// 查找知识点
export const find = (params) => {
  return axios({
      url: preUrl + 'find',
      method: 'get',
      params
  })
}
// (教师、学生)删除未审核记录
export const deletePublic = (params) => {
  return axios({
      url: preUrl + 'delete',
      method: 'patch',
      params
  })
}
// (教师、学生)申请修改已通过审核知识点
export const revise = (params) => {
  return axios({
      url: preUrl + 'revise',
      method: 'patch',
      params
  })
}
// (教师、学生)申请删除已通过审核知识点
export const remove = (params) => {
  return axios({
      url: preUrl + 'remove',
      method: 'patch',
      params
  })
}