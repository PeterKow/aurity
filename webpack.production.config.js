var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var mainDir = path.resolve(__dirname, 'src', 'app');
var mainPath = path.resolve(mainDir, 'main.js');

var config = {
  entry: path.resolve(__dirname, 'src/app/main.js'),
  output: {
    path: path.resolve(__dirname, 'src', 'public'),
    filename: '/build/bundle.js'
  },
  module: {
    loaders: [

      // I highly recommend using the babel-loader as it gives you
      // ES6/7 syntax and JSX transpiling out of the box
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel'],
        exclude: [nodeModulesPath]
      },
      // Let us also add the style-loader and css-loader, which you can
      // expand with less-loader etc.
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff&name=/build/[hash].[ext]" },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=/build/[hash].[ext]"
      }

    ]
  },
  plugins: [
    new Webpack.NoErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'DEVTOOLS': process.env.DEVTOOLS === 'true' ? true : false
      },
    })],
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      pages: path.resolve(mainDir, 'pages'),
      containers: path.resolve(mainDir, 'containers'),
      business: path.resolve(mainDir, 'business'),
      persistence: path.resolve(mainDir, 'persistance'),
      utils: path.resolve(mainDir, 'utils')
    },
    extensions: ['', '.js', '.jsx']
  },
};

module.exports = config;