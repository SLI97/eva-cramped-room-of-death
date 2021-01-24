const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  plugins: [new webpack.ProgressPlugin()],
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/docs',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/],
      },
      {
        test: /.css$/,

        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { path: require.resolve('path-browserify') },
  },

  devServer: {
    port: 9000,
    compress: true,
    contentBase: path.join(__dirname, 'docs'),
    allowedHosts: [''],
  },

  plugins: [
    new CleanWebpackPlugin({
      root: __dirname + '/docs',
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['main.js'],
    }),
  ],
};
