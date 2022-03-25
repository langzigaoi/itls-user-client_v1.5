import axios from '../../axios'

/* 
 * 元数据管理模块
 */

 const preUrl = "/course/week/";


// 添加一周
export const insert = (data) => {
  return axios({
    url: preUrl + 'insert',
    method: 'post',
    data
  })
}
// 查询一个实例的所有周
export const selectAll = (params) => {
  return axios({
    url: preUrl + 'selectAll',
    method: 'get',
    params
  })
}