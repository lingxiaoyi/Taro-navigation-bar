import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View } from "@tarojs/components";
import styles from "./index.scss";

const _isFunction = (func) => {
  if (func && typeof func === "function") return true;
  return false;
};

function getSystemInfo() {
  if (Taro.globalSystemInfo && !Taro.globalSystemInfo.ios) {
    return Taro.globalSystemInfo;
  }
  // h5环境下忽略navbar
  if (!_isFunction(Taro.getSystemInfoSync)) {
    return null;
  }
  const systemInfo = Taro.getSystemInfoSync() || {
    model: "",
    system: "",
  };
  const ios = !!(systemInfo.system.toLowerCase().search("ios") + 1);
  let rect;
  try {
    rect = Taro.getMenuButtonBoundingClientRect
      ? Taro.getMenuButtonBoundingClientRect()
      : null;
    if (rect === null) {
      throw new Error("getMenuButtonBoundingClientRect error");
    }
    // 取值为0的情况  有可能width不为0 top为0的情况
    if (!rect.width || !rect.top || !rect.left || !rect.height) {
      throw new Error("getMenuButtonBoundingClientRect error");
    }
  } catch (error) {
    let gap = ""; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度
    if (systemInfo.platform === "android") {
      gap = 8;
      width = 96;
    } else if (systemInfo.platform === "devtools") {
      if (ios) {
        gap = 5.5; // 开发工具中ios手机
      } else {
        gap = 7.5; // 开发工具中android和其他手机
      }
    } else {
      gap = 4;
      width = 88;
    }
    if (!systemInfo.statusBarHeight) {
      // 开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight =
        systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }
    rect = {
      // 获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width,
    };
    // eslint-disable-next-line no-console
    console.log("error", error);
    // eslint-disable-next-line no-console
    console.log("rect", rect);
  }

  let navBarHeight = "";
  if (!systemInfo.statusBarHeight) {
    // 开启wifi和打电话下
    systemInfo.statusBarHeight =
      systemInfo.screenHeight - systemInfo.windowHeight - 20;
    navBarHeight = (function () {
      const gap = rect.top - systemInfo.statusBarHeight;
      return 2 * gap + rect.height;
    })();

    systemInfo.statusBarHeight = 0;
    systemInfo.navBarExtendHeight = 0; // 下方扩展4像素高度 防止下方边距太小
  } else {
    navBarHeight = (function () {
      const gap = rect.top - systemInfo.statusBarHeight;
      return systemInfo.statusBarHeight + 2 * gap + rect.height;
    })();
    if (ios) {
      systemInfo.navBarExtendHeight = 4; // 下方扩展4像素高度 防止下方边距太小
    } else {
      systemInfo.navBarExtendHeight = 0;
    }
  }

  systemInfo.navBarHeight = navBarHeight; // 导航栏高度不包括statusBarHeight
  systemInfo.capsulePosition = rect; // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
  systemInfo.ios = ios; // 是否ios
  Taro.globalSystemInfo = systemInfo; // 将信息保存到全局变量中,后边再用就不用重新异步获取了
  // console.log('systemInfo', systemInfo);
  return systemInfo;
}
let globalSystemInfo = getSystemInfo();
class AtComponent extends Component {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    extClass: "",
    background: "rgba(255,255,255,1)", // 导航栏背景
    color: "#000000",
    title: "",
    searchText: "点我搜索",
    searchBar: false,
    back: false,
    home: false,
    iconTheme: "black",
    delta: 1,
  };
  constructor(props) {
    super(props);
    this.state = {
      configStyle: this.setStyle(globalSystemInfo),
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleGoHomeClick = this.handleGoHomeClick.bind(this);
  }

  setStyle(systemInfo) {
    const {
      statusBarHeight,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      windowWidth,
    } = systemInfo;
    const { back, home, title, color } = this.props;
    const rightDistance = windowWidth - capsulePosition.right; // 胶囊按钮右侧到屏幕右侧的边距
    const leftWidth = windowWidth - capsulePosition.left; // 胶囊按钮左侧到屏幕右侧的边距

    const navigationbarinnerStyle = [
      `color:${color}`,
      // `background:${background}`,
      `height:${navBarHeight + navBarExtendHeight}px`,
      `padding-top:${statusBarHeight}px`,
      `padding-right:${leftWidth}px`,
      `padding-bottom:${navBarExtendHeight}px`,
    ].join(";");
    let navBarLeft = [];
    if ((back && !home) || (!back && home)) {
      navBarLeft = [
        `width:${capsulePosition.width}px`,
        `height:${capsulePosition.height}px`,
        `margin-left:0px`,
        `margin-right:${rightDistance}px`,
      ].join(";");
    } else if ((back && home) || title) {
      navBarLeft = [
        `width:${capsulePosition.width}px`,
        `height:${capsulePosition.height}px`,
        `margin-left:${rightDistance}px`,
      ].join(";");
    } else {
      navBarLeft = [`width:auto`, `margin-left:0px`].join(";");
    }
    return {
      navigationbarinnerStyle,
      navBarLeft,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      rightDistance,
    };
  }
  componentDidShow() {
    if (globalSystemInfo.ios) {
      globalSystemInfo = getSystemInfo();
      this.setState({
        configStyle: this.setStyle(globalSystemInfo),
      });
    }
  }
  handleBackClick() {
    if (_isFunction(this.props.onBack)) {
      this.props.onBack();
    } else {
      const pages = Taro.getCurrentPages();
      if (pages.length >= 2) {
        Taro.navigateBack({
          delta: this.props.delta,
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

  static options = {
    multipleSlots: true,
    addGlobalClass: true,
  };

  render() {
    const {
      navigationbarinnerStyle,
      navBarLeft,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      rightDistance,
    } = this.state.configStyle;
    const {
      title,
      background,
      backgroundColorTop,
      back,
      home,
      searchBar,
      searchText,
      iconTheme,
      extClass,
    } = this.props;
    let navBarCenter = null;
    if (title) {
      navBarCenter = <text>{title}</text>;
    } else if (searchBar) {
      navBarCenter = (
        <View
          className="lxy-nav-bar-search"
          style={`height:${capsulePosition.height}px;`}
          onClick={this.handleSearchClick}
        >
          <View className="lxy-nav-bar-search__icon" />
          <View className="lxy-nav-bar-search__input">{searchText}</View>
        </View>
      );
    } else {
      /* eslint-disable */
      navBarCenter = this.props.renderCenter;
      /* eslint-enable */
    }
    return (
      <View
        className={`lxy-nav-bar ${ios ? "ios" : "android"} ${extClass}`}
        style={`background: ${backgroundColorTop || background};height:${
          navBarHeight + navBarExtendHeight
        }px;`}
      >
        <View
          className={`lxy-nav-bar__placeholder ${ios ? "ios" : "android"}`}
          style={`padding-top: ${navBarHeight + navBarExtendHeight}px;`}
        />
        <View
          className={`lxy-nav-bar__inner ${ios ? "ios" : "android"}`}
          style={`background:${background};${navigationbarinnerStyle};`}
        >
          <View className="lxy-nav-bar__left" style={navBarLeft}>
            {back && !home && (
              <View
                onClick={this.handleBackClick}
                className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
              />
            )}
            {!back && home && (
              <View
                onClick={this.handleGoHomeClick}
                className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}`}
              />
            )}
            {back && home && (
              <View
                className={`lxy-nav-bar__buttons ${ios ? "ios" : "android"}`}
              >
                <View
                  onClick={this.handleBackClick}
                  className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
                />
                <View
                  onClick={this.handleGoHomeClick}
                  className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}}`}
                />
              </View>
            )}
            {!back && !home && this.props.renderLeft}
          </View>
          <View
            className="lxy-nav-bar__center"
            style={`padding-left: ${rightDistance}px`}
          >
            {navBarCenter}
          </View>
          <View
            className="lxy-nav-bar__right"
            style={`margin-right: ${rightDistance}px`}
          >
            {this.props.renderRight}
          </View>
        </View>
      </View>
    );
  }
}

export default AtComponent;
