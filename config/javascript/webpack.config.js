const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const babelConfig = require('./babel.config');
const javascriptJson = require('../../javascript.json');
const packageJson = require('../../src/javascript/package.json');

const projectRoot = path.join(__dirname, '../..');

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
    from: path.join(projectRoot, javascriptJson.packageJsonPath),
    to: path.join(projectRoot, javascriptJson.outputDir),
  }
]);

const isProduction = process.env.NODE_ENV === 'production';
const webpackConfig = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    [javascriptJson.name]: path.join(projectRoot, javascriptJson.entryPointPath)
  },
  externals: isProduction ? prodExternals : {},
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src/javascript/src', 'node_modules'],
    alias: {
      '@shared': path.join(projectRoot, './src/shared'),
    },
  },
  output: {
    library: '[name]',
    libraryTarget: 'umd',
    path: path.join(projectRoot, javascriptJson.outputDir),
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
