import axios from '../../axios'

const preUrl = "/exam/item/";

//查询
export const findList = (data) => {
  return axios({
    url: preUrl + 'findItem',
    method: 'post',
    data
  })
}
// 删除
export const remove = (params) => {
  return axios({
    url: preUrl + 'remove',
    method: 'post',
    params
  })
}
// 更新
export const update = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'post',
    data
  })
}

// //提交考试信息
// export const add = (data) => {
//   return axios({
//     url: preUrl + 'add',
//     method: 'post',
//     data
//   })
// }
