const path = require("path");
const Strip = require("strip-loader");

module.exports = function (env = {}) {
  const dev = env.development;

  return {
    mode: dev ? "development" : "production",
    cache: false,
    entry: dev ? "./src/index.js" : "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: dev ? "qui.js" : "qui.min.js",
      //sourceMapFilename: dev?'qvm.map':'qvm.min.map',
      //libraryTarget: "umd", //umd模块
    },
    resolve: {
      modules: ["node_modules"],
      extensions: ['.js', '.json','.vue'],
      // 配置别名，简化模块路径
      alias: {
        "@src": path.resolve(__dirname, "src/"),
        // 其他别名
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
            // {//正式打包开启
            //       //正式打包取消alert函数，assert
            //       loader:Strip.loader('','')
            // },
          ],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "/"),
      },
      hot: true,
      compress: true,
      open: true,
      host: "localhost",
      port: 9000,
    },

    devtool: "source-map",
  };
};
