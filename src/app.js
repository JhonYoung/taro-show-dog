import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from './redux/store'
import Index from './pages/index'
import './app.scss'
import { Users } from './lib/db';

const store = configStore();
class App extends Component {
  config = {
    pages: [
      'pages/home/index',
      'pages/register/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    wx.cloud.init({
      traceUser: true,
      env: 'dev-showdog',
    });
    // const usersDb = wx.cloud.database().collection('users');
    // const res = usersDb.where({openid: '123'}).get();
    this.getCurrentUser();
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  getCurrentUser () {
    console.log(Users);
    Users.where({
      openid: '123'
    }).get().then(res => {
      console.log(res);
    })
  }
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