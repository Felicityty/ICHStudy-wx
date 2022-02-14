import request from "../../common/request.js"

// 获取vr列表
export function getVrList() {
	return request({
		url: '/vr/',
		method: 'POST',
		data: {
			endata: {
				action: 'getvr'
			}
		}
	})
}