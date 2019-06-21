module.exports = function(api) {
  api.cache(true);

  const presets = ['env'];
  const plugins = [];

  return {
    presets,
    plugins
  };
};