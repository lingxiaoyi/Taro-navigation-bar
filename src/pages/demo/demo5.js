import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import NavBar from '@components/navbar_lxy';
import withComponent from './mixin';
import './index.scss';

@withComponent
export default class Index extends Component {
  config = {
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
    backgroundColor: '#f8f8f8',
    backgroundColorTop: '#00000',
    backgroundColorBottom: '#f8f8f8'
  };

  state = {};
  render() {
    return (
      <View className='main-wraper'>
        <NavBar
          title='深色背景详情页'
          background='#000000'
          color='#fff'
          iconTheme='white'
          back
          home
          onBack={this.handlerGobackClick}
          onHome={this.handlerGohomeClick}
        />
        <View className='main'>
          <View className='p'>深色背景详情页包括返回和home按钮</View>
        </View>
      </View>
    );
  }
}
