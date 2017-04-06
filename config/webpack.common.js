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
                test: /\.(jpg|png|gif)$/,
                use: ["file-loader?name=assets/images/[name][hash].[ext]",
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }]
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
                })
            }
            , {
                test: /(\.scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'

                            }
                        },
                        {
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

        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true
        }),

        new HtmlWebpackPlugin({ template: 'src/index.html' })

    ]

}