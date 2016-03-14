/**
 * Created by Nomand on 3/7/16.
 */
'use strict';

let version = '0.0.1';

//articleId
export function setArticleId(age) {
  return Math.floor(Math.random() * 0xFFFFFFFF).toString(age).slice(-6) + new Date().getTime().toString(age).slice(-6)
}

//Emoji
export function emojiDecoding(data) {
  return data.replace(/\[((\w|\-)+)\]/g, '<i class="emoji-face emoji-$1"></i>');
}

//vue tolowercase
export function camelcaseToHyphen(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

//date format
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
export function formatDate(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//second
export function MillisecondToDate(msd) {
  var time = parseFloat(msd) / 1000;
  var str = "";
  if (null != time && "" != time) {

    if (time > 60 && time < 3600) {
      str = parseInt(time / 60.0) + " 分钟前";
    }
    else if (time >= 3600 && time < 86400) {
      str = parseInt(time / 3600.0) + " 小时前";
    }
    else if (time >= 86400 && time < 86400 * 30) {
      str = parseInt(time / 86400.0) + " 天前";
    }
    else if (time >= 86400 * 30 && time < 86400 * 365) {
      str = parseInt(time / (86400.0 * 30)) + " 个月前";
    }
    else if (time >= 86400 * 365) {
      str = parseInt(time / (86400.0 * 365)) + " 年前";
    }
    else {
      str = parseInt(time) + " 秒前";
    }
  }
  return str;
}

