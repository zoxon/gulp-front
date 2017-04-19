var path = require('path');
var webpack = require('webpack');

var env = require('./gulp/util/env.js');
var NODE_ENV = (env.production || env.prod) ? 'production' : 'development';
var isDevelopment = NODE_ENV === 'development';


var outputFileName = isDevelopment ? '[name].js' : '[name]-[chunkhash:10].min.js';

var options = {
	entry: {
		vendor: [ 'jquery', './plugins.js' ],
		main: './main.js'
	},
	output: {
		filename: outputFileName,
		path: __dirname + '/dest/assets/javascripts',
		publicPath: '/assets/javascripts/',
		library: '[name]'
	},
	watch: isDevelopment,
	devtool: isDevelopment ? 'eval' : 'source-map',
	context: path.resolve(__dirname, 'source/static/scripts'),
	module: {
		noParse: /\/node_modules\/(jquery|backbone)/
	}
};

options.plugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: outputFileName
	}),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV)
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

module.exports = options;

