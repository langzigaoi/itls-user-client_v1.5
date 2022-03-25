import axios from '../../axios'
import qs from 'qs'


const preUrl = "/teacher/releasetest/";


// 根据知识点获取对应的所有选择题
export const findProblemChoice = (params) => {
  console.log(params);
  return axios({
      url: preUrl + 'findProblemChoice',
      method: 'get',
      params,
  })
}

// 将生成的测试传给后端

export const addTest = (params) => {
  console.log(params);
  return axios({
      url: preUrl + 'addTest',
      method: 'post',
      params,
  })
}