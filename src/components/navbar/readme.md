## taro组件 -- 自定义导航栏
- 支持自定义返回事件
- 兼容手机异形屏
- 支持滚动渐隐

## 使用方式
```
npm i taro-navbar --save
```

``` javascript
import NavBar from 'taro-navbar';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import NavBar from 'taro-navbar';
import './index.scss'




export default class Index extends Component {

    config = {
        navigationBarTitleText: '',
        navigationStyle: 'custom'
    }

    state = {
       
    }

    componentWillMount() { }
    componentDidMount() { }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }
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
    render() {
        return (
            <View>
                <NavBar title='默认置顶导航' protectInaver onGoBackClick={this.handlerGobackClick.bind(this)} toBack={false} ></NavBar>
                <View className='ex-value'>
                    {` <NavBar title='默认置顶导航' protectInaver onGoBackClick={this.handlerGobackClick.bind(this)} toBack={false} ></NavBar>`}
                </View>
                <View className='content'>
                    <Text>
                        可能我们会需要使用沉浸式设计的时候使用到 "navigationStyle": "custom" 属性
                        这个时候小程序提供的标题栏就会失效，
                        这时候自己去定义一个标题栏就很重要的
                        该自定义组件提供和微信相同样式的标题栏
                        并且这里对返回按钮的点击事件除了可以使用默认的返回按钮之外 还提供了返回事件 自己处理返回跳转的页面
                    </Text>
                </View>
                <NavBar title='不显示返回按钮' showBack={false} fixedtop={false} ></NavBar>
                <View className='ex-value'>
                        {`<NavBar title='不显示返回按钮' showBack={false} fixedtop={false} ></NavBar>`}
                </View>
                <NavBar title='白色主题标题栏' colorTheme='black' background='#ffffff' fixedtop={false} ></NavBar>
                <View className='ex-value'>
                      {` <NavBar title='白色主题标题栏' colorTheme='black' background='#ffffff' fixedtop={false} ></NavBar>`}
                </View> 
                <NavBar title='黑色主题标题栏' colorTheme='white' background='#000' fixedtop={false} ></NavBar>
                <View className='ex-value'>
                    {`
                            <NavBar title='黑色主题标题栏' colorTheme='white' background='#000' fixedtop={false} ></NavBar>
                    `}
                </View> 

            </View>
        );
    }
}
```

## 实际使用例子
https://github.com/moyuanhua/taro-navbar