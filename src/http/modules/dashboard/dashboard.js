import axios from '../../axios'

/* 
 * 学生端-仪表盘
 */

 const preUrl = "/student/dashboard/";

 // 获取实验分数
 export const getExperimentGrade = (params) => {
   return axios({
     url: preUrl + 'getExperimentGrade',
     method: 'get',
     params
   })
 }

 // 获取实验时间
 export const getExperimentTime = params => {
   return axios({
     url: preUrl + 'getExperimentTime',
     method: 'get',
     params
   })
 }