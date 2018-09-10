const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/app.js"]
  },
  plugins: [new CleanWebpackPlugin(["public/assets"])],
  output: {
    filename: "[name].min.js",
    path: path.join(__dirname, "public", "assets")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader"
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/assets/images/",
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/assets/fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  }
};
