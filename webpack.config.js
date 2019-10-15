const path = require('path');

module.exports = (env={}, argm={}) => {
   const { mode="development" } = argm;

   const devtool = mode === "development" 
      ? "eval-source-map" 
      : false;

   const plugins = [];

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