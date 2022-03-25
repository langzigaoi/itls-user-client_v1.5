import axios from '../../axios'

/* 
 * 课程与课程实例-课程实例内容周下面的节管理
 */

 const preUrl = "/course/section/";

// 添加一周下面的一节
export const insert = (data) => {
  return axios({
    url: preUrl + 'insert',
    method: 'post',
    data
  })
}
// 获取 1212
export const selectById = (params) => {
  return axios({
      url: preUrl + 'selectById',
      method: 'get',
      params
  })
}
// 发布一个节
export const pub = (params) => {
  return axios({
    url: preUrl + 'pub',
    method: 'post',
    params
  })
}
// 修改一个节
export const updateSection = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'post',
    data
  })
}

//修改节的pptid
export const updatepptid = (params) => {
  return axios({
    url: preUrl + 'updatepptid',
    method: 'post',
    params
  })
}

//修改节的videoid
export const updatevideoid = (params) => {
  return axios({
    url: preUrl + 'updatevideoid',
    method: 'post',
    params
  })
}
