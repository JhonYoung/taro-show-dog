import Taro, { Component } from '@tarojs/taro'
import { View, Input, Icon } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

export default class SearchBar extends Component {
  constructor () {
    super()
    this.state = {
      value: '',
      clear: false
    }
  }

  reset () {
    this.setState({value: '',  clear: false})
    this.props.onConfirm('')
  }

  setValue (e) {
    this.setState({value: e.target.value, clear: false})
  }

  confirm () {
    if (!this.state.value) {
      return
    }
    this.setState({clear: true})
    this.props.onConfirm(this.state.value)
  }
  
  render () {
    const {placeholder} = this.props;
    return (
      <View className='search-bar'>
        {this.state.clear ? 
          <Icon size='20' type='clear' color='red' className='search-icon' onClick={this.reset} /> : 
          <Icon size='20' type='search' className='search-icon' onClick={this.confirm} />
        }
        <Input 
          type='text' 
          className='search-input' 
          placeholder={placeholder || '输入内容，点击图标搜索'}
          confirmType='搜索' 
          value={this.state.value}
          onInput={this.setValue}
          onConfirm={this.confirm}
        />
        </View>
    )
  }
}

SearchBar.propTypes = {
  onConfirm: PropTypes.func,
  placeholder: PropTypes.string
}

SearchBar.defaultProps = {
  onConfirm: () => {},
  placeholder: ''
}