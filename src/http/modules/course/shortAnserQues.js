import axios from '../../axios'


/* 
 * 课程与课程实例-课程实例内容周下面的节管理
 */

const preUrl = "/problem/shortAnswer/";


// 新增简答题
export function addShortAnserQues(data) {
  return axios({
    url: preUrl + 'add',
    method: 'post',
    data
  })
}

// 按知识点查询简答题
export function selectShortAnserQuesByKid(params) {
  return axios({
    url: preUrl + 'findByKnoId',
    method: 'get',
    params: {
      knowledgeId: params
    }
  })
}
// 按id删除简答题
export function delShortAnserQuesByKid(data) {
  return axios({
    url: preUrl + 'del',
    headers: {
      'Content-Type': 'application/json;'
    },
    method: 'delete',
    data
  })
}
// 编辑简答题
export function updateShortAnserQuesByid(data) {
  return axios({
    url: preUrl + 'update',
    method: 'patch',
    data
  })
}

