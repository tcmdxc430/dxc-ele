// 存储
export function saveToLocal(id, key, value) {
	let seller = window.localStorage.__seller__;//双下划线表示私有
	// 第一次没有存储时
	if (!seller) {
		seller = {};
		seller[id] = {};
	} else {
		seller = JSON.parse(seller);// localstorage存储的是字符串
		if (!seller[id]) { // 有seller没有seller.id时，也就是传入不同商家时
			seller[id] = {};
		}
	}
	seller[id][key] = value; 
	window.localStorage.__seller__ = JSON.stringify(seller);
};
// 读取
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
		return def;// 没有存储时返回默认值
	}
	seller = JSON.parse(seller)[id]; // json.parse把json字符串转换为json对象
	if (!seller) { //当id是空时
		return def;
	}
	let ret = seller[key];
	return ret || def; //当没有key时，返回def
};
