import axios from '../../axios'

/* 
 * 元数据-题目类型
 */

 const preUrl = "/meta/problemtype/";

// 查询所有题目类型
export const findAll = () => {
  return axios({
      url: preUrl + 'findAll',
      method: 'get'
  })
}
// 按id查找题目类型 params :{id:?}
export const findById = (params) => {
  return axios({
      url: preUrl + 'findById',
      method: 'get',
      params
  })
}