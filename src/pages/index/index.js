import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Navigator } from '@tarojs/components';
//import NavBar from '@components/navbar/index';
import NavBar from '@components/navbar_lxy';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='main-wrapper'>
        <NavBar
          background='#fff'
          searchBar
          back={false}
          onSearch={() => {
            Taro.navigateTo({
              url: '/pages/demo/demo1'
            });
          }}
        />
        <View className='main'>
          <Navigator url='/pages/demo/demo1'>
            <View className='p active'>例子1: 点击跳转搜索页</View>
          </Navigator>
          <Navigator url='/pages/demo/demo2'>
            <View className='p active'>例子2: 点击跳转左侧有返回 home的详情页面</View>
          </Navigator>
          <Navigator url='/pages/demo/demo3'>
            <View className='p active'>例子3: 点击跳转详情页</View>
          </Navigator>
          <Navigator url='/pages/demo/demo4'>
            <View className='p active'>例子4: 点击跳转详情页,深背景色,白色主题</View>
          </Navigator>
          <Navigator url='/pages/demo/demo5'>
            <View className='p active'>例子5: 点击跳转,深背景色,白色主题有home</View>
          </Navigator>
          <Navigator url='/pages/demo/demo6'>
            <View className='p active'>例子6: 点击跳转自定义左侧栏目带自定义搜索框</View>
          </Navigator>
          <Navigator url='/pages/demo/demo7'>
            <View className='p active'>例子7: 点击跳转自定义左侧栏目带标题</View>
          </Navigator>
        </View>
      </View>
    );
  }
}
