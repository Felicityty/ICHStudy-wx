import request from "../../common/request.js"

// 获取课程列表
export function getCourseList() {
	return request({
		url: '/course/',
		method: 'POST',
		data: {
			endata: {
				action: 'getcourse'
			}
		}
	})
}
