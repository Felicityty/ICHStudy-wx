let baseURL = '';

if(process.env.NODE_ENV==='development'){
	// 开发环境
	baseURL = 'http://47.114.116.87:8098/app'
}
else{
	baseURL = 'http://47.114.116.87:8098/app'
}

export default baseURL