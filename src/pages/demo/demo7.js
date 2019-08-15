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
          title='深色背景'
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
        />
        <View className='main' style='height:500px;'>
          <View
            className='p active'
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/index/index'
              });
            }}
          >
            深色背景详情页
          </View>
        </View>
      </View>
    );
  }
}
