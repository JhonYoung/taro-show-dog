import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import swiper from '../../component/swiper'

import './index.styl'

export default class Index extends Component {
  constructor () {
    // default
    super()
    this.state = {}
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goTo (path) {
    Taro.navigateTo({
      url: `/pages/${path}/index`
    })
  }

  clickBanner (item, e) {
    console.log(item)
    console.log(e)
    
  }

  render () {
    const images = [
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544071491503&di=0f945a4fb509efe49b6167b1c7864df2&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D1530333961600c33e474d68b72253b7a%2F8644ebf81a4c510fa7aa12376a59252dd42aa5b5.jpg',
        path: 'home',
        type: 'navigate'
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544071491501&di=744f9ed032d5dade8a6653e10d6ed98a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa8773912b31bb05155a3d50b3c7adab44aede00a.jpg',
        path: 'hello'
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544071491501&di=04be9c16c3513cf683686cb7bd7bf49f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D6db4b4eeb8fb43160e12723948cd2c56%2F6c224f4a20a44623592e71479222720e0cf3d72b.jpg',
        path: 'world'
      }
    ]
    return (
      <View className='index'>
        <swiper images={images} onClickFn={this.clickBanner} />
        <Text>Hello boy!</Text>
        <Button onClick={this.goTo.bind(this, 'home')}>
          go to home
        </Button>
      </View>
    )
  }
}

