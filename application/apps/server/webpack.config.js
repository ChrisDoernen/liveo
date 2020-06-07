const CopyPlugin = require('copy-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const path = require('path');

const pathToRootPackageJson = './../../package.json';
const packageJson = require(pathToRootPackageJson);

/**
 * Extend the default Webpack configuration from nx / ng.
 */
module.exports = (config, context) => {
  // Extract output path from context
  const {
    options: { outputPath, filename },
  } = context;

  // Install additional plugins
  config.plugins = config.plugins || [];
  config.plugins.push(generatePackageJson());
  config.output = {
    filename: filename,
    path: outputPath
  }
  return config;
};

/**
 * Generate a package.json file that contains only the dependencies which are actually
 * used in the code.
 *
 * @returns {*} A Webpack plugin
 */
function generatePackageJson() {
  const basePackageJson = {
    "name": packageJson.name,
    "version": packageJson.version,
    "main": "./liveo-server.js",
    "bin": "./liveo-server.js",
    "scripts": {
      "start": "node ./liveo-server.js",
      "download-ffmpeg": "node scripts/download-ffmpeg.js"
    },
    "dependencies": {
      "reflect-metadata": "",
      "@nestjs/platform-express": "",
      "@nestjs/platform-socket.io": ""
    },
    "devDependencies": {
      "decompress-tarxz": "^3.0.0",
      "decompress-unzip": "^4.0.1",
      "download": "^7.1.0",
      "fs-extra": "^9.0.1"
    }
  };

  const pathToPackageJson = path.join(__dirname, pathToRootPackageJson);
  return new GeneratePackageJsonPlugin(basePackageJson, pathToPackageJson);
}
