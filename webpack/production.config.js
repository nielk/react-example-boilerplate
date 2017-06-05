const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BuildLangsWebpackPlugin = require('./build-langs-webpack-plugin')
const WebpackGitHash = require('webpack-git-hash')
const { resolve, join } = require('path')

module.exports = () => ({

  entry: {

    main: [
      'babel-polyfill',
      // to use async generators

      './index.js'
      // the entry point of our app
    ],

    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'tracekit',
      'logmatic-js',
      'isomorphic-fetch',
      'react-i18next',
      'i18next',
      'i18next-xhr-backend',
      'i18next-browser-languagedetector',
      'react-hot-loader',
      'dynamics.js',
      'moment',
      'react-addons-css-transition-group',
      'react-addons-transition-group',
      'react-bootstrap',
      'throttle-debounce'
    ]
  },

  output: {
    // filename: '[chunkhash].[name].js',
    filename: '[name].[githash].js',
    // the output bundle

    path: resolve(__dirname, '../dist'),

    publicPath: '/portal'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, '../src'),

  devtool: 'cheap-module-source-map',

  resolve: {
    alias: {
      components: resolve(__dirname, '../src/components'),
      containers: resolve(__dirname, '../src/containers'),
      pages: resolve(__dirname, '../src/pages'),
      models: resolve(__dirname, '../src/models'),
      services: resolve(__dirname, '../src/services'),
      lib: resolve(__dirname, '../src/lib')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?mimetype=application/font-woff&name=fonts/[name].[ext]&publicPath=./'
        ],
        exclude: /(node_modules|bower_components)/
        // FILE LOADER https://github.com/webpack/file-loader
        // Here used for fonts
        // if file size is < 1kB then it is converted in base64
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?name=fonts/[name].[ext]&publicPath=./'
        ],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?name=icons/[name].[ext]&publicPath=./'
        ],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: `../config/${process.env.TARGET || 'staging'}.config.json`,
        to: 'config.json'
      },
      { from: '../config'},
      { from: './i18n/**/*.json' },
      // expose i18n translation file for XHR loading
      { from: './index.html' },
      { from: './favicon.png' },
      { from: './images/*' },
      { from: './styles/*' },
      { from: './fonts/*' }
    ], {
      copyUnmodified: true
    }),
    // Need copyUnmodified to copy prod.config.json multiple times
    // https://github.com/kevlened/copy-webpack-plugin/issues/99

    new BuildLangsWebpackPlugin({
      langsPath: {
        fr: join(__dirname, '../src/i18n/fr/')
      },
      defaultLangPath: join(__dirname, '../.tmp/messages/'),
      outputDir: join(__dirname, '../dist/i18n/')
    }),

    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // Specify the common bundle's name.
    }),

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
      __TARGET__: JSON.stringify(process.env.TARGET || 'staging'),
      // use to set auth-database etc…
      'process.env': {
        NODE_ENV: JSON.stringify('production')
        // needed by react
      }
    }),
    // set environment variables accessible to src/JS code

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    // minify JS

    new webpack.NoEmitOnErrorsPlugin(),

    new WebpackGitHash()
    // add git hash to output filename by using [githash] in webpack output settings
  ]
})
