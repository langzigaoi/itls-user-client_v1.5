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


}