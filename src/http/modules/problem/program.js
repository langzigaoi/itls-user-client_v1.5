import axios from '../../axios'

/* 
 * 编程题管理
 */

const preUrl = "/judger/";

// 获取所有编程题
export const getAllProgram = (params) => {
  return axios({
    url: preUrl + 'program/getallprogram',
    method: 'get',
    params
  })
}

// 根据id获取试题对象
export const getProblemById = (params) => {
  return axios({
    url: preUrl + 'program/getprogram',
    method: 'get',
    params
  })
}

// 提交用户代码
export const submitCode = (params) => {
  return axios({
      url: preUrl + 'submission/createSubmission',
      method: 'post',
      params
  })
}