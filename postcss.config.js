module.exports = (api, a, b) => {
  // `api.file` - path to the file
  // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - loader context for complex use cases
  // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
  // `api.options` - the `postcssOptions` options

  const plugins = [
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      },
    ],
  ];

  // 根据业务需要动态调整remUnit
  const remUnit = api.options.remUnit || 100;

  if (api.options.flex && !/node_modules/.test(api.file)) {
    plugins.unshift(['postcss-px2rem', { remUnit }]);
  }

  return {
    // You can specify any options from https://postcss.org/api/#processoptions here
    plugins,
  };
};
