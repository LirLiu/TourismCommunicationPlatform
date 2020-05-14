
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/faqs', component: '../pages/faqs/index' },
        { path: '/faqs/detail/:id?', component: '../pages/faqs/detail/$id$' },
        { path: '/article', component: '../pages/article/index' },
        { path: '/article/detail/:id?', component: '../pages/article/detail/$id$' },
        { path: '/post', component: '../pages/post/index' },
        { path: '/post/detail/:id?', component: '../pages/post/detail/$id$' },
        { path: '/partner', component: '../pages/partner/index' },
        { path: '/partner/detail/:id?', component: '../pages/partner/detail/$id$' },
        { path: '/login', component: '../pages/login/index' },
        { path: '/register', component: '../pages/register/index' },
        { path: '/personal', component: '../pages/personal/index' },
        { path: '/release', component: '../pages/release/index' },
        { path: '/other', component: '../pages/other/index' },
        { path: '/admin', component: '../pages/admin/index' },
        { path: '/admin/manage', component: '../pages/admin/manage/index' },
      ]
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: '旅游交流平台',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
