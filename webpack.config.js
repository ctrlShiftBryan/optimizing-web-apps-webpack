const PATH = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const baseConfig = {
  entry: "./app/app.js",
  output: {
    path: PATH.resolve(__dirname, "app/dist"),
    filename: "app.bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ]
};

module.exports = function(env) {
  const isDevelopment = env === "development";
  if (isDevelopment) {
    return merge(baseConfig, {
      devServer: {
        contentBase: PATH.resolve(__dirname, "app"),
        publicPath: "/dist/",
        hotOnly: true
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          BRYAN_ARENDT: isDevelopment,
          ENV_IS: JSON.stringify(isDevelopment ? "development" : "production"),
        })
        // { // this is an anonymous custom plugin
        //   apply(compiler) {
        //     compiler.plugin("done", function(params){
        //       console.log(require('util').inspect(compiler.options));
        //     });
        //   }
        // }
      ]
    })
  }
  console.log(
    `This is a ${isDevelopment ? "development" : "production"} build`
  );
  return baseConfig;
};
