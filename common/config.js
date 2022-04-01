let baseURL = '';

if(process.env.NODE_ENV==='development'){
	// 开发环境
	baseURL = 'https://api.ichstudy.com'
}
else{
	baseURL = 'https://api.ichstudy.com'
}

export default baseURL