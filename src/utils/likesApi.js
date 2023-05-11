import tokenService from "./tokenService";

const BASE_URL = '/api/'


export function create(postId){
    console.log('utils create hitting')
	return fetch(`${BASE_URL}posts/${postId}/likes`, {
		method: 'POST',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		}
	}).then(res => res.json())
}

export function removeLike(likeId){
	return fetch(`${BASE_URL}likes/${likeId}`, {
		method: 'DELETE',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		}
	}).then(res => res.json())
}