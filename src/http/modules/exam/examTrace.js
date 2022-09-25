import axios from '../../axios'

const preUrl = "/exam/trace/";

//添加学生考试记录
export const edit = (data) => {
  return axios({
    url: preUrl + 'edit',
    method: 'post',
    data
  })
}
