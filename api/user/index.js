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

// 注册
export function register (name, pwd, email) {
  return request({
    url: '/register/',
    method: 'POST',
    data: {
      endata: {
        username: name,
        password: pwd,
        email: email
      }
    }
  })
}

// 发送邮箱验证码
export function sendVer (url, email) {
  return request({
    url: url,
    // url: 'vregsend/',
    method: 'POST',
    data: {
      endata: {
        email: email
      }
    }
  })
}

// 确认验证码
export function checkVer (code, email) {
  return request({
    url: '/regactive/',
    method: 'POST',
    data: {
      endata: {
        email: email,
        code: code
      }
    }
  })
}

//获取播放数据
export function getPlayData (username) {
  return request({
    url: '/getplaydata/',
    method: 'POST',
    data: {
      username: username
    }
  })
}

//
export function setting (info) {
  return request({
    url: '/user',
    method: 'POST',
    data: {
      endata: {
        action: 'updinfo',
        username: info.username,
        nickname: info.nickname,
        sex: info.sex,
        signature: info.signature
      }
    }
  })
}