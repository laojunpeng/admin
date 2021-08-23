import { defineConfig } from "umi";
import AntdDayjsWebpackPlugin from "antd-dayjs-webpack-plugin";
export default defineConfig({
  title: "售后系统",
  nodeModulesTransform: {
    type: "none",
  },
  fastRefresh: {},
  dynamicImport: {},
  webpack5: {},
  ignoreMomentLocale: true,
  // mfsu: {},
});
