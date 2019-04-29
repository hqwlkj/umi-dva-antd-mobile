// https://umijs.org/config/
import pageRoutes from './router.config';
import theme from '../src/theme';
import webpackPlugin from './plugin.config';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
      },
      pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          importWorkboxFrom: 'local',
        },
      },
      title: {
        defaultTitle: 'umi-dva-antd-mobile',
      },
      dll: false,
      hd: false,
      fastClick: true,
      routes: {
        exclude: [],
      },
      hardSource: false,
    },
  ],
];
export default {
  // add for transfer to umi
  base: '',
  publicPath: '',
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  history: 'hash', // 默认是 browser
  plugins,
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://mobile.ant.design/docs/react/customize-theme-cn
  theme: {
    'brand-primary': theme.primaryColor,
    'brand-primary-tap': theme.brandPrimaryTap,
  },
  externals: {},
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
  outputPath: './dist',
  hash: true,
  alias: {},
  proxy: {
    '/server/api/': {
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
      target: 'https://preview.pro.ant.design/',
    },
    '/wx/api/': {
      changeOrigin: true,
      pathRewrite: { '^/wx/api': '' },
      target: 'https://games.parsec.com.cn/',
    },
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
};
