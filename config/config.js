// https://umijs.org/config/
import path from "path"
import pageRoutes from "./router.config"
import themes from "../src/theme.js"

export default {
  // add for transfer to umi
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
        dynamicImport: {
          loadingComponent: "./components/PageLoading/index",
          webpackChunkName: true
        },
        title: {
          defaultTitle: "考勤系统学生端"
        },
        dll: false,
        pwa: false,
        hd: true,
        routes: {
          exclude: []
        },
        hardSource: false
      }
    ]
  ],
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
  theme: {
    'brand-primary': themes.primaryColor,

  },
  //   ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  cssnano: {
    mergeRules: false
  },
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 9
  },
  outputPath: "./deploy/dist",
  hash: true,
  alias: {
    "@": path.resolve(__dirname, "src"),
    "@c": path.resolve(__dirname, "src/components"),
    "@page": path.resolve(__dirname, "src/pages")
  }
}
