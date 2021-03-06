const webpack = require("webpack");
//合并
const merge = require("webpack-merge");
const nodeExternals = require('webpack-node-externals');
const base = require("./webpack.base.config");
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const {
    resolve,
    join
} = require("path");
//将相对路径转为绝对路径。
const CLIENT_FOLDER = resolve(__dirname, "../");

let config = merge(base, {
    target: "node",
    devtool: "#source-map",
    entry: CLIENT_FOLDER + "/src/modules/front/entry-server.js",
    output: {
        filename: "server-bundle.js",
        libraryTarget: 'commonjs2'
    },
    resolve: {},
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
})