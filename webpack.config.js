const path = require('path');
//console.log('this is webpack.config.js path   ----   '+path.resolve(__dirname, 'dist'))
//安装html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    //入口文件
    entry: './src/index.js',
    output: {
        //输出文件名称
        filename: 'main.js',
        //输出路径（绝对路径）
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',//development production
    module: {
        //对某个格式的文件进行转换
        rules: [
            {
                test: /\.css$/,//正则表达式
                use: [//use中的loader顺序是从下到, 依次执行
                    //js央视内容写入style标签
                    "style-loader",
                    //css文件转为js
                    'css-loader',
                ]
            },
            {
                test: /\.(jpg|png|gif)/,//匹配图片文件
                loader: 'url-loader',
                type: 'javascript/auto',
                //图片小于8KB，进行base64处理
                options: {
                    limit: 8*1024,
                    esModule: false,
                    name: '[hash:10].[ext]',//图片hash的前十位为图片名字，ext为图片后缀
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },

        ],
    },
    plugins:[
      new htmlWebpackPlugin({
          template: './index.html',
      }),
    ],
    devServer: {
        //项目构建路径
        /*contentBase: path.resolve(__dirname, "dist"),*/
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        //启动gzip压缩
        compress: true,
        //端口
        port: 3000,
        //自动打开浏览器
        open: true,
        historyApiFallback: true,
        allowedHosts: 'all',
    },
}