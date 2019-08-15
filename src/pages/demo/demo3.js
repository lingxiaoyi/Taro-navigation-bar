import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import NavBar from 'taro-navigationbar';
import withComponent from './mixin';
import './index.scss';

@withComponent
export default class Index extends Component {
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  };

  state = {};
  render() {
    return (
      <View className='main-wraper'>
        <NavBar
          title='详情页'
          background='#fff'
          back
          onBack={this.handlerGobackClick}
        />
        <View className='main'>
          <View className='p'>详情页</View>
        </View>
      </View>
    );
  }
}
