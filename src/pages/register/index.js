import Taro, { Component } from '@tarojs/taro'
import { View, Input, Image, Text } from '@tarojs/components'
import tools from '../../lib/tools';
import './index.scss'
// 计时器
let timer;

export default class Register extends Component {
  constructor () {
    super()
    this.state = {
      mobile: '',
      verifyCode: '',
      sendBtn: false,
      count: 0
    }
  }

  config = {
    navigationBarTitleText: '注册'
  }

  componentWillMount () { }

  componentDidMount () {
    // wx.cloud.callFunction({
    //   name: 'add',
    //   data: {
    //     a: 12,
    //     b: 19
    //   }
    // }).then((res) => {
    //   debugger;
    //   console.log(res);
    // })
  }

  componentWillUnmount () { 
    timer && clearInterval(timer);
  }

  componentDidShow () { }

  componentDidHide () { }
  
  // 发送验证码
  sendSms () {
    const {mobile, sendBtn} = this.state;
    const self = this;
    if (!sendBtn) {
      Taro.showToast({
        title: '请填写正确的手机号码',
        icon: 'none'
      });
      return;
    }

    // 当前正在倒计时
    if (timer) {
      return;
    }

    self.setState({count: 60});
    self.startTimer();
    wx.cloud.callFunction({
      name: 'sendSms',
      data: {
        mobile
      }
    }).then((res) => {
      if (!res.result || res.result.errmsg !== 'OK') {
        Taro.showToast({
          title: res.result.errmsg || '短信发送失败',
          icon: 'none'
        });
        self.setState({count: 0});
        clearInterval(timer);
      }
    })
  }
  // 启用计时器
  startTimer () {
    const self = this
    if (timer) {
      return
    }
    timer = setInterval(() => {
      if (self.state.count <= 0) {
        self.count = 0
        self.setState({count: 0})
        clearInterval(timer)
        timer = null
      } else {
        self.setState({ count: self.state.count - 1})
      }
    }, 1000)
  }

  // 写入电话号码
  mobileChange (e) {
    const value = e.target.value;
    const ismobile = tools.verifyMobile(value);
    this.setState({
      sendBtn: ismobile,
      mobile: value
    })
  }

  // 写入验证码
  verifyCodeChange (e) {
    const value = e.target.value;
    this.setState({ verifyCode: value });
  }

  // 注册方法
  register () {
    const {mobile, verifyCode} = this.state;
    if (!this.checkData({mobile, verifyCode})) {
      return;
    }
  }

  // 前端验证
  checkData ({mobile, verifyCode}) {
    if (!mobile || !tools.verifyMobile(mobile)) {
      Taro.showToast({
        title: '电话号码有误！',
        icon: 'none'
      });
     return false
    }

    if (!verifyCode || verifyCode.length !== 4) {
      Taro.showToast({
        title: '验证码有误',
        icon: 'none'
      });
      return false;
    }
    return true;
  }

  render () {
    const {mobile, verifyCode, sendBtn, count} = this.state;
    return (
      <View className='index'>
        <View className='total-bg'>
          <View className='grey-bg'></View>
          <Image src='https://6465-dev-showdog-1258380429.tcb.qcloud.la/images/login-bg.jpg?sign=3d16a182b62d08f936cd0ae2273a70f1&t=1547449638'/>
        </View>
        <View className='logo'>
          <Image src='https://6465-dev-showdog-1258380429.tcb.qcloud.la/images/d.svg?sign=8d8d486addd6ecd1705c16032f267554&t=1547445435'></Image>
        </View>
        <View className='form-wrap'>
          <View className='mobile-send'>
            <Input type='number' placeholder='电话号码' maxLength='11' className='mobile-input' value={mobile} onInput={this.mobileChange} />
            <Text onClick={this.sendSms} className={`sms-btn ${ sendBtn ? 'active' : ''}`}>{count ? `${count}后重新获取` : '发送短信'}</Text>
          </View>
          <Input type='number' placeholder='验证码' className='verify-code'  value={verifyCode} onInput={this.verifyCodeChange} maxLength={4} />
          <View onClick={this.register} className='register-btn'>注册</View>
        </View>
        
      </View>
    )
  }
}

