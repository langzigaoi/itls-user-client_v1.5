import axios from '../../axios'

/* 
 * 知识点-审核
 */

 const preUrl = "/knowledge/pub/";

 // 本用户最近操作记录列表
export const userList = (params) => {
  return axios({
      url: preUrl + 'userList',
      method: 'get',
      params
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

// (教师、学生)申请添加知识点
export const add = (data) => {
  return axios({
      url: preUrl + 'add',
      method: 'post',
      data
  })
}
// (教师、学生)申请修改已通过审核知识点
export const revise = (data) => {
  return axios({
      url: preUrl + 'revise',
      method: 'patch',
      data
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


// (教师、学生)删除未审核记录
export const removePub = (params) => {
  return axios({
      url: preUrl + 'removePub',
      method: 'patch',
      params
  })
}