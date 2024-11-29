const path = require("path");
//const Strip = require("strip-loader");

//实现多页面
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 多页入口
function getEntry() {
  const entry = {};
  glob.sync('./src/view/**/index.js').forEach((file) => {
    //console.log("开始："+file);
    //console.log(file.match(/\/view\/(.+)\/index.js/));
    let fileName = file.match(/[\/|\\]view[\/|\\]([a-zA-Z0-9]+)[\/|\\]index.js/);
    let name;
    if(fileName){
      name=fileName[1];
    }else if(fileName=file.match(/[\/|\\]view[\/|\\]([a-zA-Z0-9]+)[\/|\\]([a-zA-Z0-9]+)[\/|\\]index.js/)){
      name=fileName[1]+'_'+fileName[2];
    }
    //console.log("fileName:"+fileName);
    entry[name] = './'+convertPath(file);
    console.log("结束："+'./'+convertPath(file));
  });
  return entry;
}
//路径转换win->linux
function convertPath(windowPath) {
  // 将反斜杠转换为正斜杠
  return windowPath.split(path.sep).join(path.posix.sep);
}

// 多页模板
function getHtmlTemplate() {
  return glob
    .sync('./src/view/**/index.html')
    .map((file) => {
      let fileName = file.match(/[\/|\\]view[\/|\\]([a-zA-Z0-9]+)[\/|\\]index.html/);
      let name;
      if(fileName){
        name=fileName[1];
      }else if(fileName=file.match(/[\/|\\]view[\/|\\]([a-zA-Z0-9]+)[\/|\\]([a-zA-Z0-9]+)[\/|\\]index.html/)){
        name=fileName[1]+'_'+fileName[2];
      }
      // file.match(/[\/|\\]view[\/|\\](.+)[\/|\\]index.html/)[1]
      return { name:name, path: file };
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          template: template.path,
          chunks: [template.name.toString()],
          filename: `${template.name}.html`,
        })
    );
}

module.exports = function (env = {}) {
  const dev = env.development;

  return {
    mode: dev ? "development" : "production",
    cache: false,
    //entry: dev ? "./src/index.js" : "./src/index.js",
    // entry: {
    //   about2: './src/view/about/about2/index.js',
    //   about1: './src/view/about/about1/index.js',
    // },
    entry:{index:"./src/index.js",...getEntry()},
    output: {
      path: path.resolve(__dirname, "dist"),
      //filename: dev ? "qui.js" : "qui.min.js",
      //sourceMapFilename: dev?'qvm.map':'qvm.min.map',
      //libraryTarget: "umd", //umd模块
      filename: 'js/[name].qui.js',
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
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.html$/i,
          include:[
            path.resolve(__dirname, "src/components")
          ],
          loader: "html-loader",
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
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     template: './src/view/about2/index.html',
    //     chunks: ['about2'],
    //     filename: 'about2.html',
    //   }),
    //   new HtmlWebpackPlugin({
    //     template: './src/view/about1/index.html',
    //     chunks: ['about1'],
    //     filename: 'about1.html',
    //   }),
    // ],
    plugins: [new CleanWebpackPlugin(), ...getHtmlTemplate()],
  };
};
