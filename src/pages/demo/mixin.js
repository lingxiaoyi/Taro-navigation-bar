import _isFunction from 'lodash/isFunction';
import Taro from '@tarojs/taro';

export default function withComponent(Component) {
  class WithLogin extends Component {
    constructor(props) {
      super(props);
    }
    handlerGobackClick() {
      if (_isFunction(super.handlerGobackClick)) {
        super.handlerGobackClick();
      } else {
        Taro.showModal({
          title: '你点击了返回',
          content: '是否确认放回',
          success: e => {
            if (e.confirm) {
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
          }
        });
      }
    }
    handlerGohomeClick() {
      Taro.navigateTo({
        url: '/pages/index/index'
      });
    }
  }
  return WithLogin;
}
