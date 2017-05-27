const webpack = require('webpack');

const vendors = [
 'react',
 'react-dom',
 'react-router',
 'react-mixin',
 'react-responsive',
 'antd',
 'babel-plugin-react-html-attrs',
 'babel-preset-es2015',
 'babel-preset-react',
 'style-loader',
 // 'babel-loader',
 // 'babelify',
 // 'css-loader',
 // 'fetch',
 // 'webpack',
 // 'webpack-dev-server'
];

module.exports = {
    output:{
        path:__dirname + "/src",
        filename:"ddl.js"
    },
     entry: {
      "lib": vendors,
     },
     plugins: [
         new webpack.DllPlugin({
             path: 'manifest.json',
             name: '[name]',
             context: __dirname,
        }),
     ],
};
