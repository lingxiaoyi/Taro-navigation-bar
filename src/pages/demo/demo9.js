import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import NavBar from '@components/navbar_lxy';
import withComponent from './mixin';
import './index.scss';

@withComponent
export default class Index extends Component {
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  };

  state = {};
  handlerGobackClick() {
    const pages = Taro.getCurrentPages();
    if (pages.length >= 2) {
      Taro.navigateBack({
        delta: 1
      });
    } else {
      Taro.navigateTo({
        url: '/pages/index/index'
      });
    }
  }
  render() {
    return (
      <View className='main-wraper'>
        <View className='nav'>
          <NavBar
            title='自定义样式'
            background='rgba(0,0,0,0)'
            color='#fff'
            iconTheme='white'
            back
            home
            onBack={this.handlerGobackClick}
            onHome={this.handlerGohomeClick}
            extClass='lxy-navbar-extclass'
          />
        </View>
        <View className='main22'>
          <View className='img'>此处为图片背景</View>
          <View className='btn'>按钮</View>
        </View>
      </View>
    );
  }
}
