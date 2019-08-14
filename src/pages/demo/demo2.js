import Taro, { Component } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import NavBar from '@components/navbar_lxy/navBar';
import withComponent from './mixin';
import './demo.scss';

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
