# 小程序组件 navigation-bar

小程序自定义导航栏适配 完美解决内容上下不居中 左右不居中 高度不合适的问题

## Navigation

Navigation 是小程序的顶部导航组件，当页面配置 navigationStyle 设置为 custom 的时候可以使用此组件替代原生导航栏

## 安装

- 进入目录安装依赖，国内用户推荐使用 cnpm 进行加速

```bash
npm install taro-navigationbar --save
```

## 使用

在代码中 import 需要的组件并按照文档说明使用

```bash
import NavBar from 'taro-navigationbar';
```

## 示例代码

```bash
<!--WXML示例代码-->
<NavBar
          title='有返回和home'
          background='#fff'
          back
          home
          onBack={this.handlerGobackClick}
          onHome={this.handlerGohomeClick}
        />
```

更多使用方式请移步[仓库地址](https://github.com/lingxiaoyi/Taro-navigation-bar)内附使用方式和demo.

## 属性列表

| 属性       | 类型         | 默认值   | 必填 | 说明                                                                                            |
| ---------- | ------------ | -------- | ---- | ----------------------------------------------------------------------------------------------- |
| ext-class  | string       |          | 否   | 添加在组件内部结构的 class，可用于修改组件内部的样式                                            |
| title      | string       |          | 否   | 导航标题，如果不提供，则名为 renderCenter 的 slot 有效                                          |
| background | string       | #ffffff  | 否   | 导航背景色                                                                                      |
| color      | string       | #000000  | 否   | 导航字体颜色                                                                                    |
| iconTheme  | string       | black    | 否   | 主题图标和字体颜色,当背景色为深色时,可以设置'white'                                             |
| back       | boolean      | false    | 否   | 是否显示返回按钮，默认点击按钮会执行 navigateBack，如果为 false，则名为 renderLeft 的 slot 有效 |
| home       | boolean      | false    | 否   | 是否显示 home 按钮，执行方法自定义,或者看例子                                                   |
| searchBar  | boolean      | false    | 否   | 是否显示搜索框，默认点击按钮会执行 onSearch，如果为 false，则名为 renderCenter 的 slot 有效     |
| searchText | string       | 点我搜索 | 否   | 搜索框文字                                                                                      |
| onHome     | eventhandler |          | 否   | 在 home 为 true 时，点击 home 按钮触发此事件                                                    |
| onBack     | venthandler  |          | 否   | 在 back 为 true 时，点击 back 按钮触发此事件，detail 包含 delta                                 |
| onSearch   | eventhandler |          | 否   | 在 searchBar 为 true 时，点击 search 按钮触发此事件                                             |

## Slot

| 名称         | 描述                                                                  |
| ------------ | --------------------------------------------------------------------- |
| renderLeft   | 左侧 slot，在 back 按钮位置显示，当 back 为 false 的时候有效          |
| renderCenter | 标题 slot，在标题位置显示，当 searchBar 为 false title 为空的时候有效 |
| renderRight  | 在导航的右侧显示                                                      |

## 注意

更多注意情况请移步[仓库地址](https://github.com/lingxiaoyi/Taro-navigation-bar)内附一些其他的问题解决方案.
