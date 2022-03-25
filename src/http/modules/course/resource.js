//import { all } from 'core-js/fn/promise';
import axios from '../../axios'

/* 
 * 元数据管理模块
 */

 const preUrl = "/course/resource/";

// 获取 1212
export const findAllCourse = (params) => {
  return axios({
    url: preUrl + 'findAllCourse',
    method: 'get',
    params
  })
}

//学生端获取已发布的PPT资源
export const searchPPT = (params) => {
  return axios({
    url: preUrl + 'searchPPT',
    method: 'get',
    params
  })
}

//学生端获取已发布的video资源
export const searchVideo = (params) => {
  return axios({
    url: preUrl + 'searchVideo',
    method: 'get',
    params
  })
}
// export const searchPPT = (data) => {
//   return axios({
//     url: preUrl + 'searchPPT',
//     method: 'patch',
//     data
//   })
// }

//教师端获取全部已上传PPT的资源
export const searchPPTS = (params) => {
  return axios({
    url: preUrl + 'searchPPTS',
    method: 'get',
    params
  })
}

//教师端获取全部已上传video的资源
export const searchVideos = (params) => {
  return axios({
    url: preUrl + 'searchVideos',
    method: 'get',
    params
  })
}
//教师端获取ppt评价详情
export const pptAssess = (params) => {
  return axios({
    url: preUrl + 'pptAssess',
    method: 'get',
    params
  })
}
//教师端获取video评价详情
export const videoAssess = (params) => {
  return axios({
    url: preUrl + 'videoAssess',
    method: 'get',
    params
  })
}
// export const searchPPTS = (data) => {
//   return axios({
//     url: preUrl + 'searchPPTS',
//     method: 'patch',
//     data
//   })
// }

  //教师端将资源发布
export const resourceRelease = (params) => {
  return  axios({
    url: preUrl + 'release',
    method: 'get',
    params
  })
}

  //教师端将PPT资源删除
  export const resourceDeletePPT = (params) => {
    return  axios({
      url: preUrl + 'deletePPT',
      method: 'get',
      params
    })
  }

  //教师端将video资源删除
  export const resourceDeleteVideo = (params) => {
    return  axios({
      url: preUrl + 'deleteVideo',
      method: 'get',
      params
    })
  }

   //资源批量删除
   export const deleteAllPPT = (data) => {
    return  axios({
      url: preUrl + 'delAllPPT',
      method: 'patch',
      data
    })
  }

    //资源批量删除
    export const deleteAllVideo = (data) => {
      return  axios({
        url: preUrl + 'delAllVideo',
        method: 'patch',
        data
      })
    }

  
   //资源批量发布
   export const releaseAll = (data) => {
    return  axios({
      url: preUrl + 'relAll',
      method: 'patch',
      data
    })
  }

  //学生课程资源评价
  export const assess = (params) => {
    return  axios({
      url: preUrl + 'assess',
      method: 'get',
      params
    })
  }

  //教师端查询PPTId
  export const getpptId = (params) => {
    return  axios({
      url: preUrl + 'searchPPTId',
      method: 'get',
      params
    })
  }

  //教师端查询PPTId
  export const getvideoId = (params) => {
    return  axios({
      url: preUrl + 'searchVideoId',
      method: 'get',
      params
    })
  }