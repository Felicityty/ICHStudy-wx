import request from "../../common/request.js"

// 获取tourist列表
export function getTouristList() {
	return request({
		url: '/research_trip/visitor/getresearch_trip/',
		method: 'POST',
		data: {
			endata: {
				action: 'getResearch_Trip'
			}
		}
	})
}

// 获取tourist-section列表
export function getTouristSectionList(tindex) {
	return request({
		url: '/trip_scene/visitor/gettrip_scene/',
		method: 'POST',
		data: {
			endata: {
				action: 'getTrip_Scene',
				tindex
			}
		}
	})
}