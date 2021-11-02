import baseURL from './config.js'
// import store from '/store/index.js'; //vuex

// let token = ' '; //凭证

function service(options = {}) {
	// store.state.token && (token = store.state.token); //从vuex中获取登录凭证
	options.url = `${baseURL}${options.url}`;
	options.dataType = 'JSON';
	
	//配置请求头
	options.header = {
		// 'content-type': 'application/x-www-form-urlencoded',
		'Content-type':'application/json',
		// 'token': token
	};
	
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
			resolved(res);
		}

		//错误
		options.fail = (err) => {
			rejected(err); //错误
		}

		uni.request(options);
	});
}

export default service;
