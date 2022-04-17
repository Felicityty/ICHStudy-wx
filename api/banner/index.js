import request from "../../common/request.js"

// 获取banner列表
export function getBannerList() {
	return request({
		url: '/banner/',
		method: 'POST',
		data: {
			endata: {
				action: 'getbanner'
			}
		}
	})
}