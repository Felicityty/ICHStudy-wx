import request from "../../common/request.js"

// 获取vr列表
export function getVrList() {
	return request({
		url: '/vr/',
		method: 'POST',
		data: {
			endata: {
				action: 'getvr',
			}
		}
	})
}

// 游客模式 获取vr列表
export function getVrList_tourist() {
	return request({
		url: '/vr/visitor/',
		method: 'POST',
		data: {
			endata: {
				// action: 'getvr'
			}
		}
	})
}