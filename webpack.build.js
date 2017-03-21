process.env.NODE_ENV = 'production'

require('babel-core/register')
// var config = require('./common/config')
var webpack = require('webpack')
var path = require('path')
var ROOT_PATH = path.resolve(__dirname)
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var fs = require('fs')
var nodeModules = fs.readdirSync('node_modules')
  .filter(function (i) {
    return ['.bin', '.npminstall'].indexOf(i) === -1
  })
var includes = [
  path.resolve(__dirname, 'app'),
  path.resolve(__dirname, 'common'),
  path.resolve(__dirname, 'client'),
  path.resolve(__dirname, 'server')
]

function getPackagePath(packageName) {
  // We resolve package.json because otherwise path.resolve returns main module path
  return path.dirname(require.resolve(packageName + '/package.json'));
}

const componentsDir = path.resolve(ROOT_PATH, 'app/components');
const codeMirrorPath = getPackagePath('codemirror');

var browerConfig = require('./webpack.base');
browerConfig.devtool = 'cheap-source-map';
browerConfig.name = 'browser side render';
browerConfig.output.path = 'public/build';
browerConfig.output.path = 'public/build';
for (var key in browerConfig.entry) {
  browerConfig.entry[key].splice(1, 1);
}
browerConfig.loaders = [
  {
    test: /\.jsx|.js$/,
    exclude: /node_modules/,
    include: includes,
    loader: 'babel-loader'
  }, {
    test: /\.css$/,
    include: [
      codeMirrorPath,
      getPackagePath('highlight.js'),
      /node_modules/,
    ],
    loader: 'style!css',
  }, {
    test: /\.css$/,
    include: componentsDir,
    loader: 'style!css?modules&importLoaders=1&localIdentName=ReactStyleguidist-[name]__[local]',
  }, {
    test: /module\.less$/,
    include: includes,
    loader: 'style-loader!css-loader?modules&localIdentName=[local]---[hash:base64:5]!less-loader'
  }, {
    test: /\.less$/,
    include: includes,
    exclude: /module\.less$/,
    loader: 'style!css!less!postcss'
  },
  { test: /\.woff2?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
  { test: /\.ttf$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
  { test: /\.eot$/, loader: 'file' },
  { test: /\.svg$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
  { test: /\.(png|jpg|jpeg|gif)$/i, loader: 'url?limit=10000&name=[name].[ext]' },
  { test: /\.json$/, loader: 'json' },
  { test: /\.html?$/, loader: 'file?name=[name].[ext]' }
];

browerConfig.plugins = [
  new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
  new webpack.optimize.DedupePlugin(),
  new UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __SERVER__: false
  }),
  new webpack.HotModuleReplacementPlugin()
];

var serverConfig = {
  name: 'server side render',
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'server/index')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    publicPath: '/build',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: true,
    __filename: true
  },
  externals: [
    function (context, request, callback) {
      var pathStart = request.split('/')[0]
      if (pathStart && (pathStart[0] === '!') || nodeModules.indexOf(pathStart) >= 0 && request !== 'webpack/hot/signal.js') {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    }
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: includes,
        loader: 'babel-loader',
        query: {
          plugins: [
            ["babel-plugin-transform-require-ignore", {
              "extensions": [".less", ".css"]
            }]
          ]
        }
      }, {
        test: /\.(css|less)$/,
        loader: 'null'
      },
      { test: /\.woff2?$/, loader: 'null' },
      { test: /\.ttf$/, loader: 'null' },
      { test: /\.eot$/, loader: 'null' },
      { test: /\.svg$/, loader: 'null' },
      { test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=10000' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
    alias: {
      "utils": path.join(ROOT_PATH, 'app/utils'),
      "states": path.join(ROOT_PATH, 'app/states')
    }
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __SERVER__: true
    })
  ]
};

var webpackConfig = [];
webpackConfig[0] = browerConfig;
webpackConfig[1] = serverConfig;

module.exports = webpackConfig;
