module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const rt = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          },
          modules: false,
        },
      ],
      ['@babel/preset-react'],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      ['@babel/plugin-transform-runtime'],
      [
        'import',
        { libraryName: 'antd-mobile', libraryDirectory: 'es', style: 'css' },
        'antd-mobile',
      ],
      ['import', { libraryName: 'zarm', style: 'css' }, 'zarm'],
    ].filter(Boolean),
  };

  if (api.env('development')) {
    rt.plugins.unshift(['react-refresh/babel']);
  }

  return rt;
};
