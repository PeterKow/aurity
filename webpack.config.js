var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'src', 'public', 'build');
var mainDir = path.resolve(__dirname, 'src', 'app');
var mainPath = path.resolve(mainDir, 'main.js');
var __PROD__ = process.env.NODE_ENV === 'production'
var __DEV__ = __PROD__ === false;
console.log('__PROD__', __PROD__)
console.log('__DEV__', __DEV__)

var config = {

  // Makes sure errors in console map to the correct file
  // and line number
  devtool: __DEV__ ? 'inline-source-map' : false,
  entry: [

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    mainPath],
  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/'
  },
  module: {
    loaders: [

      // I highly recommend using the babel-loader as it gives you
      // ES6/7 syntax and JSX transpiling out of the box
      {
        test: /\.js$/,
        loaders: getLoaders(),
        exclude: [nodeModulesPath]
      },
      // Let us also add the style-loader and css-loader, which you can
      // expand with less-loader etc.
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
      }

    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      pages: path.resolve(mainDir, 'pages'),
      containers: path.resolve(mainDir, 'containers'),
      business: path.resolve(mainDir, 'business'),
      persistence: path.resolve(mainDir, 'persistence'),
      utils: path.resolve(mainDir, 'utils')
    },
    extensions: ['', '.js', '.jsx']
  },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': __PROD__ ? JSON.stringify('production') : JSON.stringify('development'),
        __DEV__: __DEV__,
      },
      __DEV__: __DEV__,
    })],
  // enable html5 push state
  devServer: {
    historyApiFallback: true
  }
};

module.exports = config;

function getLoaders(){
  if (__DEV__)  return ['react-hot', 'babel']
  else return ['babel']
}