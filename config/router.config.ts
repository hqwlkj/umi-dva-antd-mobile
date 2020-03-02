export default [
  {
    path: '/',
    component: '../layouts/index',
    // Routes: ['src/pages/Authorized'],
    // authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './index', title: '首页' },
      { path: '/me', component: './me', title: '个人中心' },
      { path: '/404', component: '404' },
    ],
  },
];
