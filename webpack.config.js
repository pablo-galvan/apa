'use strict';

let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
let webpack = require('webpack');

let plugins = [
    new ExtractTextPlugin('/css/[name].css'),
    new CopyWebpackPlugin([
        {
            from: './app',
            to: './static'
        },
        {
            from: './js',
            to: './static/js'
        },
        {
            from: './index.html',
            to: './index.html'
        }
    ])
];

if (process.ENV == 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}

module.exports = {
    context: path.join(__dirname, '/client'),
    devtool: 'source',
    entry: './index.js',
    module: {
        rules: [{
            test: /\.js$/, 
            use: ['ng-annotate-loader']
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.css'],
    },
    output: {
        path: __dirname + '/public',
        filename: 'static/[name].min.js'
    },
    plugins: plugins
};
