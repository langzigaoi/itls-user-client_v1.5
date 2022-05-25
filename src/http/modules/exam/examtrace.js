import axios from '../../axios'

const preUrl = "/exam/trace/";


//添加学生考试记录
export const editChoose = (data) => {
  return axios({
    url: preUrl + 'editChoose',
    method: 'post',
    data
  })
}


