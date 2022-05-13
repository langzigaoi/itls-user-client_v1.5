import axios from '../../axios'

/* 
 * 元数据-课程目标类型
 */

 const preUrl = "/metadata/evaluationDetailedType/";

// 查询所有课程目标类型
export const findAll = () => {
  return axios({
      url: preUrl + 'findAll',
      method: 'get'
  })
}
// 按id查找课程目标类型 params :{id:?}
export const findById = (params) => {
  return axios({
      url: preUrl + 'findById',
      method: 'get',
      params
  })
}