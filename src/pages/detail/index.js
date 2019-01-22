import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import { View, Input, Image, Text, Button } from '@tarojs/components'
import Swipers from '../../component/swiper/index'

// import tools from '../../lib/tools';
// import action from '../../redux/action';
import './index.scss'
// 计时器
class Detail extends Component {
  constructor () {
    super()
    this.state = {
      id: ''
    }
  }

  config = {
    navigationBarTitleText: '详情'
  }

  componentWillMount () {
    this.setState({
      id: this.$router.params.id || '1'
    })
  }

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidShow () { }

  componentDidHide () { }
  clickBanner (e) {
  }
  render () {
    const {id} = this.state;
    const images = [
      {
        url: 'https://www.bkjk.com/image/zhu-color.png',
        path: 'goto'
      },
      {
        url: 'https://www.bkjk.com/image/zhuang-color.png',
        path: 'goto1'
      },
      {
        url: 'https://www.bkjk.com/image/zu-color.png',
        path: 'goto3'
      }
    ];
    return (
      <View className='container'>
        <Swipers images={images} onClickFn={this.clickBanner} className='middle' />
        I am detail {id}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pofile: state.userInfo.pofile,
  }
}

export default connect(
  mapStateToProps
)(Detail)

