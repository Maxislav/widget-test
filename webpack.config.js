var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var {HotModuleReplacementPlugin} = require("webpack");
var {TsConfigPathsPlugin} = require("awesome-typescript-loader");
var ROOT = path.resolve(__dirname, 'src');
module.exports = function (env, args) {
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
    devtool: args.mode === 'development' && 'source-map',
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
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
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
