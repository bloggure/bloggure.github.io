const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    scripts: ['./assets/js/plugins/jquery.dlmenu.js', './assets/js/plugins/jquery.fitvids.js', 
              './assets/js/plugins/jquery.magnific-popup.js', './assets/js/plugins/respond.js', 
              './assets/js/_main.js']
  },
  output: {
    filename: 'scripts.min.js',
    path: path.resolve(__dirname, 'assets/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  optimization: {
    minimize: true
  },
  externals: {
    jquery: 'jQuery'
  }
};