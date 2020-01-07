export interface DefaultSettings {
  /**
   * primary color of ant design
   */
  primaryColor: string;
  title: string;
  pwa: boolean;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorWeak: boolean;
}

export default {
  primaryColor: '#1890FF',
  title: 'Ant Design Pro',
  pwa: true,
  iconfontUrl: '',
} as DefaultSettings;
