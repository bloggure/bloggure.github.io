const path = require('path');

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
  optimization: {
    minimize: true
  }
};