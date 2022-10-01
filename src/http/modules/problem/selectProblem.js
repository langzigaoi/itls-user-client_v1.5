import axios from '../../axios'

/* 
 * 选择题管理模块
 */ 

 const preUrl = "/problem/select/";
 
// 随机抽题
export const selectProblemRandom = (params) => {
  return axios({
    url: preUrl + 'select1',
    method: 'get',
    params
  })
}
