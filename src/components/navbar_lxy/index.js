import _isFunction from 'lodash/isFunction';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

class AtComponent extends Component {
  constructor(props) {
    super(props);
  }
  static options = {
    multipleSlots: true,
    addGlobalClass: true
  };
  handleBackClick() {
    if (_isFunction(this.props.onBack)) {
      this.props.onBack();
    } else {
      const pages = Taro.getCurrentPages();
      if (pages.length >= 2) {
        Taro.navigateBack({
          delta: this.props.delta
        });
      }
    }
  }
  handleGoHomeClick() {
    if (_isFunction(this.props.onHome)) {
      this.props.onHome();
    }
  }
  handleSearchClick() {
    if (_isFunction(this.props.onSearch)) {
      this.props.onSearch();
    }
  }
  static defaultProps = {
    extClass: '',
    background: '#ffffff', //导航栏背景
    color: '#000000',
    title: '',
    searchText: '点我搜索',
    searchBar: false,
    back: false,
    home: false,
    iconTheme: 'black',
    delta: 1
  };

  state = {};
  componentDidMount() {
    this.setStyle();
  }
  setStyle() {
    this.getSystemInfo().then(res => {
      const { statusBarHeight, navBarHeight, capsulePosition, navBarExtendHeight, ios, windowWidth } = res;
      const { back, home, title, color, background } = this.props;
      let rightDistance = windowWidth - capsulePosition.right; //胶囊按钮右侧到屏幕右侧的边距
      let leftWidth = windowWidth - capsulePosition.left; //胶囊按钮左侧到屏幕右侧的边距

      let navigationbarinnerStyle = [
        `color:${color}`,
        `background:${background}`,
        `height:${navBarHeight + navBarExtendHeight}px`,
        `padding-top:${statusBarHeight}px`,
        `padding-right:${leftWidth}px`,
        `padding-bottom:${navBarExtendHeight}px`
      ].join(';');
      let navBarLeft = [];
      if ((back && !home) || (!back && home)) {
        navBarLeft = [`width:${capsulePosition.width}px`, `height:${capsulePosition.height}px`].join(';');
      } else if ((back && home) || title) {
        navBarLeft = [
          `width:${capsulePosition.width}px`,
          `height:${capsulePosition.height}px`,
          `margin-left:${rightDistance}px`
        ].join(';');
      } else {
        navBarLeft = [`width:auto`, `margin-left:0px`].join(';');
      }
      this.setState({
        navigationbarinnerStyle,
        navBarLeft,
        navBarHeight,
        capsulePosition,
        navBarExtendHeight,
        ios
      });
    });
  }
  getSystemInfo() {
    return new Promise(resolve => {
      if (Taro.globalSystemInfo) {
        resolve(Taro.globalSystemInfo);
      } else {
        Taro.getSystemInfo({
          success: function success(systemInfo) {
            let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
            let rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
            Taro.getMenuButtonBoundingClientRect();
            let navBarHeight = (function() {
              let gap = ''; //胶囊按钮上下间距 使导航内容居中
              if (systemInfo.platform === 'android') {
                gap = 8;
              } else if (systemInfo.platform === 'devtools') {
                if (ios) {
                  gap = 5.5; //开发工具中ios手机
                } else {
                  gap = 7.5; //开发工具中android和其他手机
                }
              } else {
                gap = 4;
              }
              return systemInfo.statusBarHeight + 2 * gap + rect.height;
            })();
            systemInfo.navBarHeight = navBarHeight; //导航栏高度不包括statusBarHeight
            systemInfo.capsulePosition = rect; //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
            systemInfo.ios = ios; //是否ios
            systemInfo.navBarExtendHeight = 4; //下方扩展4像素高度 防止下方边距太小
            Taro.globalSystemInfo = systemInfo; //将信息保存到全局变量中,后边再用就不用重新异步获取了
            resolve(systemInfo);
          }
        });
      }
    });
  }

  render() {
    const { navigationbarinnerStyle, navBarLeft, navBarHeight, capsulePosition, navBarExtendHeight, ios } = this.state;
    const { title, background, back, home, searchBar, searchText, iconTheme } = this.props;
    let nav_bar__center = null;
    if (title) {
      nav_bar__center = <text>{title}</text>;
    } else if (searchBar) {
      nav_bar__center = (
        <View
          className='lxy-nav-bar-search'
          style={`height:${capsulePosition.height}px;`}
          onClick={this.handleSearchClick.bind(this)}
        >
          <View className='lxy-nav-bar-search__icon' />
          <View className='lxy-nav-bar-search__input'>{searchText}</View>
        </View>
      );
    } else {
      nav_bar__center = this.props.renderCenter;
    }
    return (
      <View className='lxy-nav-bar' style={`background: ${background};`}>
        <View
          className={`lxy-nav-bar__placeholder ${ios ? 'ios' : 'android'}`}
          style={`padding-top: ${navBarHeight + navBarExtendHeight}px;visibility: hidden;`}
        />
        <View className={`lxy-nav-bar__inner ${ios ? 'ios' : 'android'}`} style={navigationbarinnerStyle}>
          <View className='lxy-nav-bar__left' style={navBarLeft}>
            {back && !home && (
              <View
                onClick={this.handleBackClick.bind(this)}
                className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
              />
            )}
            {!back && home && (
              <View
                onClick={this.handleGoHomeClick.bind(this)}
                className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}`}
              />
            )}
            {back && home && (
              <View className={`lxy-nav-bar__buttons ${ios ? 'ios' : 'android'}`}>
                <View
                  onClick={this.handleBackClick.bind(this)}
                  className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
                />
                <View
                  onClick={this.handleGoHomeClick.bind(this)}
                  className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}}`}
                />
              </View>
            )}
            {!back && !home && this.props.renderLeft}
          </View>
          <View className='lxy-nav-bar__center'>{nav_bar__center}</View>
          <View className='lxy-nav-bar__right'>{this.props.renderRight}</View>
        </View>
      </View>
    );
  }
}

export default AtComponent;
