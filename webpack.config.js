var webpack = require('webpack');

module.exports = {
  entry: [
  	"./app/app.jsx"
  ],
  output: {
        path: __dirname + '/static/js',
        filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'jsx' }
    ]
  }
}