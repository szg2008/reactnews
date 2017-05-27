var webpack = require('webpack');
var path = require('path');

module.exports = {
	context:__dirname + '/src',
	entry:[
		"./js/root.js"
	],
	module:{
		loaders:
		[
			{
				test:/\.js?$/,
				exclude:/(node_modules)/,
				loader:'babel-loader',
				query:{
					presets:['es2015','react'],
					plugins:['react-html-attrs']
				}
			},
			{
				test:/\.css?$/,
				//使用css框架ant-design的配置项
				loader:'style-loader!css-loader'
			}
		]
	},
	output:{
		path:__dirname + "/src",
		filename:"bundle.js"
	},
	// plugins: [
	// 	new webpack.DllReferencePlugin({
	//         context: __dirname,
	//         manifest: require('./manifest.json'),
	//     })
	// ]

};
