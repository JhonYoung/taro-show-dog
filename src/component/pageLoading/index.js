import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './style.scss'

export default class PageLoading extends Component {
  render () {
    return (
      <View className='loading'>
        <View className='circle'></View>
        <View className='circle'></View>
        <View className='circle'></View>
        <View className='circle'></View>
        <View className='circle'></View>
        <View className='circle'></View>
        <View className='circle'></View>
      </View>
    )
  }
}