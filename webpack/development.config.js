const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackGitHash = require('webpack-git-hash')
const { resolve } = require('path')

module.exports = () => ({

  entry: {

    main: [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:9004',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

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

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, '../dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    port: 9004,

    host: '0.0.0.0'
  },

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
        from: `../config/${process.env.TARGET}.config.json`,
        to: 'config.json'
      },
      { from: './i18n/**/*.json' },
      // expose i18n translation file for XHR loading
      { from: './favicon.png' },
      { from: './images/*' },
      { from: './styles/*' },
      { from: './fonts/*' }
    ]),

    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // Specify the common bundle's name.
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new DashboardPlugin({ port: 3002 }),
    // A CLI dashboard for your webpack dev server

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
      __TARGET__: JSON.stringify(process.env.TARGET || 'staging')
    }),
    // set environment variables accessible to src/JS code

    new webpack.NoEmitOnErrorsPlugin(),

    new WebpackGitHash()
    // add git hash to output filename by using [githash] in webpack output settings
  ]
})
