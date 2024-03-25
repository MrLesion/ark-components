const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
        arkMain: path.resolve(__dirname, './src/ark/index.js'),
        arkCarousel: path.resolve(__dirname, './src/ark/carousel/index.js'),
        arkProductForm: path.resolve(__dirname, './src/ark/product-form/index.js'),
        arkProductCard: path.resolve(__dirname, './src/ark/product-card/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        hot: true

    },
    module: {
        rules: [      
            {   test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
    
    plugins: [    
        new HtmlWebpackPlugin({ title: 'Web Components',      
            template: path.resolve(__dirname, './src/template.html'),
            filename: 'index.html', 
        }),
        new CleanWebpackPlugin(),
    ]
}