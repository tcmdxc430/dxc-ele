export function formatDate(date, fmt) {
	// 以y开头的一个或多个字符串
	if (/(y+)/.test(fmt)) {
		// RegExp.$1为等待替换值，即yyyy字符串
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
