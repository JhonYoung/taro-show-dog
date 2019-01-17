import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from './redux/store'
import Index from './pages/index'
import action from './redux/action';
import './app.scss'

wx.cloud.init();
const store = configStore();
class App extends Component {
  config = {
    pages: [
      'pages/home/index',
      'pages/register/index',
      'pages/detail/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    wx.cloud.callFunction({
      name: 'login',
    }).then((res) => {
      if (res.result.data && res.result.data.mobile) {
        store.dispatch(action.setProfile(res.result.data));
      } else {
        Taro.redirectTo({
          url: `/pages/register/index`
        })
      }
      
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))