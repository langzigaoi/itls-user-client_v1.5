import axios from '../../axios'

/* 
 * 元数据-教学层次
 */

 const preUrl = "/metadata/level/";

// 查询所有层次
export const findAll = () => {
  return axios({
      url: preUrl + 'findAll',
      method: 'get'
  })
}
// 按id查找课程层次 params :{id:?}
export const findById = (params) => {
  return axios({
      url: preUrl + 'findById',
      method: 'get',
      params
  })
}