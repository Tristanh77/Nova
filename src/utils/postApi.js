
import tokenService from "./tokenService";
const BASE_URL = '/api/posts/';


export function create(data){
    console.log(data)
	return fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify(data), 
		headers: {
			Authorization: "Bearer " + tokenService.getToken(), 
            'Content-Type': 'application/json'
		}
	}).then(responseFromTheServer => {
		if(responseFromTheServer.ok) return responseFromTheServer.json() 
		throw new Error('Something went wrong in create Post'); 
	})
}





export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		Authorization: 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }