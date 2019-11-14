import Taro, { Component } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import { throttle } from 'lodash';
import NavBar from '@components/navbar_lxy';
import withComponent from './mixin';
import './index.scss';

@withComponent
export default class Index extends Component {
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  };

  state = { background: 'rgba(255,255,255,1)' };
  componentWillMount() {
    this.fngradient = throttle(e => {
      let opciaty = e.scrollTop / 130;
      if (opciaty >= 1) {
        opciaty = 1;
      } else if (opciaty <= 0) {
        opciaty = 0;
      }
      console.log('opciaty', opciaty);
      this.setState({ background: `rgba(255,0,0,${opciaty})` });
    }, 22);
  }
  componentDidMount() {
    //页面里获取导航栏组件的高度
    console.log(
      'this.ref',
      this.ref,
      this.ref.state.configStyle.navBarHeight , this.ref.state.configStyle.navBarExtendHeight
    );
  }
  onPageScroll(e) {
    /* let opciaty = e.scrollTop / 1500;
    this.setState({ background: `rgba(255,0,0,${opciaty})` }); */
    this.fngradient(e); //节流一下
  }
  render() {
    return (
      <View className='main-wraper'>
        <NavBar
          title=''
          background={this.state.background}
          backgroundColorTop='rgba(0,0,0,0)'
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
          ref={ref => {
            this.ref = ref;
          }}
        />
        <View
          className='main'
          style='height:5001px;'
          onClick={() => {
            this.setState({ background: `rgba(255,0,0)` });
          }}
        >
          <View className='p'>搜索页面</View>
        </View>
      </View>
    );
  }
}
