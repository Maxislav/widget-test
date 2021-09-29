"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack_1 = require("webpack");
const awesome_typescript_loader_1 = require("awesome-typescript-loader");
const ROOT = path.resolve(__dirname, 'src');
module.exports = (env, args) => {
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
                new awesome_typescript_loader_1.TsConfigPathsPlugin({
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
            new webpack_1.HotModuleReplacementPlugin(),
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
//# sourceMappingURL=webpack.config.js.map