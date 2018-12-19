// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');
const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: IS_DEV ? 'inline-source-map' : '',
	entry: {
		'dist/main': './src/main.js'
	},
	optimization: IS_DEV ? {} : {
		minimizer: [new TerserPlugin()]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: { sourceMap: IS_DEV }
					},
				]
			},
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './')
	},
	devServer: {
		contentBase: path.resolve(__dirname, './'),
		watchContentBase: true,
		watchOptions: {
			poll: true
		}
	}
};
