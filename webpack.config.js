const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/clients/js/main.js",
    videoPlayer: "./src/clients/js/videoPlayer.js",
    recorder: "./src/clients/js/recorder.js",
  },
  mode: "development",
  watch: true,
  plugins: [new MiniCssExtractPlugin({ filename: "css/style.css" })],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jss/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { target: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
