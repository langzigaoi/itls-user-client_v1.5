import axios from '../../axios'
import qs from 'qs'


const preUrl = "/teacher/releasetest/";


// 根据知识点获取对应的所有单选题
export const findProblemChoice = (params) => {
  console.log(params);
  return axios({
      url: preUrl + 'findProblemChoice',
      method: 'get',
      params,
  })
}

// 根据知识点获取对应的所有判断题
export const findProblemJudge = (params) => {
    console.log(params);
    return axios({
        url: preUrl + 'findProblemJudge',
        method: 'get',
        params,
    })
}

// 根据知识点获取对应的所有多选题
export const findProblemMultiChoice = (params) => {
    console.log(params);
    return axios({
        url: preUrl + 'findProblemMultiChoice',
        method: 'get',
        params,
    })
}

// 根据知识点获取对应的所有填空题
export const findProblemFilling = (params) => {
    console.log(params);
    return axios({
        url: preUrl + 'findProblemFilling',
        method: 'get',
        params,
    })
}

// 根据知识点获取对应的所有简答题
export const findProblemShortAnswer = (params) => {
    console.log(params);
    return axios({
        url: preUrl + 'findProblemShortAnswer',
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