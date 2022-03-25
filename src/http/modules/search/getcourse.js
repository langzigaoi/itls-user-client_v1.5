import axios from '../../axios'

/* 
 * 元数据管理模块
 */

 const preUrl = "/student/coursechose/";

 //获取所有的课程
 export const getcourse =(params) => {
   return axios({
     url: preUrl + 'getcourse',
     method: 'get',
     params
   })
 }
// 获取所有的老师
export const getteachers = (params) => {
  return axios({
    url: preUrl + 'getteachers',
    method: 'get',
    params
  })
}
//筛选课程
export const searchcourse = (params) => {
  return axios({
    url: preUrl + 'searchcourse',
    method: 'post',
    params
  })
}
//提交选课
export const add = (params) => {
  return axios({
    url: preUrl + 'add',
    method: 'post',
    params
  })
}