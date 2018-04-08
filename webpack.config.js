const PATH = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const StatsGraphPlugin = require("./StatsGraphPlugin");
const babelLoader = require("./babelLoader");
var WebpackCleanPlugin = require("webpack-clean-plugin");
const dist_path = PATH.resolve(__dirname, "app/dist");

const baseConfig = {
  entry: "./app/app.js",
  output: {
    path: dist_path,
    filename: "app.bundle.js",
    publicPath: "/dist/"
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new StatsGraphPlugin(),
    new WebpackCleanPlugin({
      path: dist_path,
      on: "emit"
    })
  ]
};

module.exports = function(env) {
  const isDevelopment = env === "development";
  if (isDevelopment) {
    return merge(
      baseConfig,
      {
        devServer: {
          contentBase: PATH.resolve(__dirname, "app"),
          publicPath: "/dist/",
          hotOnly: true,
          overlay: true
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.DefinePlugin({
            ENV_IS_DEVELOPMENT: isDevelopment,
            ENV_IS: JSON.stringify(isDevelopment ? "development" : "production")
          })
          // ,{ // this is an anonymous custom plugin
          //   apply(compiler) {
          //     compiler.plugin("done", function(params){
          //       console.log(require('util').inspect(compiler.options));
          //     });
          //   }
          // }
        ]
      },
      babelLoader
    );
  } else {
    return merge(baseConfig, babelLoader);
  }
  console.log(
    `This is a ${isDevelopment ? "development" : "production"} build`
  );
  return baseConfig;
};
