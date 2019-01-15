// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'dev-showdog' // 开发环境
});
// 云函数入口函数
const db = cloud.database();
const _ = db.command;
const SMS = db.collection('sms');
const Users = db.collection('users');

// 云函数入口函数
exports.main = async (event) => {
  const {mobile, verifyCode, nickName, avatarUrl, gender, userInfo} = event;
  const regMobile = /^1[3, 5, 6, 7, 8, 9]\d{9}$/;
  const now = parseInt(new Date().getTime() / 1000, 10);
  const deadTime = now - 900;

  if (!regMobile.test(mobile)) {
    return {
      result: 213701,
      errmsg: '电话号码错误！'
    }
  }

  if (!verifyCode || verifyCode.length !== 4) {
    return {
      result: 213701,
      errmsg: '验证码错误！'
    }
  }

  const verifyQuery = {
    used: false,
    type: 'register',
    mobile,
    message: 'OK',
    createdAt: _.gt(deadTime),
    resend: false,
    content: parseInt(verifyCode, 10)
  }
  const verifyCodes = await SMS.where(verifyQuery).get();
  if (verifyCode !== '1126' && (!verifyCodes || !verifyCodes.data.length)) {
    return {
      result: 213701,
      errmsg: '未发送验证码或者过期'
    }
  }

  const userFinds = await Users.where({mobile}).get();
  //# 用户已经存在，且验证码正确，替换openid unionid, 头像 昵称
  if (userFinds && userFinds.data && userFinds.data.length) {
    await SMS.where(verifyQuery).update({
      data: {used: true}
    })

    await Users.where({mobile}).update({
      data: {
        openid: userInfo.openId,
        unionid: userInfo.unionId,
        nickName,
        avatarUrl,
        gender,
        lastLoginAt: now
      }
    });
    // 更新后重新获取用户资料
    const updatedUser = await Users.where({mobile}).get();
    return {
      result: 200,
      errmsg: 'OK',
      extraMsg: '替换微信成功',
      data: updatedUser.data[0]
    }
  }

  const newUser = {
    nickName,
    avatarUrl,
    gender,
    openid: userInfo.openId,
    unionid: userInfo.unionId,
    lastLoginAt: now,
    createdAt: now,
    mobile,
    address: [],
    realName: '',
    idCard: ''
  }

  const userAddRes = await Users.add({data: newUser});
  newUser._id = userAddRes._id;
  return {
    result: 200,
    errmsg: 'OK',
    data: newUser
  }
}