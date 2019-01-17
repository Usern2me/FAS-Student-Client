export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index/index', title: '考勤' },
      { path: '/category', component: './category/index', title: '课表' },
      { path: '/info', component: './info/index', title: '我的' },
    ],
  },
];
