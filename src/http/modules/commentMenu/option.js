import axios from '../../axios'
/*
讨论区操作
*/

const preUrl = "/commentMenu/option/";



//发布问题
export const insert = (params) => {
	return axios({
		url: preUrl + 'insert',
		method: 'post',
		params
	})
}

export const getAll = (params) => {
	return axios({
		url: preUrl + 'getAll',
		method: 'get',
		params
	})
}

export const addLikeCount = (params) => {
	return axios({
		url: preUrl + 'addLikeCount',
		method: 'patch',
		params
	})
}

export const selectbyid = (params) =>{
	return axios({
		url: preUrl + 'selectbyid',
		method: 'get',
		params
	})
}

export const endtitle = (params) =>{
	return axios({
		url: preUrl + 'endtitle',
		method: 'patch',
		params
	})
}

export const getAllbytag = (params) =>{
	return axios({
		url: preUrl + 'getAllbytag',
		method: 'get',
		params
	})
}

export const updateTimeQuestion =(params) =>{
	return axios({
		url: preUrl + 'updateTimeQuestion',
		method: 'patch',
		params
	})
}

export const getAllbycreater =(params) =>{
	return axios({
		url: preUrl +'getAllbycreater',
		method: 'get',
		params
	})
}