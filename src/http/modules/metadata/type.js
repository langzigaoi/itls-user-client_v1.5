import axios from '../../axios'

/* 
 * 元数据-教学类型
 */

 const preUrl = "/metadata/type/";

// 查询所有教学类型
export const findAll = () => {
  return axios({
      url: preUrl + 'findAll',
      method: 'get'
  })
}
// 按id查找教学类型 params :{id:?}
export const findById = (params) => {
  return axios({
      url: preUrl + 'findById',
      method: 'get',
      params
  })
}