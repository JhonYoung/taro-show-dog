// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'dev-showdog' // 开发环境
});
// 云函数入口函数
const db = cloud.database();
const _ = db.command;
const Users = db.collection('users');

// 云函数入口函数
exports.main = async (event) => {
  const {userInfo} = event;
  const userFinds = await Users.where({openid: userInfo.openId}).get();
  //# 用户已经存在，且验证码正确，替换openid unionid, 头像 昵称
  if (userFinds && userFinds.data && userFinds.data.length) {
    return {
      result: 200,
      errmsg: 'OK',
      data: userFinds.data[0]
    }
  } else {
    return {
      result: 200,
      errmsg: 'OK',
      data: {}
    }
  }
}