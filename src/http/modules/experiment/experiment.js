import axios from '../../axios'

/* 
 * 课程与课程实例-课程实验
 */

 const preUrl = "/course/experimentsetup/";

// 添加创建的实验
export const addExperiment = (data) => {
  return axios({
    url: preUrl + 'insert',
    method: 'post',
    data
  })
}

// 根据课程实例id获取所有知识点
export const getKANByindId = (params) => {
  return axios({
    url: preUrl + 'getKANByindId',
    method: 'get',
    params
  })
}

// 根据课程实例id获取所有实验
export const searchAll = (params) => {
  return axios({
    url: preUrl + 'searchAll',
    method: 'get',
    params
  })
}

// 根据实验id修改发布状态
export const updateIsPub = (data) => {
  return axios({
    url: preUrl + 'updatePart',
    method: 'patch',
    data
  })
}

// 根据实验id获取实验信息和题目信息
export const getExperimentInfo = (params) => {
  return axios({
    url: preUrl + 'getExperimentInfo',
    method: 'get',
    params
  })
}

// 根据实验id修改实验信息
export const updateExperimentInfo = (data) => {
  return axios({
    url: preUrl + 'updatePart',
    method: 'patch',
    data
  })
}

// 根据实验id修改实验题目
export const updateExperimentProblem = (data) => {
  return axios({
    url: preUrl + 'updateProblemList',
    method: 'patch',
    data
  })
}

// 根据实验id修改实验题目
export const deleteProblem = (params) => {
  return axios({
    url: preUrl + 'deleteById',
    method: 'delete',
    params
  })
}

// 根据实验id获取学生完成情况
export const getStudentList = params => {
  return axios({
    url: preUrl + 'getStudentComplete',
    method: 'get',
    params
  })
}

// 学生id、实验id获取学生答案
export const getStudentAnswer = params => {
  return axios({
    url: preUrl + 'getStudentAnswer',
    method: 'get',
    params
  })
}

// 根据实验id删除实验
export const deleteExp = (params) => {
  return axios({
    url: preUrl + 'deleteExpById',
    method: 'delete',
    params
  })
}