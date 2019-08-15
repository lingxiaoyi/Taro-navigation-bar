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
        <NavBar
          title='有返回和home'
          background='#fff'
          back
          home
          searchBar={false}
          onBack={this.handlerGobackClick}
          onHome={this.handlerGohomeClick}
        />
        <View className='main'>
          <View className='p'>有返回和home的页面</View>
        </View>
      </View>
    );
  }
}
