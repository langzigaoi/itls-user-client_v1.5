import axios from '../../axios'

/* 
 * 元数据-课程要求
 */

 const preUrl = "/metadata/require/";

// 查询所有课程要求
export const findAll = () => {
  return axios({
      url: preUrl + 'findAll',
      method: 'get'
  })
}
// 按id查找课程要求 params :{id:?}
export const findById = (params) => {
  return axios({
      url: preUrl + 'findById',
      method: 'get',
      params
  })
}