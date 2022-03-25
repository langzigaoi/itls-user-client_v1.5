import axios from '../../axios'

/* 
 * 元数据管理模块
 */

 const preUrl = "/course/course/";

// 查询符合条件的课程
export const findAllCourse = (params) => {
  return axios({
    url: preUrl + 'findAllCourse',
    method: 'get',
    params
  })
}
//添加课程
export const add = (data) => {
  return axios({
    url: preUrl + 'add',
    method: 'post',
    data
  })
}