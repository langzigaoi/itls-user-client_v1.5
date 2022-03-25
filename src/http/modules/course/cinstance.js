import axios from '../../axios'

/* 
 * 课程与课程实例-课程实例管理
 */

 const preUrl = "/course/cinstance/";

// 获取课程实例详情
export const findCourseInstance = async (params) => {
  return axios({
      url: preUrl + 'findCourseInstance',
      method: 'get',
      params
  })
}
// 本用户课程实例操作记录
export const findAllCourseInstance = (params) => {
  return axios({
      url: preUrl + 'findAllCourseInstance',
      method: 'get',
      params
  })
}
// 删除
export const detete = (params) => {
  return axios({
      url: preUrl + 'detete',
      method: 'patch',
      params
  })
}
// 修改
export const updateInstance = (data) => {
  return axios({
      url: preUrl + 'updateInstance',
      method: 'patch',
      data
  })
}
// 添加
export const add = (data) => {
  return axios({
      url: preUrl + 'add',
      method: 'post',
      // contentType: 'application/json; charset=UTF-8',
      data
  })
}

//获取学生正在学习的课程
export const getIslearningCourse = (params) => {
  return axios({
    url: preUrl + 'getIslearningCourse',
    method: 'get',
    params
  })
}