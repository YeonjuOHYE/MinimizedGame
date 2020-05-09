const { override, addWebpackPlugin, addBabelPlugin } = require("customize-cra");
const ModernizrWebpackPlugin = require("modernizr-webpack-plugin");

module.exports = override(addWebpackPlugin(new ModernizrWebpackPlugin()));
