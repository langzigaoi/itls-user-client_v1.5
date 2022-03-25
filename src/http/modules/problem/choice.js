import axios from '../../axios'

/* 
 * 选择题管理模块
 */ 

 const preUrl = "/problem/choice/";
 
// 查询选择题列表
export const findAll = (params) => {
  return axios({
    url: preUrl + 'findAll',
    method: 'post',
    params
  })
}

// 根据知识点获取题目
export const findProblemChoice = (params) => {
  return axios({
    url: preUrl + 'findProblemChoice',
    method: 'get',
    params
  })
}

// export const getAUserList = (data) => {
//   return axios({
//     url: preUrl + 'getAUserList',
//     method: 'post',
//     data
//   })
// }
// export const AdminSelectByStatus = (data) => {
//   return axios({
//     url: preUrl + 'AdminSelectByStatus',
//     method: 'post',
//     data
//   })
// }
// export const AdminAudit = (data) => {
//   return axios({
//     url: preUrl + 'AdminAudit',
//     method: 'post',
//     data
//   })
// }

// 查询选择题列表
export const findPersonList = (params) => {
  return axios({
    url: preUrl + 'findPer',
    method: 'post',
    params
  })
}

// 删除
export const del = (data) => {
  return axios({
    url: preUrl + 'del',
    method: 'delete',
    data
  })
}

// 新增
export const add = (data) => {
  return axios({
    url: preUrl + 'add',
    method: 'post',
    data
  })
}

// 修改 
export const update = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'patch',
    data
  })
}