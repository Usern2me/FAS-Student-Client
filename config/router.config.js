export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index/index', title: '考勤' },
      { path: '/course', component: './course/course', title: '课表' },
      { path: '/info', component: './info', title: '我的' },
      { path: '/info/login', component: './info/login', title: '登陆' },
      { path: '/info/register', component: './info/register', title: '注册' },
    ],
  },
];
