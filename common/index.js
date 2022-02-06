// 重写文件路径
function getFileUrl(type, name) {
	return `http://47.114.116.87:8099/app/fstream/?endata={'filetype':'${type}','filename':'${name}'}`
}

export { getFileUrl }