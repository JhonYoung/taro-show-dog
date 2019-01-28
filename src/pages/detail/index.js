import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import { View, Input, Image, Text, Button } from '@tarojs/components'
import Swipers from '../../component/swiper/index'
import {Dogs} from '../../lib/db';

// import tools from '../../lib/tools';
// import action from '../../redux/action';
import './index.scss'
// 计时器
class Detail extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      dog: {}
    }
  }

  config = {
    navigationBarTitleText: '详情'
  }

  componentWillMount () {
    const id =  this.$router.params.id || '5c4ecfbd6b2e8007730682a4'
    this.setState({id})
    Dogs.where({
      _id: id
    }).get().then( res => {
      console.log(res.data);
      const data = res.data[0];
      this.setState({dog: data})
    })
  }

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {dog} = this.state;
    const images = dog.headerPic;

    const data = {
      detailImg: images,
      otherNames: ['zhangs', 'wer'],
      tag: ['合院', '的文', '需的', '还包'],
      feature: '说白了，这个Docker镜像，是一个特殊的文件系统。它除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（例如环境变量）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。'
    }

    const related = [
      {
        name: 'zhandan',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548674846850&di=c55f15620c19e14fff6b2911417625d2&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F0076INZAly1fqmfr8y880j30rs0fmab9.jpg'
      },
      {
        name: 'lisi',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548674846850&di=c55f15620c19e14fff6b2911417625d2&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F0076INZAly1fqmfr8y880j30rs0fmab9.jpg'
      },
      {
        name: 'wangwu',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548674846850&di=c55f15620c19e14fff6b2911417625d2&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F0076INZAly1fqmfr8y880j30rs0fmab9.jpg'
      },
      {
        name: 'san',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548674846850&di=c55f15620c19e14fff6b2911417625d2&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F0076INZAly1fqmfr8y880j30rs0fmab9.jpg'
      },
      {
        name: 'few',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548674846850&di=c55f15620c19e14fff6b2911417625d2&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F0076INZAly1fqmfr8y880j30rs0fmab9.jpg'
      },
      {
        name: 'ere',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548674846850&di=c55f15620c19e14fff6b2911417625d2&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F0076INZAly1fqmfr8y880j30rs0fmab9.jpg'
      },

    ]

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
            <View>{dog.name}</View>
            <View className='other-name'>{(dog.otherNames || []).join('，')}</View>
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
            dog.tags.map((doc) => {
              return (<View className='tag-item' key={doc}>{doc}</View>)
            })
          }</View>
          <View className='feature'>{dog.feature}</View>
        </View>

        <View className='picture-wrap'>
          {
            (dog.pictures || []).map((doc) => {
              return (<Image src={doc.url || doc} className='detail-img' key={doc.url || doc}></Image>)
            })
          }
        </View>

        <View className='related-wrap'>
          <View className='related-title'>相关推荐</View>
          <View className='related-list'>
            {related.map( item => {
              return (<View key={item.name} className='item'>
                <Image src={item.url} className='img' mode='widthFix'></Image>
                <View>{item.name}</View>
              </View>)
            })}
          </View>
        </View> 

        <View className='oper-wrap'>
          <View className='collection'>
            <Image src='https://6465-dev-showdog-1258380429.tcb.qcloud.la/images/collect.png?sign=b577233afd8c34b6a9fb87f7e090b4c7&t=1548666291'></Image>
            收藏
          </View>
          <View className='share'>
            <Image src='https://6465-dev-showdog-1258380429.tcb.qcloud.la/images/share.png?sign=b6f7a18116720bd88e38a494e4c1f57c&t=1548666401'></Image>
            分享
          </View>
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

