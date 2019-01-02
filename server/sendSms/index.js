// 云函数入口文件
const cloud = require('wx-server-sdk');
const MR = require("m-random");
const crypto = require('crypto');
const axios = require('axios');

cloud.init();
// 云函数入口函数
const appid = 1400175111;  // SDK AppID是1400开头
const appkey = "a0c34e235444a1f6da8c0d8fc73514f2";
const tpl_id = 256406;
const sign = "成都普若怀德科技有限公司";
const random = MR.Number.int(0, 10000);
const url = `https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=${appid}&random=${random}`;

exports.main = async (event, context) => {
  const authCode = MR.Number.int(1000, 9999);
  const time = parseInt(new Date().getTime() / 1000, 10);
  const str = `appkey=${appkey}&random=${random}&time=${time}&mobile=${event.mobile}`;
  const sig = crypto.createHash('sha256').update(str).digest('hex');
  console.log('send sms authCode is ===>', authCode);
  const data = {
    params: [authCode],
    sig,
    sign,
    tel: {
      mobile: event.mobile,
      nationcode: '86'
    },
    time,
    tpl_id
  }
  const res = await axios.post(url, data);
  return res.data;
}