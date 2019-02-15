export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index/index', title: '考勤' },
      { path: '/index/detail', component: './index/detail', title: '考勤图表页' },
      { path: '/result', component: './index/result', title: '结果页' },
      { path: '/course', component: './course', title: '课表' },
      { path: '/info', component: './info', title: '我的' },
      { path: '/info/login', component: './info/login', title: '登陆' },
      { path: '/info/register', component: './info/register', title: '注册' },
      { path: '/info/edit', component: './info/edit', title: '编辑' },
      { component: '404', title: '页面没找到' },
    ],
  },
];
