export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './home/index', title: '首页' },
      {
        name: 'exception',
        path: '/exception',
        routes: [
          // Exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './exception/403',
          },
          {
            path: '/Exception/404',
            name: 'not-find',
            component: './exception/404',
          },
          {
            path: '/Exception/500',
            name: 'server-error',
            component: './exception/500',
          },
        ],
      },
      { component: '404' },
    ],
  },
];
