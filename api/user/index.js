import request from "../../common/request.js"

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

// 获取用户信息
export function getUserInfo () {
  return request({
    url: '/user',
    method: 'POST',
    data: {
      endata: {
        action: 'getinfo'
      }
    }
  })
}

// 退出登录
export function logout () {
  return request({
    url: '/user',
    method: 'POST',
    data: {
      endata: {
        action: 'logout'
      }
    }
  })
}

// 注册
export function register (name, pwd) {
  return request({
    url: '/register/',
    method: 'POST',
    data: {
      endata: {
        username: name,
        password: pwd
      }
    }
  })
}
// 绑定邮箱
export function mailBand (email, username) {
  return request({
    url: '/mailband/',
    method: 'POST',
    data: {
      endata: {
        email,
        username
      }
    }
  })
}

// 确认邮箱绑定
export function mailVerify (email, username, code) {
  return request({
    url: '/mailverify/',
    method: 'POST',
    data: {
      endata: {
        email,
        username,
        code
      }
    }
  })
}

// 绑定手机
export function smsBand (phone, username) {
  return request({
    url: '/smsband/',
    method: 'POST',
    data: {
      endata: {
        phone,
        username
      }
    }
  })
}

// 确认手机绑定
export function smsVerify (phone, username, code) {
  return request({
    url: '/smsverify/',
    method: 'POST',
    data: {
      endata: {
        phone,
        username,
        code
      }
    }
  })
}

// 验证码登录
export function loginEmail (email, code) {
  return request({
    url: '/emailogin/',
    method: 'POST',
    data: {
      endata: {
        email: email,
        code: code
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

// 邮箱验证
export function passwordreset (username) {
  return request({
    url: '/passwordreset/',
    method: 'POST',
    data: {
      endata: {
        username: username
      }
    }
  })
}

// 发送邮箱验证码
export function sendmailforreset (email) {
  return request({
    url: '/sendmailforreset/',
    method: 'POST',
    data: {
      endata: {
        email: email
      }
    }
  })
}

// 发送手机验证码
export function sendsmsforreset (phone, username) {
  return request({
    url: '/sendsmsforreset/',
    method: 'POST',
    data: {
      endata: {
				phone: phone,
				username: username
      }
    }
  })
}

// 邮箱验证码验证
export function emailpasswordresetverify (email, code) {
  return request({
    url: '/passwordresetverify/',
    method: 'POST',
    data: {
      endata: {
				email: email,
				code: code
      }
    }
  })
}

// 手机验证码验证
export function smspasswordresetverify (phone, code) {
  return request({
    url: '/passwordresetverify/',
    method: 'POST',
    data: {
      endata: {
				phone: phone,
				code: code
      }
    }
  })
}

//通过验证修改密码
export function passwordmailresetdone (username, password, verifypassword) {
  return request({
    url: '/passwordmailresetdone/',
    method: 'POST',
    data: {
			endata: {
				username: username,
				password: password,
				verifypassword: verifypassword
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

export function up (cindex, cnname, enname, imgpath, cninfo, eninfo, sindex, senname, scnname, videopath, subtitlepath) {
  return request({
    url: '/course/',
    method: 'POST',
    data: {
      endata: {
        action: 'addcourse',
        cindex: cindex,
        cnname: cnname,
        enname: enname,
        imgpath: imgpath,
        cninfo: cninfo,
        eninfo: eninfo,
        sdata: {
          sindex: sindex,
          enname: senname,
          cnname: scnname,
          videopath: videopath,
          subtitlepath: subtitlepath
        }
      }
    }
  })
}