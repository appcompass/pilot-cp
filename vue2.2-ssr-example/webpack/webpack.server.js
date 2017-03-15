const path = require('path')
const projectRoot = path.resolve(__dirname, '..')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
  target: 'node',
  entry: path.join(projectRoot, 'src/server.js'),
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: 'bundle.server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new VueSSRPlugin()
  ]
};
