//防抖函数
export function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

//格式化时间
//dateTime：时间戳；  flag：取值为true/false，用于判断是否需要显示时分秒
export function formatDate(date, fmt){
  if(/(y+)/.test(fmt)){
      date= new Date(date*1000);
      fmt = fmt.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length));
      var o ={
          'M+':date.getMonth()+1,
          'd+':date.getDate(),
          'h+':date.getHours(),
          'm+':date.getMinutes(),
          "s+":date.getSeconds()
      }
      for(var k in o){
          if(new RegExp(`(${k})`).test(fmt)){
              var str =o[k]+'';
              fmt = fmt.replace(RegExp.$1,(RegExp.$1.length ===1) ? str : padLeftZero(str));
          }
      }
      return fmt;
  }
};
function padLeftZero(str){
  return  ('00'+str).substr(str.length);
}
