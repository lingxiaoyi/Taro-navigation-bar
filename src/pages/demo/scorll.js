import Taro , { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import NavBar from 'taro-navbar';


import longimg from './timg.jpg'

export default class Index extends Component {

   config = {
       navigationBarTitleText: '',
       navigationStyle: 'custom'

  }

  state={
    opacity:1
  }

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  handlerGobackClick(e) {
    Taro.showModal({
        title: '你点击了返回',
        content: '是否确认放回',
        success: (e) => {
            if (e.confirm) {
                Taro.navigateBack({
                    delta: 1
                });
            }
        }
    })
}
onPageScroll(e){
    // console.log(e);
    if(e.scrollTop < 400){
        let opacity =(100 - (e.scrollTop/4))/100;
        this.setState({
            opacity: opacity
        })
    }else{
        if(this.state.navbaroption !== 0){
            this.setState({
                opacity: 0
            })
        }
    }
}
  render() {
    return (
      <View>
            <NavBar opacity={this.state.opacity} title='默认置顶导航' protectInaver onGoBackClick={this.handlerGobackClick.bind(this)} toBack={false} ></NavBar>
          <Image src={longimg} style='width:750px;' mode='widthFix'></Image>
      </View>
    );
  }
}
