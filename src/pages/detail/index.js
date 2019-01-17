import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import { View, Input, Image, Text, Button } from '@tarojs/components'

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
    return (
      <View className='index'>
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

