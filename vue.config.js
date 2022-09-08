const webpack = require('webpack');

module.exports = {
  configureWebpack: {
      plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    ],
    resolve: {
      fallback: {
        "fs": false,
        "net": false,

        "buffer": require.resolve("buffer"),
        "stream": require.resolve("stream-browserify"),

        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "querystring": require.resolve("querystring-es3"),
        "crypto": require.resolve("crypto-browserify"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/")
      }
    }
  }
}
