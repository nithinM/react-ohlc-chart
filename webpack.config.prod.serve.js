const path = require("path");
const merge = require("webpack-merge");
const prod = require("./webpack.config.prod.js");

module.exports = merge(prod, {
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    publicPath: "/assets/"
  }
});
