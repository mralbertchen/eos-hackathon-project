require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          browsers: 'last 2 versions'
        }
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    ['styled-components',
    {
      "ssr": true,
      "displayName": true,
      "preprocess": false
    }],
  ]
});
require('@babel/polyfill');
require('./src/server/server');
