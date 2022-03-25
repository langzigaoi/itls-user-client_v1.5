import axios from '../../axios'

/* 
 * 元数据管理模块
 */ 

 const preUrl = "/problem/submission/";

 // 将用户代码提交到消息队列及数据库
export const createSubmission = (data) => {
  return axios({
    url: preUrl + 'createSubmission',
    method:'post',
    data
  })
}

// 获取评测结果
export const getJudgeResults = (data) => {
  return axios({
    url: preUrl + 'getJudgeResults',
    method:'post',
    data
  })
}

// 获取评测结果
export const getJudgeResult = (data) => {
  return axios({
    url: preUrl + 'getJudgeResult',
    method:'post',
    data
  })
}