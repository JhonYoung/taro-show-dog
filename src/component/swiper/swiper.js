import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.styl'
import BoxLoading from '../../component/boxLoading/index'

export default class Swipers extends Component {
  goTo (item, e) {
    e.stopPropagation()
    // 跳转或者是弹窗
    item.type === 'navigate' ? Taro.navigateTo({ url: `/pages/${item.path}/index`}) : this.props.onClickFn(item, e)
  }
  render () {
    const {images} = this.props
    return (
      <view>
        {images.length ? <Swiper
          className='swiper-wrap'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
          >
          {
            images.map(item => {
              return (
                <SwiperItem onClick={this.goTo.bind(this, item)} key={item.path}>
                  <Image src={item.url} style='width: 375px; height: 150px;' mode='aspectFill' />
                </SwiperItem>
              )
            })
          }
        </Swiper> : <BoxLoading className='swiper-wrap' />}
      </view>
      
    )
  }
}

Swipers.propTypes = {
  images: PropTypes.array,
  onClickFn: PropTypes.func
}

Swipers.defaultProps = {
  images: [],
  onClickFn: () => {}
}
// {
//   type: 'navigate'，
//   url: imagePath,
//   path: navigateUrl
// }