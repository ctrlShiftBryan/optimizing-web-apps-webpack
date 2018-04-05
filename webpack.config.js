const PATH = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const StatsGraphPlugin = require("./StatsGraphPlugin");
const babelLoader = require('./babelLoader')

const baseConfig = {
  entry: "./app/app.js",
  output: {
    path: PATH.resolve(__dirname, "app/dist"),
    filename: "app.bundle.js",
    publicPath: "/dist/"
  },

  plugins: [new webpack.NamedModulesPlugin(), new StatsGraphPlugin()]
};

module.exports = function(env) {
  const isDevelopment = env === "development";
  if (isDevelopment) {
    return merge(baseConfig, {
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
        // { // this is an anonymous custom plugin
        //   apply(compiler) {
        //     compiler.plugin("done", function(params){
        //       console.log(require('util').inspect(compiler.options));
        //     });
        //   }
        // }
      ]
    });
  } else {
    return merge(baseConfig, babelLoader);
  }
  console.log(
    `This is a ${isDevelopment ? "development" : "production"} build`
  );
  return baseConfig;
};
