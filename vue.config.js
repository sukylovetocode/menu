const Components = require("unplugin-vue-components/webpack");
const autoImport = require("unplugin-auto-import/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  transpileDependencies: true,
  // lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      autoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    devtool: "source-map",
  },
};
