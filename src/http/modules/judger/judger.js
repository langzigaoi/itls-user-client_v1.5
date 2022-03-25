import axios from '../../axios'

/* 
 * 自动评判-提交及评测管理
 */

 const preUrl = "/problem/submission/";

 //将用户代码提交到消息队列及数据库
 export const createSubmission = data => {
   return axios({
     url: preUrl + 'createSubmission',
     method: 'post',
     data
   })
 }

 //获取评测结果
 export const getJudgeResult = data => {
   return axios({
     url: preUrl + 'getJudgeResult',
     method: 'post',
     data
   })
 }