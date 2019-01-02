// 云函数入口文件
const cloud = require('wx-server-sdk');
// import cloud from 'wx-server-sdk';
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    sum: event.a + event.b,
    wxContext
  }
}
