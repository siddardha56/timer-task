const webpack = require('webpack');
var path = require("path");
var config = {
   entry: './src/js/index.js',
	
   output: {
      path : path.resolve('./build'),
      filename : "bundle.js",
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['stage-0', 'es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;