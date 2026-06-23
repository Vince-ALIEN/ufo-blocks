const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const TerserPlugin = require("terser-webpack-plugin");

const defaultEntryPoints = defaultConfig.entry();

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultEntryPoints,
  },
  optimization: {
    ...defaultConfig.optimization,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.info', 'console.debug', 'console.warn'],
          },
          mangle: {
            reserved: ['wp', 'jQuery', '$', 'React', 'ReactDOM'],
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
  },
};
