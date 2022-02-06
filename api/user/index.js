import request from "../../common/request.js"

// 登录
export function login(username, password) {
	return request({
		url: '/login/',
		method: 'POST',
		data: {
			endata: {
				username,
				password
			}
		}
	})
}

// 刷新token
export function refreshToken() {
	return request({
		url: '/user',
		method: 'POST',
		data: {
			endata: {
				action: 'gettoken'
			}
		}
	})
}
