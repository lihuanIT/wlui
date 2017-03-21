process.env.NODE_ENV = 'development'

var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var rucksack = require('rucksack-css');
var autoprefixer = require('autoprefixer');
var includes = [
  path.resolve(ROOT_PATH, 'app'),
  path.resolve(ROOT_PATH, 'common'),
  path.resolve(ROOT_PATH, 'client'),
  path.resolve(ROOT_PATH, 'server'),
];

const componentsDir = path.resolve(ROOT_PATH, 'app/components');
const codeMirrorPath = getPackagePath('codemirror');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
/**
 * Return npm package path.
 * In npm2 works only with packages required directly by this package.
 *
 * @param {string} packageName Package name.
 * @return {string}
 */
function getPackagePath(packageName) {
  // We resolve package.json because otherwise path.resolve returns main module path
  return path.dirname(require.resolve(packageName + '/package.json'));
}


module.exports = {
  name: 'backend dev hot middlware',
  node: {
    fs: "empty"
  },
  entry:
  {
    homepage: [
      // For old browsers
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(ROOT_PATH, 'app/pages/homepage')],
    manage: [
      // For old browsers
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(ROOT_PATH, 'app/pages/manage')],
    exporttool: [
      // For old browsers
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(ROOT_PATH, 'app/pages/exporttool')]
  }
  ,
  output: {
    path: path.join(__dirname, '/public/static'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/'
  },
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '/node_modules')],
    extensions: ['', '.js', '.jsx', 'json'],
    alias: {
      "utils": path.join(ROOT_PATH, 'app/utils'),
      "states": path.join(ROOT_PATH, 'app/states'),
      "rsg-components": path.join(ROOT_PATH, 'app/components/rsg-components'),
      "comp": path.join(ROOT_PATH, 'app/components'),
      'codemirror': codeMirrorPath,
      "common": path.join(ROOT_PATH, 'common'),
      'rsg-codemirror-theme.css': path.join(codeMirrorPath, `theme/base16-light.css`),
    }
  },

  resolveLoader: {
    modulesDirectories: ['node_modules', path.join(__dirname, '/node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        include: includes,
        loader: 'babel-loader',
        query: {
          presets: ['react-hmre'],
          plugins: [
            ["inline-replace-variables", {
              "__SERVER__": false
            }]
          ]
        }
      }, {
        test: /\.css$/,
        exclude: [
          componentsDir,
          codeMirrorPath
        ],
        loader: 'style!css!postcss'
      }, {
        test: /\.css$/,
        include: [
          codeMirrorPath,
          getPackagePath('highlight.js'),
        ],
        loader: 'style!css',
      }, {
        test: /\.css$/,
        include: componentsDir,
        loader: 'style!css?modules&importLoaders=1&localIdentName=ReactStyleguidist-[name]__[local]',
      }, {
        test: /module\.less$/,
        include: includes,
        loader: 'style!css?modules&localIdentName=[local]---[hash:base64:5]!less'
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
    ]
  },
  postcss: [
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
    })
  ],
  plugins: [
    new ExtractTextPlugin(path.join(ROOT_PATH, `app/common/layout.less`)),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
