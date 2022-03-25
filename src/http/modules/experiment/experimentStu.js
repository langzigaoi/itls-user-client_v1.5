import axios from '../../axios'

/* 
 * 学生端-课程实验
 */

 const preUrl = "/student/experiment/";

 // 向实验跟踪表中插入数据
 export const insertIntoExperimentTrace = (data) => {
   return axios({
     url: preUrl + 'insert',
     method: 'post',
     data
   })
 }

 // 获取当前课程实例实验
 export const searchAll = (params) => {
   return axios({
     url: preUrl + 'searchAll',
     method: 'get',
     params
   })
 }

 // 查看实验跟踪表内容
 export const getExperimentTrace = params => {
   return axios({
     url: preUrl + 'getExperimentTrace',
     method: 'get',
     params
   })
 }

 // 根据实验id获取实验信息
 export const getExperimentInfo = params => {
   return axios({
     url: preUrl + 'getExperimentInfo',
     method: 'get',
     params
   })
 }

 // 根据学生id、实验id、题目id修改答案内容
 export const updateStuAnswer = data => {
   return axios({
     url: preUrl + 'updateStuAnswer',
     method: 'post',
     data
   })
 }

 // 根据学生id、实验id、题目id修改完成标识
//  export const updateIsComplete = (params) => {
//    return axios({
//      url: preUrl + 'updateIsComplete',
//      method: 'post',
//      params
//    })
//  }

 // 提交修改完成标识
 export const updateExperimentComplete = params => {
   return axios({
     url: preUrl + 'insertExperimentComplete',
     method: 'post',
     params
   })
 }

 // 根据学生id及实验id获取分数
 export const getScore = params => {
   return axios({
     url: preUrl + 'getScore?experimentId',
     method: 'get',
     params
   })
 }

 // 向汇总表中插入或更新数据
 export const insertIntoExperimentSummary = data => {
   return axios({
     url: preUrl + 'insertIntoExperimentSummary',
     method: 'post',
     data
   })
 }

 // 根据实验id、学生id、题目id修改单题分数
 export const updateScore = data => {
   return axios({
     url: preUrl + 'updateScore',
     method: 'post',
     data
   })
 }