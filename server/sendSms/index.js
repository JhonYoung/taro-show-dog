// 云函数入口文件
const cloud = require('wx-server-sdk');
const MR = require("m-random");
const crypto = require('crypto');
const axios = require('axios');

cloud.init({
  env: 'dev-showdog' // 开发环境
});
// 云函数入口函数
const db = cloud.database();
const _ = db.command;
const SMS = db.collection('sms');
const appid = 1400175111;  // SDK AppID是1400开头
const appkey = "a0c34e235444a1f6da8c0d8fc73514f2";
const tpl_id = 256406;
const sign = "成都普若怀德科技有限公司";
const random = MR.Number.int(0, 10000);
const url = `https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=${appid}&random=${random}`;

// 发送注册短信，并且将短信存储到数据库
exports.main = async (event) => {
  const time = parseInt(new Date().getTime() / 1000, 10);
  const deadTime = time - 900;

  // 验证参数
  const mobile = event.mobile;
  if (!mobile || mobile.length !== 11 || mobile.slice(0, 1) !== '1') {
    return {
      result: 213701,
      errmsg: '电话号码错误，请重新输入！'
    }
  }

  // 如果用户重新发送，则更新未过期的验证码resend为true
  await SMS.where({
    used: false,
    type: 'register',
    mobile,
    message: 'OK',
    createdAt: _.gt(deadTime),
    resend: false
  }).update({
    data: {
      resend: true
    }
  });

  // 发送短信
  const authCode = MR.Number.int(1000, 9999);
  const str = `appkey=${appkey}&random=${random}&time=${time}&mobile=${mobile}`;
  const sig = crypto.createHash('sha256').update(str).digest('hex');
  const data = {
    sig,
    sign,
    time,
    tpl_id,
    tel: {
      mobile,
      nationcode: '86'
    },
    params: [authCode],
  }

  console.log('send sms authCode is ===>', authCode);
  console.log('send sms mobile is ===>', mobile);
  const res = await axios.post(url, data);
  // 插入数据
  const smsData = {
    mobile,
    createdAt: time, // 创建时间
    type: 'register',
    content: authCode, // 验证码
    message: res.data.errmsg, // 短信发送结果
    used: false, // 用户是否注册
    resend: false // 用户是否重新发送验证码
  }
  try {
    await SMS.add({data: smsData});
  } catch (e) {
    console.log(e);
  }
  
  return res.data;
}