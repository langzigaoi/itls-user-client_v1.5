module.exports = {
  lintOnSave: false,  // 关闭eslint校验
  publicPath: '/', //打包运行环境的根路径为/
  devServer: { // 开发调试服务器配置项
    open: false, // npm run serve后自动打开页面
    host: 'localhost', // 匹配本机IP地址
    port: 8080, // 开发服务器运行端口号
    compress: true // 启用静态资源压缩算法
  }
}