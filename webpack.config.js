const path = require('path');
module.exports = {
    resolve: {
        fallback: {
          fs: false
        }
      },
  target: "web",
  entry: {
    app: ["./src/combine-new.js"]
  },
  output: {
    path: path.resolve(__dirname, "./public/build"),
    filename: "bundle.js",
  },
  devServer: {
    host: '0.0.0.0', // Required for docker
    publicPath: './public/assets/',
    contentBase: path.resolve(__dirname, "./views"),
    watchContentBase: true,
    compress: true,
    port: 9001
  },
  devtool: 'inline-source-map',
}
