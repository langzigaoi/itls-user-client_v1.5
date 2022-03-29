import axios from '../../axios'

/* 
 * 元数据-课程方向
 */

 const preUrl = "/metadata/title/";

// 查询所有课程方向
export const findAll = () => {
  return axios({
      url: preUrl + 'findAll',
      method: 'get'
  })
}
// 按id查找课程方向 params :{id:1}
export const findById = (params) => {
  return axios({
      url: preUrl + 'findById',
      method: 'get',
      params
  })
}