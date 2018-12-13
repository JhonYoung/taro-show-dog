import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import Swipers from '../../component/swiper/index'
import SearchBar from '../../component/searchBar/index'
import BoxLoading from '../../component/boxLoading/index'
import './index.scss'
import {list1, list2} from './data.js'

export default class Index extends Component {
  constructor () {
    // default
    super()
    this.state = {
      lists: []
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      lists: list1,
      loading: false
    })
   }

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

  searchClick (value) {
    console.log('searchClick===>', value)
  }

  getList () {
    this.setState({loading: true})
    if (this.state.lists.length > 10 || this.state.loading) {
      return;
    }
    setTimeout(() => {
      this.setState({lists: this.state.lists.concat(list2), loading: false})
    }, 2000)
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
      <ScrollView 
        className='home-list'
        scrollY
        lowerThreshold='50'
        enableBackToTop
        onScrollToLower={this.getList}
      >
        <Swipers images={images} onClickFn={this.clickBanner} />
        <View className='search-bar-wrap'><SearchBar onConfirm={this.searchClick}  /></View>
        {
          this.state.lists.map((doc, index) => {
            return (
              <View key={index} className={`item item-${index%2}`} >
                <View className='item-content'>
                  <View>{doc.title}</View>
                  <View>{doc.desc}</View>
                </View>
                <View className='item-img-wrap'>
                  <Image src={doc.img} className='img' mode='aspectFill' />
                </View>
              </View>
            )
          })
        }
        {this.state.loading ? <View className='loading'><BoxLoading /> </View>: null}
      </ScrollView>
    )
  }
}

