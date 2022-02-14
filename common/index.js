// 重写文件路径
function getFileUrl(type, name) {
	return `http://47.114.116.87:8098/app/fstream/?endata={%27filetype%27:%27${type}%27,%27filename%27:%27${name}%27}`
}

export { getFileUrl }