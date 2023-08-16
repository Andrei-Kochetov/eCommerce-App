const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
  },
};
