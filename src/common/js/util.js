/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search; // ?id=12345&a=b
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g; // 字符包含?或& 并且后面不是?或者& '+'是一个或多个 用等号链接直到下一个?/&结束 为一个字符结果
  let arr = url.match(reg);
  // 把['?id=12345', '&a=b']这个数组赋值arr
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');// 从1下标开始，以=为分割 ?id=12345 ==> [id,12345]
      let key = decodeURIComponent(tempArr[0]); // id  decodeURIComponent解码
      let val = decodeURIComponent(tempArr[1]); // 12345
      obj[key] = val;
    });
  }
  return obj;
};
