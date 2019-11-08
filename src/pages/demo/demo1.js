import Taro, { Component } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
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

  render() {
    return (
      <View className='main-wraper'>
        <NavBar
          title=''
          background='#fff'
          back
          home
          onBack={this.handlerGobackClick}
          onHome={this.handlerGohomeClick}
          renderCenter={
            <View className='lxy-nav-bar-search'>
              <View className='lxy-nav-bar-search__icon' />
              <View className='lxy-nav-bar-search__input'>
                <Input
                  autoFocus
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
            </View>
          }
        />
        <View className='main' style='height:500px;'>
          <View className='p'>搜索页面</View>
        </View>
      </View>
    );
  }
}
