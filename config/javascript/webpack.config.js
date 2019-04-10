const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const babelConfig = require('./babel.config');
const javascriptJson = require('../../javascript.json');
const packageJson = require('../../src/javascript/package.json');

const peerDependencies = Object.keys(packageJson.peerDependencies);
const prodExternals = peerDependencies.reduce((externals, packageName) => {
  return Object.assign({}, externals, {
    [packageName]: packageName,
  });
}, {});

const providePlugin = new ProvidePlugin({
  regeneratorRuntime: 'regenerator-runtime',
});

const copyPlugin = new CopyPlugin([
  {
    from: path.join(__dirname, '../..', javascriptJson.packageJsonPath),
    to: path.join(__dirname, '../..', javascriptJson.outputDir),
  }
]);

const isProduction = process.env.NODE_ENV === 'production';
const webpackConfig = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    [javascriptJson.name]: path.join(__dirname, '../..', javascriptJson.entryPointPath)
  },
  externals: isProduction ? prodExternals : {},
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src/javascript/src', 'node_modules'],
    alias: {
      '@shared': '../../shared'
    },
  },
  output: {
    library: '[name]',
    libraryTarget: 'umd',
    path: path.join(__dirname, '../..', javascriptJson.outputDir),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
        exclude: [
          /\.(spec)\.jsx?$/,
          /node_modules/,
        ],
      },
    ],
  },
  plugins: [providePlugin, copyPlugin],
};

module.exports = webpackConfig;
