import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

export default class Index extends Component {
  constructor () {
    // default
    super()
  }

  config = {
    navigationBarTitleText: 'home'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        I AM HOME
      </View>
    )
  }
}

