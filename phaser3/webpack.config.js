//@ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env={}, argm={}) => {
   const { mode="development" } = argm;

   const devtool = mode === "development" 
      ? "eval-source-map" 
      : false;

   const plugins = [
      new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			// filename: './index.html'
		})
   ];

   return {
      entry: {
         main: [
            '@babel/polyfill',
            './src/index.js',
         ]
      },
      output: {
         filename: 'main.js',
         path: path.resolve(__dirname, 'dist')
      },
      mode,
      devtool,
      plugins,
      // devServer: {
      //    port: 8080,
      //    // contentBase: [ './'], // both src and output dirs
      //    inline: true,
      //    hot: true
      // },
      module: {
         rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     '@babel/preset-env'
                  ]
               }
            }
         }]
      }
   }
};