const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    util: require.resolve("util"),
    querystring: require.resolve("querystring-es3"),
    http: require.resolve("stream-http"),
    zlib: require.resolve("browserify-zlib"),
  };

  // Add plugins to provide global variables
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};