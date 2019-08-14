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
          title='深色背景详情页有home'
          background='#000000'
          color='#fff'
          iconTheme='white'
          back
          home
          onBack='handlerGobackClick'
          onHome='handlerGohomeClick'
          renderLeft={
            <View class='location' slot='left'>
              <View class='con'>上海</View>
              <View class='icon' />
            </View>
          }
        >
          <View
            slot='center'
            className='lxy-nav-bar-search'
            style='height:{{capsulePosition.height}}px;'
            bindtap='search'
          >
            <View class='icon-search' />
            <Input
              autoFocus='true'
              bindconfirm='confirmSearch'
              bindinput='search'
              className='srch-ipt'
              confirmType='search'
              placeholder='搜索内容'
              placeholderclassName='ipt-placeholder'
              type='text'
              value=''
            />
          </View>
        </NavBar>
        <View className='main'>
          <View className='p'>深色背景详情页</View>
        </View>
      </View>
    );
  }
}
