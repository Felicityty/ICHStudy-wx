// 重写文件路径
function getFileUrl(type, name) {
	return `https://testapi.ichstudy.com/fstream/?endata={%27filetype%27:%27${type}%27,%27filename%27:%27${name}%27}`
}

export { getFileUrl }