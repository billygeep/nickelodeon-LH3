var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'src/phaser.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
  WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
  CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
})

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/index.js')
    ],
    // vendor: [ 
    // 'phaser',
    // 'phaser-matter-collision-plugin'
    // ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].bundle.min.js'
  },
  plugins: [
    definePlugin,
    new CleanWebpackPlugin(['dist']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    /*new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    }),*/
    //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' /* chunkName= */, filename: 'js/vendor.bundle.js' /* filename= */ }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // path.resolve(__dirname, 'build', 'index.html'),
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: true
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/images/scenes', to: 'src/assets/images/scenes' },
      { from: './src/assets/images/*.png', to: '' },
      { from: './src/assets/images/*.json', to: '' },
      { from: './src/assets/fonts', to: 'src/assets/fonts' },
      { from: './src/assets/audio', to: 'src/assets/audio' },
      { from: './src/data', to: 'src/data' },
      { from: './src/lib', to: 'src/lib' },
      { from: './src/css', to: 'src/css' }
    ]),
    
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /phaser-split\.js$/, use: 'raw-loader' },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    ]
  },
  // optimization: {
  //   minimize: true
  // }

    optimization: {
            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                        minChunks: 2
                    }
                }
            }
          }
  /*node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,

    }
  }*/
}