require('babel-polyfill');

// Webpack config for development
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;
const babelrc = fs.readFileSync('./.babelrc');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

let babelrcObject = {};

try {
	babelrcObject = JSON.parse(babelrc);
} catch (err) {
	console.error('==>     ERROR: Error parsing your .babelrc.');
	console.error(err);
}

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
const combinedPlugins = babelrcObject.plugins || [];

combinedPlugins.push(...babelrcObjectDevelopment.plugins);

const babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {
	plugins: combinedPlugins
});

delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on
// the server, we have to add the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];

let reactTransform = null;

for (let idx = 0; idx < babelLoaderQuery.plugins.length; ++idx) {
	const plugin = babelLoaderQuery.plugins[idx];

	if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
		reactTransform = plugin;
	}
}

if (!reactTransform) {
	reactTransform = ['react-transform', { transforms: [] }];
	babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
	reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] });
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
	transform: 'react-transform-hmr',
	imports: ['react'],
	locals: ['module']
});

module.exports = {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: [
			`webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
			'bootstrap-loader',
			'./src/client.js'
		]
	},
	output: {
		path: assetsPath,
		filename: '[name]-[hash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: `http://${host}:${port}/dist/`
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: babelLoaderQuery
					},
					'eslint-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: true,
							importLoaders: 2,
							localIdentName: '[local]___[hash:base64:5]'
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
		// hot reload
		new webpack.HotModuleReplacementPlugin(),
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: true
		}),
		webpackIsomorphicToolsPlugin.development()
	]
};
