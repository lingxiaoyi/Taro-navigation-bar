import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames'
import './index.scss'
import {
    Back_black,
    Back_white,
} from './icon/index'

export default class Index extends Component {

    constructor(props) {
        super(props)
        this.handlergotop = this.handlergotop.bind(this);
        if(this.props.colorTheme === 'black'){
            this.setState({
                goBackImage: Back_black
            })
        }else{
            this.setState({
                goBackImage: Back_white
            })
        }
   
    }

    config = {
        navigationBarTitleText: '',
    }

   static defaultProps= {
    background:  '#ffffff', //导航栏背景
    fixedtop: true, // 是否固定在顶部
    toBack: true, // 是否自动返回上一页
    showBack: true, // 是否显示返回按钮
    title: '标题',
    protectInaver: true,
    protectCapsule: true,
    colorTheme: 'black',
    opacity: 1,
   }

    state = {
        statusbarh: 20,
        startpage: '/pages/flash/index',
        goBackImage:Back_black,

        isIOS: true,
    }

    setGoBackImage(){
       
    }

    componentWillMount() {
        Taro.getSystemInfo({
            success: (res) => {
              let system = res.system.toLowerCase();
              let isIOS = system.indexOf('ios') >= 0 ;
              this.setState({
                statusbarh: res.statusBarHeight,
                isIOS
              })
            }
          })
    }

    componentWillReceiveProps(newProps) {
    }

    componentDidMount() { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }

    handlergotop() {
        Taro.pageScrollTo({
            scrollTop: 0
        })
    }


    handlergoback(e) {

        // 点击之后是否返回 如果是否 则由父组件自己处理返回事件
        if (this.props.toBack) {
            // eslint-disable-next-line no-undef
            let pages = getCurrentPages();
            if (pages.length === 1) {
                Taro.redirectTo({
                    url: this.state.startpage
                });
            }else{
                Taro.navigateBack({
                    delta: 1
                });
            }
        } else {
            if (this.props.onGoBackClick) {
                this.props.onGoBackClick(e)
            }
        }

    }




    render() {
        const appInaverStyle = {
            'background-color': this.props.background,
            'height': (this.state.statusbarh + 50) + 'Px',
            'padding-top': this.state.statusbarh + 'Px',
            'opacity': this.props.opacity
        }
        const appInaverClass = classNames('app-inaver', { 'inaverfixed': this.props.fixedtop })

        return (
            <View>
                <View onlongpress={this.handlergotop} style={appInaverStyle} className={appInaverClass}>
                    <View className='left' onClick={this.handlergoback.bind(this)}>
                        {
                            this.props.showBack && <Image class='image' mode='aspectFit' src={this.state.goBackImage}></Image>
                        }
                    </View>
                    <View style={`color:${this.props.colorTheme}`} className={classNames('center', { 'ioscenter': this.state.isIOS })}>
                       {this.props.title}
                    </View >
                    {
                        this.props.protectCapsule && <View className='right'></View>
                    }
                </View >
                {
                    (this.props.protectInaver && this.props.fixedtop) && <View style='height: {{statusbarh+50}}px' class='protect-inaver'></View>
                }

            </View >
        );
    }
}