import request from "../common/request.js"

export function exampleGET() {
	return request({
		url: '',
		method: 'GET'
	})
}

export function examplePOST(data1) {
	return request({
		url: 'course/',
		method: 'POST',
		data: {
			endata: {
				action: data1
			}
		}
	})
}