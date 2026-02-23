const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const TerserPlugin = require("terser-webpack-plugin");

// Obtenir les entrées par défaut
const defaultEntryPoints = defaultConfig.entry();

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultEntryPoints, // Conserver les entrées par défaut
  },
  optimization: {
    ...defaultConfig.optimization,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Supprime les console.log en production
            drop_debugger: true, // Supprime les debugger
            pure_funcs: ['console.info', 'console.debug', 'console.warn'], // Supprime ces fonctions
          },
          mangle: {
            reserved: ['wp', 'jQuery', '$', 'React', 'ReactDOM'], // Préserve ces variables globales WordPress/React
          },
          format: {
            comments: false, // Supprime tous les commentaires
          },
        },
        extractComments: false, // Évite la création de fichiers .LICENSE séparés
        parallel: true, // Utilise plusieurs processus pour accélérer la minification
      }),
    ],
  },
};
