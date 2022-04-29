import axios from '../../axios'

/* 
 * 元数据管理模块
 */ 

 const preUrl = "/problem/program/";

 export const findPage = (data) => {
  return axios({
    url: preUrl + 'findPage',
    method: 'post',
    data
  })
}
export const findPerPage = (data) => {
  return axios({
    url: preUrl + 'findPerPage',
    method: 'post',
    data
  })
}
 

 // 编程题列表 已审核且未删除
 export const findAll = (params) => {
  return axios({
    url: preUrl + 'findProgram',
    method: 'post',
    params
  })
}
export const findById = (params) => {
  return axios({
    url: preUrl + 'findById',
    method: 'get',
    params
  })
}
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
// 测试用例相关
export const findCheckList = (params) => {
  return axios({
    url: preUrl + 'findCheckList',
    method: 'post',
    params
  })
}
export const findCheck = (params) => {
  return axios({
    url: preUrl + 'findCheckList',
    method: 'post',
    params
  })
}
export const addCheck = (data) => {
  return axios({
    url: preUrl + 'addCheck',
    method: 'post',
    data
  })
}
 // 根据知识点获取编程题目
 export const findByIdList = (params) => {
  return axios({
    url: preUrl + 'findByIdList?id=' + params,
    method: 'get'
  })
}

export const findByKid = (data) => {
  return axios({
    url: preUrl + 'findPageByKid',
    method: 'post',
    data
  })
}
