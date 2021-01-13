const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: __dirname,
  resolve: {
    modules: [srcPath, path.resolve(__dirname, 'node_modules')],
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: srcPath,
  output: {
    path: distPath,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 5000,
    contentBase: distPath,
    historyApiFallback: true,
    watchContentBase: true,
    stats: 'minimal',
  },
};
