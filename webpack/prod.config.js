require('babel-polyfill');

// Webpack config for creating the production bundle.
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const strip = require('strip-loader');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: [
			'bootstrap-loader/extractStyles',
			'./src/client.js'
		]
	},
	output: {
		path: assetsPath,
		filename: '[name]-[chunkhash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [strip.loader('debug'), 'babel-loader']
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								sourceMap: true,
								importLoaders: 2
							}
						},
						{
							loader: 'autoprefixer-loader',
							options: {
								browsers: 'last 2 version'
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								sourceMapContents: true,
								outputStyle: 'expanded'
							}
						},
						{
							loader: 'sass-resources-loader',
							options: {
								resources: './src/theme/sass-resources.scss'
							}
						}
					]
				})
			},
			{
				test: webpackIsomorphicToolsPlugin.regular_expression('images'),
				loader: 'url-loader',
				options: {
					limit: 10240
				}
			}
		]
	},
	resolveLoader: {
		modules: ['node_modules', 'webpack'],
		extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js']
		// packageMains: ['webpackLoader', 'webLoader', 'loader', 'main']
	},
	resolve: {
		modules: [
			'src',
			'node_modules'
		]
	},
	plugins: [
		new CleanPlugin([assetsPath], { root: projectRootPath }),

		// css files from the extract-text-plugin loader
		new ExtractTextPlugin({
			filename: '[name]-[chunkhash].css',
			allChunks: true
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"',

			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false
		}),

		// ignore dev config
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

		// optimizations
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true
		}),

		webpackIsomorphicToolsPlugin
	]
};
