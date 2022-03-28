import baseURL from './config.js'

function service(options = {}) {
	// store.state.token && (token = store.state.token); //从vuex中获取登录凭证
	options.url = `${baseURL}${options.url}`;
	options.dataType = 'JSON';
	
	//配置请求头
	options.header = {
		// 'content-type': 'application/x-www-form-urlencoded',
		'Content-type':'application/json',
		'token': wx.getStorageSync('token')
	};
	
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
			const msg = JSON.parse(res.data).endata.msg
			if(msg === 'token已失效') {
				uni.reLaunch({
					url: '../index/index'
				})
				rejected(res)
			} else {
				resolved(res);
			}
		}

		//错误
		options.fail = (err) => {
			rejected(err);
		}

		uni.request(options);
	});
}

export default service;
