const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

process.env.NODE_ENV = 'production';

const serverPlugins = [
  new webpack.DefinePlugin({
    __client__: false,
    __dev__: false,
    __env__: JSON.stringify('prd'),
  }),
];

const plugins = [
  [
    'babel-plugin-transform-require-ignore',
    {
      extensions: ['.less', '.css'],
    },
  ],
];

module.exports = {
  stats: 'errors-only',
  mode: 'production',
  entry: {
    index: './ssr',
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist-ssr'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: plugins,
          },
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './images/[name].[contenthash:6].[ext]',
          },
        },
      },
    ],
  },
  plugins: serverPlugins,
};
