import axios from '../../axios'

/* 
 * 元数据管理模块
 */

 const preUrl = "course/instance/language/";

// 查询所有编程语言
export const findAllLanguage = () => {
  return axios({
      url: preUrl + 'selectAllLanguage',
      method: 'get',
  })
}
// 查询所有某课程实例的编程语言
export const findCinstanceLanguage = (params) => {
  return axios({
      url: preUrl + 'findByCid',
      method: 'get',
      params
  })
}
// 添加某课程实例的语言
export const addCinstanceLanguage = (data) => {
  return axios({
      url: preUrl + 'add',
      method: 'post',
      data
  })
}
