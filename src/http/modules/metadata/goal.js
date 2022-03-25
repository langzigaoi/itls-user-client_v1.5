import axios from '../../axios'

/* 
 * 元数据-教学目标
 */

 const preUrl = "/metadata/goal/";

// 获取教学目标列表
export const findAll = () => {
  return axios({
      url: preUrl + 'findAll',
      method: 'get'
  })
}
// 按id查找教学目标 params :{id:?}
export const findById = (params) => {
  return axios({
      url: preUrl + 'findById',
      method: 'get',
      params
  })
}