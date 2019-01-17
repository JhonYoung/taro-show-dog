import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';

import Swipers from '../../component/swiper/index'
import SearchBar from '../../component/searchBar/index'
import BoxLoading from '../../component/boxLoading/index'
import PageLoading from '../../component/pageLoading/index'
import './index.scss'
// import {list1, list2} from './data.js'
const list1 = [
  {
    id: 1,
    name: '张三',
    feature: '我是特点，我是特点，我是特点我是特点，我是特点，我是特点我是特点，我是特点，我是特点，',
    mainUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3414640088,2128364203&fm=58&bpow=1920&bpoh=1200',
    tags: ['good', 'beautiful', 'wanted'],
    shape: '1'
  },
  {
    id: 2,
    name: '哈士奇',
    feature: '我是特点，我是特点，我是特点我是特点，我是特点，我是特点我是特点，我是特点，我是特点，',
    mainUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3414640088,2128364203&fm=58&bpow=1920&bpoh=1200',
    tags: ['good', 'beautiful', 'wanted'],
    shape: '2'
  },
  {
    id: 3,
    name: '泰迪',
    feature: '我是特点，我是特点，我是特点我是特点，我是特点，我是特点我是特点，我是特点，我是特点，',
    mainUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3414640088,2128364203&fm=58&bpow=1920&bpoh=1200',
    tags: ['good', 'beautiful'],
    shape: '2'
  },
  {
    id: 4,
    name: '萨摩耶',
    feature: '我是特点，我是特点，我是特点我是特点，我是特点，我是特点我是特点，我是特点，我是特点，',
    mainUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3414640088,2128364203&fm=58&bpow=1920&bpoh=1200',
    tags: ['good'],
    shape: '2'
  }
];
const list2 = [];
class Index extends Component {
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

  goTo () {
    Taro.navigateTo({
      url: `/pages/register/index`
    })
  }

  clickBanner (item, e) {
    console.log(item)
    console.log(e)
  }

  searchClick () {}

  goToDetail (e) {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${JSON.parse(e.currentTarget.dataset.info).id}`
    })
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
    const {profileReady, profile} = this.props;
    if (!profileReady ||  !profile) {
      return (<PageLoading />)
    }
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
              <View key={doc.id} className={`item item-${index%4}`} onClick={this.goToDetail} data-info={JSON.stringify(doc)}>
                <View className='item-img'>
                  <Image src={doc.mainUrl} className='img' mode='aspectFill' />
                </View>

                <View className='item-content'>
                <View className='line'></View>
                  <View className='name'>{doc.name} <Text>{doc.shape}</Text></View>
                  <View className='feature'>{doc.feature}</View>
                  <View className='tips'>
                    {
                      doc.tags.map((tip) => {
                        return (<View key={tip}>{tip}</View>);
                      })
                    }
                  </View>
                </View>
              </View>
            )
          })
        }
        {this.state.loading ? <View className='loading'><BoxLoading /> </View>: null}
        <Button onClick={this.goTo}>go register </Button>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.userInfo.profile,
    profileReady: state.userInfo.profileReady
  }
}

export default connect(
  mapStateToProps
)(Index)

