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

    const data = {
      name: '贝壳找房',
      detailImg: images,
      tag: ['合院', '的文', '需的', '还包'],
      feature: '说白了，这个Docker镜像，是一个特殊的文件系统。它除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（例如环境变量）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。'
    }

    const tips = [
      {
        title: '大小',
        value: '中型'
      },
      {
        title: '智商',
        value: 'low'
      },
      {
        title: '用途分类',
        value: '搜救'
      },
      {
        title: '平均寿命',
        value: '18年'
      },
      {
        title: '掉毛程度',
        value: '严重'
      },
      {
        title: '驯养难度',
        value: '简易'
      },
      {
        title: '饲养难度',
        value: '容易'
      },
      {
        title: '产地',
        value: '中国'
      },
      {
        title: '幼崽价格',
        value: '1000左右'
      },
    ]
    return (
      <View className='container'>
        <Swipers images={images} onClickFn={this.clickBanner} className='middle' />
        <View className='desc'>
          <View className='name'>
            <View>{data.name}</View>
            <View>{data.otherNames.join('，')}}</View>
          </View>
          <View className='feature-tips'>
            {
              tips.map((doc) => {
                return <View className='item' key={doc.title}>
                  <View className='title'>{doc.title}</View> 
                  <View className='value'>{doc.value}</View> 
                </View>
              })
            }
          </View>
          <View className='tag'>{
            data.tag.map((doc) => {
              return (<View className='tag-item' key={doc}>{doc}</View>)
            })
          }</View>
          <View className='feature'>{data.feature}</View>
        </View>

        <View className='picture-wrap'>
          {
            data.detailImg.map((doc) => {
              return (<Image src={doc.url} className='detail-img-url' key={doc.url}></Image>)
            })
          }
        </View>
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

