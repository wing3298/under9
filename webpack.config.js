const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotClient = require('webpack-hot-client');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devBuild = process.env.NODE_ENV === 'dev';
console.log(`Starting webpack build with NODE_ENV: ${process.env.NODE_ENV}`);

const config = {
    entry: {
        main: [ path.resolve('./src/main.ts') ]
    },
    output: {
        publicPath: '/',
        path: path.resolve('dist/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [ '.ts', '.vue', '.js' ],
        modules: [ 'src/app', 'node_modules' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'webpack-hot-client/client': path.resolve('dist/')
        }
    },
    mode: devBuild ? 'development' : 'production',
    devtool: devBuild ? 'source-map' : undefined,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/html/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.ProvidePlugin({
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [ /\.vue$/ ]
                        }
                    },
                    {
                        loader: 'tslint-loader'
                        // Enabling the typeCheck option here causes builds to fail:
                        // "Ensure that the files supplied to lint have a .ts, .tsx, .d.ts, .js or .jsx extension."
                        // Commented out like this, the build runs, but all lines of *.vue files are linted, including
                        // <template> and <script> blocks.
                        // , options: {
                        //     typeCheck: true
                        // }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },/*
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                    fallback: 'responsive-loader',
                    mimetype: 'image/png',
                  }
                }
              ]
            },*/
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
                'file-loader'
              ]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i, 
              loaders: 'file-loader',
              options: {
                name: '[name].[ext]',
                context: '',
                outputPath: 'assets/'
              }
            },
            {
                test: /(\.css$)/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
              test: /\.ico$/, 
              loader: 'file-loader?name=[name].[ext]'
            },/*
            {
                loader: 'sass-resources-loader',
                options: {
                  resources: path.resolve(__dirname, '../src/style/_variables.scss')
                }
            }*/
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // CSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                            // ソースマップの利用有無
                            sourceMap: true,
                            // 空白文字やコメントを削除する
                            minimize: true,
                            // Sass+PostCSSの場合は2を指定
                            importLoaders: 2
                          },              
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                          // PostCSS側でもソースマップを有効にする
                          sourceMap: true,
                          plugins: [
                            // Autoprefixerを有効化
                            // ベンダープレフィックスを自動付与する
                            require('autoprefixer')({grid: true})
                          ]
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }              
                    }
                ]
            },
        ]
    }
};

module.exports = config;