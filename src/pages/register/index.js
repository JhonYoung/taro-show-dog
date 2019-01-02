import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'

export default class Register extends Component {
  constructor () {
    super()
  }

  config = {
    navigationBarTitleText: 'home'
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

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  sendSms () {
    debugger
    wx.cloud.callFunction({
      name: 'sendSms',
      data: {
        mobile: '17628287626'
      }
    }).then((res) => {
      debugger;
      console.log(res);
    })
  }

  render () {
    return (
      <View className='index'>
        I AM register

        <Button onClick={this.sendSms}>发送短信</Button>

      </View>
    )
  }
}

