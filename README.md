## 01.项目目录介绍
build： 编译后的项目目录
examples： 案例目录demo
lib： 使用的插件目录
packages： 组件源码
src： 源码文件目录
test： 测试目录
types： 类型声明文件


1.1初始化 package.json
npm init -y

1.2下载依赖
npm i webpack webpack-cli -D
启用 webpack
1.3命令说明：
npx webpack ：是用来运行本地安装的 webpack 包的。
./src/main.js ：指定webpack 从 main.js 文件开始打包，但不会打包main.js，还会将其他依赖也一起打包。
--mode-xxx：指定环境
1.4开发模式
npx webpack ./src/index.js --env development
1.5生产模式
npx webpack ./src/index.js --env production
默认webpack 会将文件打包输出到 dist 目录下

1.6新建html
建好html文件，选择对应语言模式
输入感叹号，并按【tab键】即可快速生成HTML模板即可。

1.7修改npm仓库的地址:
npm config set registry 地址
npm的镜像地址有以下几个：

1. 官方镜像：https://registry.npmjs.org/

2. 淘宝镜像：https://registry.npm.taobao.org/

3. cnpm镜像：https://r.cnpmjs.org/

4. 阿里云镜像：https://npm.aliyun.com/

5. 中国科技大学镜像：https://mirrors.ustc.edu.cn/npm/

6. 华为云镜像：https://mirrors.huaweicloud.com/repository/npm/


```
2.如何使用PostCSS？
查找PostCSS在构建工具中的扩展，比如webpack中的postcss-loader

选择可以添加你需要的PostCSS相关的插件

1. 安装postcss 、postcss-cli

npm install postcss postcss-cli -D

2. 安装插件 

① autoprefixer(自动添加浏览器前缀)

npm install autoprefixer -D

3. 直接使用postcss工具，并且制定使用 autoprefixer

npx postcss --use autoprefixer ./src/css/select.css（输入地址） -o  ./src/css/end.css(输出地址) 
npx postcss  ./src/css/select.css -o  ./src/css/end.css

（三）-（三）webpack使用postCSS
1. 安装 postcss-loader

npm install postcss-loader -D

2. 在webpack.config.js中配置 options

module: {//模块

        rules: [//规则

            {

                test: /\.css$/,//什么内容需要  值为正则表达式（以 .css 结尾的）

                use: [//使用的loader

                    {

                        loader: "style-loader",

                        options: {//传递额外参数

                        }

                    },

                    {

                        loader: "css-loader",

                        options: {//传递额外参数

                        }

                    },

                    {

                        loader: "postcss-loader",

                        options: {

                            postcssOptions: {

                                plugins: [

                                    require("autoprefixer")

                                ]

                            }

                        }

                    },

                ],

            },

            {

                test: /\.less$/,

                use: ["style-loader", "css-loader", "less-loader"]

            }

        ]

    }

作者：A前A程
链接：https://www.jianshu.com/p/89a4bcc307a0

```

## Install
```shell
npm install element-ui -S
```

## Quick Start



## LICENSE
[MIT](LICENSE)