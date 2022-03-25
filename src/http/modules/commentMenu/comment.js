import axios from '../../axios'
/*
评论操作
*/

const preUrl = "/commentMenu/comment/";

export const insertComment = (params) =>{
	return axios({
		url: preUrl + 'insertComment',
		method: 'post',
		params
	})
}

export const selectComment = (params) =>{
	return axios({
		url: preUrl + 'selectComment',
		method: 'get',
		params
	})
}
