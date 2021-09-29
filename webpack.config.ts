import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import { HotModuleReplacementPlugin } from 'webpack';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
const ROOT = path.resolve(__dirname, 'src');

interface WEBPACK_ENV {
  [key: string]: any
}

interface WEBPACK_ARGS {
  mode: string,
  env: WEBPACK_ENV
}

module.exports = (env: WEBPACK_ENV, args: WEBPACK_ARGS) => {
  return {
    entry: {
      app: [
        './src/index.ts'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: "",
      filename: "widget.[name].[chunkhash].min.js",
    },
    devtool: args.mode ==='development' && 'source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        ROOT,
        'node_modules'
      ],
      alias: {},
      plugins: [
        new TsConfigPathsPlugin({
          configFileName: path.join(__dirname, './tsconfig.json'),
        }),
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack Boilerplate',
        template: path.resolve(__dirname, './src/index.html'), // шаблон
        filename: 'index.html', // название выходного файла
      }),
      new HotModuleReplacementPlugin(),


    ],
    devServer: {
      open: true,
      compress: true,
      hot: true,
      port: 8080,
      liveReload: true,
      watchFiles: [path.resolve(__dirname, './src/index.html')],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader'
          }],
        },
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'awesome-typescript-loader',
            }
          ]
        }
      ]
    }
  };
};
