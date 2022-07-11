exports.install = function(Vue, options) {

  // 判断是否为空（无提示）
  Vue.prototype.notEmptyN = function(value) {
      if (typeof value == "undefined" || value == null || String(value) == "") {
          return false;
      } else {
          return true;
      }
  }


  // 判断是否为空
  Vue.prototype.notEmpty = function(value, name) {
      if (typeof value == "undefined" || value == null || String(value) == "") {
          this.warnMsg(name + '不能为空！');
          return false;
      } else {
          return true;
      }
  }

  // 判断是否为空
  Vue.prototype.notEmptyFull = function(value, name) {
      if (typeof value == "undefined" || value == null || String(value) == "") {
          this.warnMsg(name);
          return false;
      } else {
          return true;
      }
  }

/*------------      消息提示     ------------*/
// 成功消息提示
Vue.prototype.succMsg = function(str) {
  this.$message({
      message: str,
      type: 'success'
  });
}

// 警告消息提示
Vue.prototype.warnMsg = function(str) {
  this.$message({
      message: str,
      type: 'warning'
  });
}

// 错误消息提示
Vue.prototype.errMsg = function(str) {
  this.$message.error(str);
}

// 普通消息提示
Vue.prototype.Msg = function(str) {
  this.$message(str);
}

/*------------      时间、日期格式化     ------------*/
// 日期格式化
Vue.prototype.dateFormate = function(dateStr) {
  if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
  var dt = new Date(dateStr);
  return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0');
}

// 日期时间格式化
Vue.prototype.dateTimeFormate = function(dateStr) {
  if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
  var dt = new Date(dateStr);
  return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0') +
      ' ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0');
}

// 年月日时分
Vue.prototype.dateToMinutes = function(dateStr) {
  if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
  var dt = new Date(dateStr);
  return dt.getFullYear() + '/' + (dt.getMonth() + 1).toString().padStart(2, '0') + '/' + dt.getDate().toString().padStart(2, '0')+
  ' ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0');
}

// 时间格式化
Vue.prototype.timeFormate = function(dateStr) {
  if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
  var dt = new Date(dateStr);
  return dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0');
}


// 时间格式化
Vue.prototype.timeSecondsFormate = function(dateStr) {
  if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
  var dt = new Date(dateStr);
  return dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') +
      ' ' + dt.getSeconds().toString().padStart(2, '0');
}

// 时间格式化
Vue.prototype.MinutesFormate = function(dateStr) {
  if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
  var dt = new Date(dateStr);
  return dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0');
}

Vue.prototype.time = function(datetime) {
  if (datetime == null && datetime == undefined){
    return null;
  }
  let date = new Date(parseInt(datetime))
  let y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? ('0' + MM) : MM
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + MM + '-' + d 
}

Vue.prototype.timeByMinutes = function(datetime) {
  if (datetime == null && datetime == undefined){
    return null;
  }
  let date = new Date(parseInt(datetime))
  let y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? ('0' + MM) : MM
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let m = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  let s = date.getSeconds()
  s = s < 10 ? ('0' + s) : s
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m
}

// 格式校验
Vue.prototype.isEmail = function(email) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)
}

Vue.prototype.isMobile = function(mobile) {
  return /^1[0-9]{10}$/.test(mobile)
}

Vue.prototype.isInterger = function(str) {
  return /^\d+$/.test(str)
}

// 字符串操作
Vue.prototype.splitString = function(str, mark) {
  var option = str;
  var flag = mark;
  var list = option.split(mark);
  // console.log(list);
  if (list.length == 1) {
    return list;
  }
  for (let i = 2; i < list.length; i++) {
    list[1] += mark + list[i];
  }
  var optionList = [];
  optionList.push(list[0],list[1]);
  // console.log(optionList);
  return optionList;
}




}