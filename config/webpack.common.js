const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');


module.exports = {
    entry: {
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
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    mimetype: 'application/font-woff',
                    name: 'name=assets/fonts/[name].[ext]',
                },
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: ["file-loader?name=assets/images/[name].[ext]",
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }]
            },

            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader&importLoaders=1',
                })
            }
            , {
                test: /(\.scss)$/,
                include: helpers.root('src/app'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer'),
                                        require('lost')
                                    ];
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }

                        }
                        // 'sass-loader?sourceMap=map'
                    ]
                })
            },

            {
                test: /(\.scss)$/,
                include: helpers.root('src/styles'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer'),
                                        require('lost')
                                    ];
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }

                        }
                        // 'sass-loader?sourceMap=map'
                    ]
                })
            }
        ]
    },

    plugins: [

        new webpack
            .optimize
            .CommonsChunkPlugin({
                name: 'vendor',
                minChunks: ({resource}) => /node_modules/.test(resource),
            }),

        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true
        }),

        new HtmlWebpackPlugin({template: 'src/index.html'})

    ],


}




