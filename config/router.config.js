export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // TabBar
  {
    path: '/tabbar',
    component: '../layouts/TabBarLayout',
    routes: [
      { path: '/tabbar', redirect: '/tabbar/index' },
      {
        path: '/tabbar/index',
        title: 'index',
        component: '/tabbar/index',
        iconName: 'alipay',
      },
      {
        path: '/tabbar/koubei',
        title: 'Koubei',
        component: '/tabbar/Koubei',
        iconName: 'koubei',
      },
      {
        path: '/tabbar/friend',
        title: 'Friend',
        component: '/tabbar/Koubei',
        iconName: 'friend',
      },
      {
        path: '/tabbar/my',
        title: 'My',
        component: '/tabbar/Koubei',
        iconName: 'my',
      },
      {
        path: '/tabbar/my1',
        title: 'My1',
        component: '/tabbar/Koubei',
        iconName: 'my',
      },
      {
        path: '/tabbar/my2',
        title: 'My2',
        component: '/tabbar/Koubei',
        iconName: 'my',
      },
    ],
  },
  // H5
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './home/index', title: '首页' },
      { path: '/entrance', component: './entrance/index', title: '主入口' },
      { path: '/paper/:type', component: './paper/index', title: '试题页面' },
      { path: '/result', component: './result/index', title: '结果页' },
      {
        title: 'exception',
        path: '/exception',
        routes: [
          // Exception
          {
            path: '/exception/403',
            title: 'not-permission',
            component: './exception/403',
          },
          {
            path: '/exception/404',
            title: 'not-find',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            title: 'server-error',
            component: './exception/500',
          },
        ],
      },
      { component: '404' },
    ],
  },
];
