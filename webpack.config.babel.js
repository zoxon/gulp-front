import path from 'path';
import webpack from 'webpack';

import env from './gulp/util/env.js';
const NODE_ENV = (env.production || env.prod) ? 'production' : 'development';
const isDevelopment = NODE_ENV === 'development';


const outputFileName = '[name].js';

let options = {
	entry: {
		vendor: [ 'jquery', './vendor.js' ],
		main: './main.js'
	},
	output: {
		filename: outputFileName,
		path: __dirname + '/dest/assets/javascripts',
		publicPath: '/assets/javascripts/',
		library: '[name]'
	},
	watch: isDevelopment,
	devtool: isDevelopment ? 'eval-source-map' : 'source-map',
	context: path.resolve(__dirname, 'source/static/scripts'),
	module: {
		noParse: /\/node_modules\/(jquery|backbone)/,
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			}
		]
	}
};

options.plugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: outputFileName
	}),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV),
		'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
	}),
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery'
	})
];

if (isDevelopment) {
	options.plugins.push(
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	);
}
else {
	options.plugins.push(
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
			output: {
				comments: false
			}
		})
	);
}

export default options;
