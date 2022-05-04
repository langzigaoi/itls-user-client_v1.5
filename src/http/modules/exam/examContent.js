import axios from '../../axios'

const preUrl = "/exam/content/";

//查询
export const findList = (data) => {
  return axios({
    url: preUrl + 'findContent',
    method: 'post',
    data
  })
}

// 编辑
export const update = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'post',
    data
  })
}

export const findByExamId = (data) => {
  return axios({
    url: preUrl + 'findByExamId',
    method: 'post',
    data
  })
}

// 编辑
export const updateObj = (data) => {
  return axios({
    url: preUrl + 'updateObj',
    method: 'post',
    data
  })
}

