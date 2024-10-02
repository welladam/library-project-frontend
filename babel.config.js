module.exports = function (api) {
  api.cache(true)
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@*': './*',
          '@routeTypes': './types/routeTypes',
        },
      },
    ],
  ]

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  }
}
