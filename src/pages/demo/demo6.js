import Taro, { Component } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
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
          background='#000000'
          color='#fff'
          iconTheme='white'
          onBack={this.handlerGobackClick}
          onHome={this.handlerGohomeClick}
          renderLeft={
            <View class='location'>
              <View class='con'>上海</View>
              <View class='icon' />
            </View>
          }
          renderCenter={
            <View className='lxy-nav-bar-search' style='height:{{capsulePosition.height}}px;' bindtap='search'>
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
          }
        />
        <View className='main'>
          <View
            className='p active'
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/index/index'
              });
            }}
          >
            点击跳转自定义左侧栏目带自定义搜索框
          </View>
        </View>
      </View>
    );
  }
}
