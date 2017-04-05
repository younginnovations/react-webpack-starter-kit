const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');


module.exports = {
    entry: {
        'vendor': './src/vendor.js',
        'app': './src/main.js'
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            }, {
                test: /\.(eot|svg)$/,
                loader: "file-loader?name=[name].[hash:20].[ext]"
            }, {
                test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
                loader: "url-loader?name=images/[name].[hash:20].[ext]&limit=10000"
            }, {
                test: /\.(jpe?g|png|jpg)$/i,
                exclude: 'node_modules',
                loader: 'url-loader?limit=8192!img'
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /(\.scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?sourceMap', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [require('autoprefixer')];
                                }
                            }
                        },
                        'sass-loader?sourceMap=map'
                    ]
                })
            }
        ]
    },

    plugins: [

        new webpack
            .optimize
            .CommonsChunkPlugin({
                name: ['app', 'vendor']
            }),

        new ExtractTextPlugin('[name].css'),

        new HtmlWebpackPlugin({template: 'src/index.html'})

    ]

}