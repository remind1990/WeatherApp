const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name]-[sha1:hash:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],

  devServer: {
    open: true,
  },
};
