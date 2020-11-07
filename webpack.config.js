const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC_DIR = path.resolve('src');
const OUT_DIR = path.resolve('target');

module.exports = {
    mode: 'development',

    devtool: 'cheap-source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    },

    entry: {
        main: path.join(SRC_DIR, 'client.tsx'),
    },

    output: {
        path: OUT_DIR,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
    },

    devServer: {
        contentBase: OUT_DIR,
        open: true,
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                include: SRC_DIR,
                use: {
                    loader: 'eslint-loader',
                },
            },
            {
                oneOf: [
                    {
                        test: /\.tsx?$/,
                        include: SRC_DIR,
                        use: 'ts-loader',
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'sass-loader',
                        ],
                    },
                ],
            },
        ],
    },

    // Don't polyfill any Node globals
    node: false,

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('public/index.html'),
        }),
    ],
};
