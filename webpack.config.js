const path = require("path")
const glob = require("glob")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const config = {
  mode: "production",
  entry: {
    "bundle.js": glob.sync("build/static/?(js|css|media)/main.*.?(js|css|media)").map(f => path.resolve(__dirname, f)),
  },
  output: {
    filename: "build/static/js/bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new UglifyJsPlugin()],
};

module.exports = config;