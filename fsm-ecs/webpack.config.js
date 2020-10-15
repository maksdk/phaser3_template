const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigWebpackPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(ts|js)$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        }],
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.ts', '.json'],
        modules: ['node_modules'],
        plugins: [
            new TsConfigWebpackPlugin({
                configFile: path.resolve(__dirname, 'tsconfig.json')
            })
        ]
    }
};