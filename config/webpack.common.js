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
            },{
                test: /\.(jpg|png|gif)$/,
                use: ["file-loader?name=assets/images/[name][hash].[ext]",
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }]
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

        new HtmlWebpackPlugin({ template: 'src/index.html' })

    ]

}